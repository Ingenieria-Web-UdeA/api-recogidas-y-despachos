import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

const addCorsOptions = (resource: apiGateway.IResource) => {
  resource.addMethod(
    'OPTIONS',
    new apiGateway.MockIntegration({
      integrationResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Headers': `'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'`,
            'method.response.header.Access-Control-Allow-Origin': `'*'`,
            'method.response.header.Access-Control-Allow-Credentials': `'false'`,
            'method.response.header.Access-Control-Allow-Methods': `'OPTIONS,GET,PUT,POST,DELETE'`,
          },
        },
      ],
      passthroughBehavior: apiGateway.PassthroughBehavior.NEVER,
      requestTemplates: {
        'application/json': '{"statusCode": 200}',
      },
    }),
    {
      methodResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Access-Control-Allow-Headers': true,
            'method.response.header.Access-Control-Allow-Methods': true,
            'method.response.header.Access-Control-Allow-Credentials': true,
            'method.response.header.Access-Control-Allow-Origin': true,
          },
        },
      ],
    }
  );
};

const buildUsers = (api: apiGateway.SpecRestApi, lambda: lambda.DockerImageFunction) => {
  console.log('Building users');
  const usersResource = api.root.addResource('users');
  usersResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  usersResource.addMethod('POST', new apiGateway.LambdaIntegration(lambda));
  addCorsOptions(usersResource);

  const userIdResource = usersResource.addResource('{userId}');
  userIdResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  userIdResource.addMethod('PUT', new apiGateway.LambdaIntegration(lambda));
  userIdResource.addMethod('DELETE', new apiGateway.LambdaIntegration(lambda));
  addCorsOptions(userIdResource);
};

const buildLots = (api: apiGateway.SpecRestApi, lambda: lambda.DockerImageFunction) => {
  console.log('Building lots');
  const lotsResource = api.root.addResource('lots');
  lotsResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  lotsResource.addMethod('POST', new apiGateway.LambdaIntegration(lambda));
  addCorsOptions(lotsResource);

  const lotIdResource = lotsResource.addResource('{lotId}');
  lotIdResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  lotIdResource.addMethod('PUT', new apiGateway.LambdaIntegration(lambda));
  lotIdResource.addMethod('DELETE', new apiGateway.LambdaIntegration(lambda));
  addCorsOptions(lotIdResource);
};

const buildShipments = (api: apiGateway.SpecRestApi, lambda: lambda.DockerImageFunction) => {
  console.log('Building shipments');
  const shipmentsResource = api.root.addResource('shipments');
  shipmentsResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  shipmentsResource.addMethod('POST', new apiGateway.LambdaIntegration(lambda));
  addCorsOptions(shipmentsResource);

  const shipmentIdResource = shipmentsResource.addResource('{shipmentId}');
  shipmentIdResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  shipmentIdResource.addMethod('PUT', new apiGateway.LambdaIntegration(lambda));
  shipmentIdResource.addMethod('DELETE', new apiGateway.LambdaIntegration(lambda));
  addCorsOptions(shipmentIdResource);
};

const buildCollections = (api: apiGateway.SpecRestApi, lambda: lambda.DockerImageFunction) => {
  console.log('Building collections');
  const collectionsResource = api.root.addResource('collections');
  collectionsResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  collectionsResource.addMethod('POST', new apiGateway.LambdaIntegration(lambda));
  addCorsOptions(collectionsResource);

  const collectionIdResource = collectionsResource.addResource('{collectionId}');
  collectionIdResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  collectionIdResource.addMethod('PUT', new apiGateway.LambdaIntegration(lambda));
  collectionIdResource.addMethod('DELETE', new apiGateway.LambdaIntegration(lambda));
  addCorsOptions(collectionIdResource);
};

const buildRoles = (api: apiGateway.SpecRestApi, lambda: lambda.DockerImageFunction) => {
  console.log('Building roles');
  const rolesResource = api.root.addResource('roles');
  rolesResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  addCorsOptions(rolesResource);

  const roleIdResource = rolesResource.addResource('{roleId}');
  roleIdResource.addMethod('GET', new apiGateway.LambdaIntegration(lambda));
  addCorsOptions(roleIdResource);
};

const buildResources = (api: apiGateway.SpecRestApi, lambda: lambda.DockerImageFunction) => {
  buildUsers(api, lambda);
  buildLots(api, lambda);
  buildShipments(api, lambda);
  buildCollections(api, lambda);
  buildRoles(api, lambda);
};

export { buildResources };
