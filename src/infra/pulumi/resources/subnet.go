package resources

import (
	"fmt"
	"os"

	"github.com/pulumi/pulumi-azure-native-sdk/network/v2"
	"github.com/pulumi/pulumi-azure-native-sdk/resources/v2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreateSubnet(ctx *pulumi.Context, resourceGroup *resources.ResourceGroup, vnet *network.VirtualNetwork) (*network.Subnet, error) {
	subnetName := os.Getenv("AZURESTORAGESUBNETNAME")
	subnet, err := network.NewSubnet(ctx, "subnet", &network.SubnetArgs{
		AddressPrefix:      pulumi.String("10.0.0.0/16"),
		ResourceGroupName:  pulumi.String(fmt.Sprintf("%s", resourceGroup.Name)),
		SubnetName:         pulumi.String(subnetName),
		VirtualNetworkName: pulumi.String(fmt.Sprintf("%s", vnet.Name)),
	})

	if err != nil {
		var empty *network.Subnet
		return empty, err
	}
	return subnet, err
}
