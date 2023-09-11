package resources

import (
	"github.com/pulumi/pulumi-azuread/sdk/v4/go/azuread"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreateAppRegistration(ctx *pulumi.Context) (*azuread.Application, error) {
	adAppName := "tastebuddies-aks-app-registration"
	adApp, err := azuread.NewApplication(ctx, adAppName, &azuread.ApplicationArgs{
		DisplayName: pulumi.String(adAppName),
	})
	if err != nil {
		var empty *azuread.Application
		return empty, err
	}
	return adApp, err
}
