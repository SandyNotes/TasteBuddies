package resources

import (
	"os"

	"github.com/pulumi/pulumi-azuread/sdk/v4/go/azuread"
	"github.com/pulumi/pulumi-random/sdk/v4/go/random"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

/*
Creates a service principal to attach to aks cluster
*/
func CreateServicePrincipal(ctx *pulumi.Context, adApp *azuread.Application) (*azuread.ServicePrincipalPassword, error) {
	// Loads names that will be used
	adServicePrincipalName := os.Getenv("AZURESERVICEPRINCIPALRNAME")
	adServicePrincipalPasswordName := os.Getenv("AZURESERVICEPRINCIPALPASSWORD")
	randomPassword := os.Getenv("AZURERANDOMPASSWORDNAME")
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
		EndDate:            pulumi.String(""),
	}

	adServicePrincipalPassword, err := azuread.NewServicePrincipalPassword(ctx, adServicePrincipalPasswordName, &servicePrincipalPasswordArgs)
	if err != nil {
		var empty *azuread.ServicePrincipalPassword
		return empty, err
	}

	return adServicePrincipalPassword, err
}
