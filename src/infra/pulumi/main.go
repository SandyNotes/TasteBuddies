package main

import (
	cluster "pulum/resources"

	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		err := cluster.CreateCluster(ctx)
		if err != nil {
			panic(err)
		}
		return err
	})
}
