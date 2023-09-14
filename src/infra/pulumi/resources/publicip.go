package resources

import (
	"github.com/pulumi/pulumi-azure-native-sdk/network/v2"
	"github.com/pulumi/pulumi-azure-native-sdk/resources/v2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreatePublicIp(ctx *pulumi.Context, resourceGroup *resources.ResourceGroup) (*network.PublicIPAddress, error) {
	publicip, err := network.NewPublicIPAddress(ctx, "tastebuddiespublicipaddress", &network.PublicIPAddressArgs{
		DnsSettings: &network.PublicIPAddressDnsSettingsArgs{
			DomainNameLabel: pulumi.String("dnslbl"),
		},
		Location:            pulumi.String("eastus"),
		PublicIpAddressName: pulumi.String("test-ip"),
		ResourceGroupName:   resourceGroup.Name,
	})
	if err != nil {
		var empty *network.PublicIPAddress
		return empty, err
	}
	return publicip, err
}
