import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as cdk from 'aws-cdk-lib/core';

import { buildResources } from './buildApiResources';

export class BackStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = this.buildLambda();
    const api = this.buildApiGateway(lambda);

    // this.buildSwagger();
  }

  buildApiGateway(lambda: lambda.DockerImageFunction) {
    const corsOptions: apiGateway.CorsOptions = {
      allowOrigins: ['*'], // Allow any origin
      allowMethods: ['*'], // Allow all methods
      allowHeaders: ['*'], // Allow any header
    };

    // Define the API Gateway REST API resource
    const api = new apiGateway.SpecRestApi(this, 'RecogidasYDespachos', {
      apiDefinition: apiGateway.ApiDefinition.fromAsset(
        path.join(__dirname, '../api/docs/swagger-config.yml')
      ),
      restApiName: 'Recogidas y Despachos',
      description: 'Api Gateway para el servicio de recogidas y despachos',
    });

    api.root.addCorsPreflight(corsOptions);

    // Grant permission to the API Gateway's execution role to invoke the Lambda function
    lambda.addPermission('InvokePermission', {
      principal: new iam.ServicePrincipal('apigateway.amazonaws.com'),
    });

    buildResources(api, lambda);

    return api;
  }

  buildLambda() {
    // Lambda resolver
    const dockerfile = path.join(__dirname, '../api');
    const dockerLambda = new lambda.DockerImageFunction(this, `RecogidasYDespachos_DockerLambda`, {
      functionName: `RecogidasYDespachos_DockerLambda`,
      code: lambda.DockerImageCode.fromImageAsset(dockerfile),
      memorySize: 1024,
      timeout: Duration.seconds(60),
    });

    return dockerLambda;
  }

  buildSwagger() {
    // S3 bucket to host website content
    const swaggerBucket = new s3.Bucket(this, 'SwaggerBucket', {
      bucketName: 'recogidas-y-despachos-swagger',
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Useful for dev/test environments. Be cautious in prod.
      autoDeleteObjects: true, // Useful for dev/test environments. Be cautious in prod.
    });

    // CloudFront distribution that provides HTTPS
    const distribution = new cloudfront.Distribution(this, 'SwaggerDistribution', {
      defaultBehavior: { origin: new origins.S3Origin(swaggerBucket) },
    });

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, 'SwaggerDeployment', {
      sources: [s3deploy.Source.asset('./swagger-ui')],
      destinationBucket: swaggerBucket,
      distribution,
      distributionPaths: ['/*'],
    });

    // Outputs
    new cdk.CfnOutput(this, 'BucketURL', { value: swaggerBucket.bucketWebsiteUrl });
    new cdk.CfnOutput(this, 'DistributionURL', { value: distribution.distributionDomainName });
  }
}
