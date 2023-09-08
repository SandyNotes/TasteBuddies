package resources

import (
	"fmt"
	"os"

	"github.com/pulumi/pulumi-azure-native-sdk/resources/v2"
	"github.com/pulumi/pulumi-azure-native-sdk/storage/v2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreateStorageAccount(ctx *pulumi.Context, resourceGroup *resources.ResourceGroup) error {
	storageAccountName := os.Getenv("AZURESTORAGEACCOUNTNAME")
	accountName := os.Getenv("AZUREACCOUNTNAME")
	storageSku := os.Getenv("AZURESTORAGEACCOUNTSKU")
	vnet, _ := CreateVirtualNetwork(ctx, resourceGroup)
	subnet, _ := CreateSubnet(ctx, resourceGroup, vnet)
	storageArgs := storage.StorageAccountArgs{
		AccountName:            pulumi.String(accountName),
		EnableHttpsTrafficOnly: pulumi.Bool(false),
		EnableNfsV3:            pulumi.Bool(true),
		IsHnsEnabled:           pulumi.Bool(true),
		Kind:                   pulumi.String("BlockBlobStorage"),
		Location:               resourceGroup.Location,
		NetworkRuleSet: storage.NetworkRuleSetArgs{
			Bypass:        pulumi.String("AzureServices"),
			DefaultAction: storage.DefaultActionAllow,
			IpRules:       storage.IPRuleArray{},
			VirtualNetworkRules: storage.VirtualNetworkRuleArray{
				&storage.VirtualNetworkRuleArgs{
					VirtualNetworkResourceId: pulumi.String(fmt.Sprintf("/subscriptions/{subscription-id}/resourceGroups/%s/providers/Microsoft.Network/virtualNetworks/%s/subnets/%s", resourceGroup.Name, vnet.Name, subnet.Name)),
				},
			},
		},
		ResourceGroupName: pulumi.String(fmt.Sprint("%s", resourceGroup.Name)),
		Sku: &storage.SkuArgs{
			Name: pulumi.String(storageSku),
		},
	}
	_, err := storage.NewStorageAccount(ctx, storageAccountName, &storageArgs)
	return err
}
