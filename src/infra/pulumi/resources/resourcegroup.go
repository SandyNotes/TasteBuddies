package resources

import (
	"os"

	"github.com/pulumi/pulumi-azure-native-sdk/resources/v2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

/*
Creates a resource group for the aks cluster
*/
func CreateResource(ctx *pulumi.Context) (*resources.ResourceGroup, error) {
	resourceGroupName := os.Getenv("RESOURCEGROUPNAME")

	resourceGroup, err := resources.NewResourceGroup(ctx, resourceGroupName, nil)
	if err != nil {
		var empty *resources.ResourceGroup
		return empty, err
	}
	return resourceGroup, err
}
