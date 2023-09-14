package resources

import (
	"github.com/pulumi/pulumi-azure-native-sdk/network/v2"
	"github.com/pulumi/pulumi-azure-native-sdk/resources/v2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreateVirtualNetwork(ctx *pulumi.Context, resourceGroup *resources.ResourceGroup, vnetName string) (*network.VirtualNetwork, error) {
	vNet, err := network.NewVirtualNetwork(ctx, vnetName, &network.VirtualNetworkArgs{
		AddressSpace: &network.AddressSpaceArgs{
			AddressPrefixes: pulumi.StringArray{
				pulumi.String("10.0.0.0/16"),
			},
		},

		Location:           resourceGroup.Location,
		ResourceGroupName:  resourceGroup.Name,
		VirtualNetworkName: pulumi.String(vnetName),
	})
	if err != nil {
		var empty *network.VirtualNetwork
		return empty, err
	}
	return vNet, err
}
