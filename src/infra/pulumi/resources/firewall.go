package resources

import (
	"github.com/pulumi/pulumi-azure-native-sdk/network/v2"
	"github.com/pulumi/pulumi-azure-native-sdk/resources/v2"
	firewall "github.com/pulumi/pulumi-azure/sdk/v5/go/azure/network"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreateFirewall(ctx *pulumi.Context, resourceGroup *resources.ResourceGroup, publicSubnet *network.Subnet, managementSubnet *network.Subnet, publicIp *network.PublicIPAddress, managementIp *network.PublicIPAddress) (*firewall.Firewall, error) {
	tastebuddiesFirewallName := "tastebuddiesFw"
	firewallManagementIpConfig := firewall.FirewallManagementIpConfigurationArgs{
		Name:              pulumi.String("managementconfiguration"),
		SubnetId:          managementSubnet.ID(),
		PublicIpAddressId: managementIp.ID(),
	}

	newFirewall, err := firewall.NewFirewall(ctx, tastebuddiesFirewallName, &firewall.FirewallArgs{
		Location:          resourceGroup.Location,
		ResourceGroupName: resourceGroup.Name,
		SkuName:           pulumi.String("AZFW_VNet"),
		SkuTier:           pulumi.String("Basic"),
		IpConfigurations: firewall.FirewallIpConfigurationArray{
			&firewall.FirewallIpConfigurationArgs{
				Name:              pulumi.String("publicconfiguration"),
				SubnetId:          publicSubnet.ID(),
				PublicIpAddressId: publicIp.ID(),
			},
		},
		ManagementIpConfiguration: firewallManagementIpConfig,
	})
	return newFirewall, err
}
