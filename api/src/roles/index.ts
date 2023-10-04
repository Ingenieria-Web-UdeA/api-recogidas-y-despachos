import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getRole, getRoles } from './controllers';

const rolesHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const { httpMethod } = event;

  switch (httpMethod) {
    case 'GET': {
      if (event.pathParameters?.roleId) {
        return await getRole(event.pathParameters?.roleId || '');
      }
      return await getRoles();
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Invalid method',
    }),
  };
};

export { rolesHandler };
