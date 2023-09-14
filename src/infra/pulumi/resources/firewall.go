package resources

import (
	"github.com/pulumi/pulumi-azure-native-sdk/network/v2"
	"github.com/pulumi/pulumi-azure-native-sdk/resources/v2"
	firewall "github.com/pulumi/pulumi-azure/sdk/v5/go/azure/network"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreateFirewall(ctx *pulumi.Context, resourceGroup *resources.ResourceGroup, subnet *network.Subnet, publicIp *network.PublicIPAddress) (*firewall.Firewall, error) {
	newFirewall, err := firewall.NewFirewall(ctx, "exampleFirewall", &firewall.FirewallArgs{
		Location:          resourceGroup.Location,
		ResourceGroupName: resourceGroup.Name,
		SkuName:           pulumi.String("AZFW_VNet"),
		SkuTier:           pulumi.String("Basic"),
		IpConfigurations: firewall.FirewallIpConfigurationArray{
			&firewall.FirewallIpConfigurationArgs{
				Name:              pulumi.String("configuration"),
				SubnetId:          subnet.ID(),
				PublicIpAddressId: publicIp.ID(),
			},
		},
	})
	return newFirewall, err
}
