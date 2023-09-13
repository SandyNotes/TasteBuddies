package resources

import (
	"github.com/pulumi/pulumi-azure-native-sdk/resources/v2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

/*
Creates a resource group for the aks cluster
*/
func CreateResource(ctx *pulumi.Context) (*resources.ResourceGroup, error) {
	resourceGroupName := "tastebuddiesrg"

	resourceGroup, err := resources.NewResourceGroup(ctx, resourceGroupName, &resources.ResourceGroupArgs{
		Location:          pulumi.String("eastus"),
		ResourceGroupName: pulumi.String(resourceGroupName),
	})
	if err != nil {
		var empty *resources.ResourceGroup
		return empty, err
	}
	return resourceGroup, err
}
