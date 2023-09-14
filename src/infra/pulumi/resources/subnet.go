package resources

import (
	"github.com/pulumi/pulumi-azure-native-sdk/network/v2"
	"github.com/pulumi/pulumi-azure-native-sdk/resources/v2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreateSubnet(ctx *pulumi.Context, resourceGroup *resources.ResourceGroup, vnet *network.VirtualNetwork, vnetName string) (*network.Subnet, error) {
	subnet, err := network.NewSubnet(ctx, vnetName, &network.SubnetArgs{
		AddressPrefix:      pulumi.String("10.0.0.0/26"),
		ResourceGroupName:  resourceGroup.Name,
		SubnetName:         pulumi.String(vnetName),
		VirtualNetworkName: vnet.Name,
	})

	if err != nil {
		var empty *network.Subnet
		return empty, err
	}
	return subnet, err
}
