import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

const buildUsers = (api: apiGateway.SpecRestApi, lambda: lambda.DockerImageFunction) => {
  const usersResource = api.root.addResource('users');
  usersResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  usersResource.addMethod('POST', new apiGateway.LambdaIntegration(lambda));

  const userIdResource = usersResource.addResource('{userId}');
  userIdResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  userIdResource.addMethod('PUT', new apiGateway.LambdaIntegration(lambda));
  userIdResource.addMethod('DELETE', new apiGateway.LambdaIntegration(lambda));
};

const buildLots = (api: apiGateway.SpecRestApi, lambda: lambda.DockerImageFunction) => {
  const lotsResource = api.root.addResource('lots');
  lotsResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  lotsResource.addMethod('POST', new apiGateway.LambdaIntegration(lambda));

  const lotIdResource = lotsResource.addResource('{lotId}');
  lotIdResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  lotIdResource.addMethod('PUT', new apiGateway.LambdaIntegration(lambda));
  lotIdResource.addMethod('DELETE', new apiGateway.LambdaIntegration(lambda));
};

const buildShipments = (api: apiGateway.SpecRestApi, lambda: lambda.DockerImageFunction) => {
  const shipmentsResource = api.root.addResource('shipments');
  shipmentsResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  shipmentsResource.addMethod('POST', new apiGateway.LambdaIntegration(lambda));

  const shipmentIdResource = shipmentsResource.addResource('{shipmentId}');
  shipmentIdResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  shipmentIdResource.addMethod('PUT', new apiGateway.LambdaIntegration(lambda));
  shipmentIdResource.addMethod('DELETE', new apiGateway.LambdaIntegration(lambda));
};

const buildCollections = (api: apiGateway.SpecRestApi, lambda: lambda.DockerImageFunction) => {
  const collectionsResource = api.root.addResource('collections');
  collectionsResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  collectionsResource.addMethod('POST', new apiGateway.LambdaIntegration(lambda));

  const collectionIdResource = collectionsResource.addResource('{collectionId}');
  collectionIdResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  collectionIdResource.addMethod('PUT', new apiGateway.LambdaIntegration(lambda));
  collectionIdResource.addMethod('DELETE', new apiGateway.LambdaIntegration(lambda));
};

const buildResources = (api: apiGateway.SpecRestApi, lambda: lambda.DockerImageFunction) => {
  buildUsers(api, lambda);
  buildLots(api, lambda);
  buildShipments(api, lambda);
  buildCollections(api, lambda);
};

export { buildResources };
