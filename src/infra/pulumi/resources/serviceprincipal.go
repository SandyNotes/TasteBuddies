package resources

import (
	"os"

	"github.com/pulumi/pulumi-azuread/sdk/v4/go/azuread"
	"github.com/pulumi/pulumi-random/sdk/v4/go/random"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreateServicePrincipal(ctx *pulumi.Context, adApp *azuread.Application) (*azuread.ServicePrincipalPassword, error) {
	adServicePrincipalName := os.Getenv("AZURESERVICEPRINCIPALRNAME")
	adServicePrincipalPasswordName := os.Getenv("AZURESERVICEPRINCIPALPASSWORD")
	adSp, err := azuread.NewServicePrincipal(ctx, adServicePrincipalName, &azuread.ServicePrincipalArgs{
		ApplicationId: adApp.ApplicationId,
	})
	if err != nil {
		var empty *azuread.ServicePrincipalPassword
		return empty, err
	}
	password, err := random.NewRandomPassword(ctx, adServicePrincipalPasswordName, &random.RandomPasswordArgs{
		Length:  pulumi.Int(46),
		Special: pulumi.Bool(true),
	})
	if err != nil {
		var empty *azuread.ServicePrincipalPassword
		return empty, err
	}
	adServicePrincipalPassword, err := azuread.NewServicePrincipalPassword(ctx, "", &azuread.ServicePrincipalPasswordArgs{
		ServicePrincipalId: adSp.ID(),
		Value:              password.Result,
		EndDate:            pulumi.String(""),
	})
	if err != nil {
		var empty *azuread.ServicePrincipalPassword
		return empty, err
	}

	return adServicePrincipalPassword, err
}
