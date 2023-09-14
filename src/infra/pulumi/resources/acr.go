package resources

import (
	"github.com/pulumi/pulumi-azure-native-sdk/containerregistry"
	"github.com/pulumi/pulumi-azure-native-sdk/resources/v2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreateACRInstance(ctx *pulumi.Context, resourceGroup *resources.ResourceGroup) (*containerregistry.Registry, error) {
	acr, err := containerregistry.NewRegistry(ctx, "tastebuddiesAcrRegistry", &containerregistry.RegistryArgs{
		AdminUserEnabled:  pulumi.Bool(true),
		Location:          pulumi.String("eastus"),
		RegistryName:      pulumi.String("tastebuddiesAcrRegistry"),
		ResourceGroupName: resourceGroup.Name,
		Sku: &containerregistry.SkuArgs{
			Name: pulumi.String("Standard"),
		},
		Tags: pulumi.StringMap{
			"key": pulumi.String("tastebuddiesacr"),
		},
	})
	if err != nil {
		var empty *containerregistry.Registry
		return empty, err
	}
	return acr, err
}
