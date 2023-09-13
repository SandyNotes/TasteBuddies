package resources

import (
	"github.com/pulumi/pulumi-azuread/sdk/v4/go/azuread"
	"github.com/pulumi/pulumi-random/sdk/v4/go/random"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

/*
Creates a service principal to attach to aks cluster
*/
func CreateServicePrincipal(ctx *pulumi.Context, adApp *azuread.Application) (*azuread.ServicePrincipalPassword, error) {
	// Loads names that will be used
	adServicePrincipalName := "tastebuddiessp"
	adServicePrincipalPasswordName := "tastebuddiessppassword"
	randomPassword := "tastebuddiesrandompassword"
	// Creates the service principal
	adSp, err := azuread.NewServicePrincipal(ctx, adServicePrincipalName, &azuread.ServicePrincipalArgs{
		ApplicationId: adApp.ApplicationId,
	})

	if err != nil {
		var empty *azuread.ServicePrincipalPassword
		return empty, err
	}
	// Generates a random password for the service principal
	passwordArgs := random.RandomPasswordArgs{
		Length:  pulumi.Int(46),
		Special: pulumi.Bool(true),
	}
	password, err := random.NewRandomPassword(ctx, randomPassword, &passwordArgs)

	if err != nil {
		var empty *azuread.ServicePrincipalPassword
		return empty, err
	}
	// Creates the service principal password
	servicePrincipalPasswordArgs := azuread.ServicePrincipalPasswordArgs{
		ServicePrincipalId: adSp.ID(),
		Value:              password.Result,
		EndDate:            pulumi.String("2099-01-01T00:00:00Z"),
	}

	adServicePrincipalPassword, err := azuread.NewServicePrincipalPassword(ctx, adServicePrincipalPasswordName, &servicePrincipalPasswordArgs)
	if err != nil {
		var empty *azuread.ServicePrincipalPassword
		return empty, err
	}

	return adServicePrincipalPassword, err
}
