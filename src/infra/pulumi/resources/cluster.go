package resources

import (
	"encoding/base64"

	"github.com/pulumi/pulumi-azure-native-sdk/containerservice/v2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

/*
Creates the aks cluster
*/
func CreateCluster(ctx *pulumi.Context) error {
	aksClusterName := "tastebuddiesaks"
	// aksAgentPoolName := "tastebuddiesagentpool"
	aksSize := 30
	aksVMSize := "Standard_DS2_v2"
	aksAdminUsername := "tastebuddies-aks"
	aksOS := "Linux"
	kubernetesVersion := "1.27"
	resourceGroup, _ := CreateResource(ctx)
	sshKey, err := CreateSSHKey(ctx)
	adApp, err := CreateAppRegistration(ctx)
	adSpPassword, err := CreateServicePrincipal(ctx, adApp)
	cluster, err := containerservice.NewManagedCluster(ctx, aksClusterName, &containerservice.ManagedClusterArgs{
		ResourceGroupName: resourceGroup.Name,
		AgentPoolProfiles: containerservice.ManagedClusterAgentPoolProfileArray{
			&containerservice.ManagedClusterAgentPoolProfileArgs{
				Name:         pulumi.String("agentpool"),
				Mode:         pulumi.String("System"),
				OsDiskSizeGB: pulumi.Int(aksSize),
				Count:        pulumi.Int(3),
				VmSize:       pulumi.String(aksVMSize),
				OsType:       pulumi.String(aksOS),
				Type:         pulumi.String("VirtualMachineScaleSets"),
			},
		},
		LinuxProfile: &containerservice.ContainerServiceLinuxProfileArgs{
			AdminUsername: pulumi.String(aksAdminUsername),
			Ssh: containerservice.ContainerServiceSshConfigurationArgs{
				PublicKeys: containerservice.ContainerServiceSshPublicKeyArray{
					containerservice.ContainerServiceSshPublicKeyArgs{
						KeyData: sshKey.PublicKeyOpenssh,
					},
				},
			},
		},
		DnsPrefix: resourceGroup.Name,
		ServicePrincipalProfile: &containerservice.ManagedClusterServicePrincipalProfileArgs{
			ClientId: adApp.ApplicationId,
			Secret:   adSpPassword.Value,
		},
		KubernetesVersion: pulumi.String(kubernetesVersion),
	})
	if err != nil {
		return err
	}

	creds := containerservice.ListManagedClusterUserCredentialsOutput(ctx,
		containerservice.ListManagedClusterUserCredentialsOutputArgs{
			ResourceGroupName: resourceGroup.Name,
			ResourceName:      cluster.Name,
		})

	kubeconfig := creds.Kubeconfigs().Index(pulumi.Int(0)).Value().
		ApplyT(func(encoded string) string {
			kubeconfig, err := base64.StdEncoding.DecodeString(encoded)
			if err != nil {
				return ""
			}
			return string(kubeconfig)
		})

	ctx.Export("kubeconfig", kubeconfig)
	return nil
}
