package resources

import (
	"fmt"
	"os"

	"github.com/pulumi/pulumi-azure-native-sdk/network/v2"
	"github.com/pulumi/pulumi-azure-native-sdk/resources/v2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreateVirtualNetwork(ctx *pulumi.Context, resourceGroup *resources.ResourceGroup) (*network.VirtualNetwork, error) {
	virtualNetworkName := os.Getenv("AZURESTORAGEVIRTUALNETWORKNAME")
	vNet, err := network.NewVirtualNetwork(ctx, "virtualNetwork", &network.VirtualNetworkArgs{
		AddressSpace: &network.AddressSpaceArgs{
			AddressPrefixes: pulumi.StringArray{
				pulumi.String("10.0.0.0/16"),
			},
		},
		FlowTimeoutInMinutes: pulumi.Int(10),
		Location:             pulumi.String(fmt.Sprintf("%s", resourceGroup.Location)),
		ResourceGroupName:    pulumi.String(fmt.Sprintf("%s", resourceGroup.Name)),
		VirtualNetworkName:   pulumi.String(virtualNetworkName),
	})
	if err != nil {
		var empty *network.VirtualNetwork
		return empty, err
	}
	return vNet, err
}
