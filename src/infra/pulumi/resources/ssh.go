package resources

import (
	"github.com/pulumi/pulumi-tls/sdk/v4/go/tls"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func CreateSSHKey(ctx *pulumi.Context) (*tls.PrivateKey, error) {
	sshKeyName := "tastebuddiesakssshkey"
	sshArgs := tls.PrivateKeyArgs{
		Algorithm: pulumi.String("RSA"),
		RsaBits:   pulumi.Int(4096),
	}
	sshKey, err := tls.NewPrivateKey(ctx, sshKeyName, &sshArgs)
	if err != nil {
		var empty *tls.PrivateKey
		return empty, err
	}
	return sshKey, err
}
