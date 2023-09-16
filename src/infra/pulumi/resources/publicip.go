package resources

import (
	"github.com/pulumi/pulumi-azure-native-sdk/network/v2"
	"github.com/pulumi/pulumi-azure-native-sdk/resources/v2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreatePublicIp(ctx *pulumi.Context, resourceGroup *resources.ResourceGroup, ipName string, publicAddressName string, domainName string) (*network.PublicIPAddress, error) {

	publicip, err := network.NewPublicIPAddress(ctx, ipName, &network.PublicIPAddressArgs{
		DnsSettings: &network.PublicIPAddressDnsSettingsArgs{
			DomainNameLabel: pulumi.String(domainName),
		},
		Location:            pulumi.String("eastus"),
		PublicIpAddressName: pulumi.String(publicAddressName),
		ResourceGroupName:   resourceGroup.Name,
		Sku: &network.PublicIPAddressSkuArgs{
			Name: pulumi.String("Standard"),
			Tier: pulumi.String("Regional"),
		},
		PublicIPAddressVersion:   pulumi.String("IPv4"),
		PublicIPAllocationMethod: pulumi.String("Static"),
	})
	if err != nil {
		var empty *network.PublicIPAddress
		return empty, err
	}
	return publicip, err
}
