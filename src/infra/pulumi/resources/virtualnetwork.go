package resources

import (
	"fmt"

	"github.com/pulumi/pulumi-azure-native-sdk/network/v2"
	"github.com/pulumi/pulumi-azure-native-sdk/resources/v2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreateVirtualNetwork(ctx *pulumi.Context, resourceGroup *resources.ResourceGroup) (*network.VirtualNetwork, error) {
	virtualNetworkName := "tastebuddiesvirtualnetwork"
	vNet, err := network.NewVirtualNetwork(ctx, virtualNetworkName, &network.VirtualNetworkArgs{
		AddressSpace: &network.AddressSpaceArgs{
			AddressPrefixes: pulumi.StringArray{
				pulumi.String("10.0.0.0/16"),
			},
		},

		Location:           pulumi.String(fmt.Sprintf("%s", resourceGroup.Location)),
		ResourceGroupName:  pulumi.String(fmt.Sprintf("%s", resourceGroup.Name)),
		VirtualNetworkName: pulumi.String(virtualNetworkName),
	})
	if err != nil {
		var empty *network.VirtualNetwork
		return empty, err
	}
	return vNet, err
}
