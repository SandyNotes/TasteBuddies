package resources

import (
	"os"

	"github.com/pulumi/pulumi-azuread/sdk/v4/go/azuread"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreateAppRegistration(ctx *pulumi.Context) (*azuread.Application, error) {
	adAppName := os.Getenv("AZUREAPPNAME")
	adApp, err := azuread.NewApplication(ctx, adAppName, nil)
	if err != nil {
		var empty *azuread.Application
		return empty, err
	}
	return adApp, err
}
