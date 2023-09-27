import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  UserCreateInput,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from './controllers';

const usersHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const { httpMethod } = event;

  switch (httpMethod) {
    case 'GET': {
      if (event.pathParameters?.userId) {
        return await getUser(event.pathParameters?.userId || '');
      }
      return await getUsers();
    }
    case 'POST': {
      const data: UserCreateInput = JSON.parse(event.body || '{}');

      return await createUser(data);
    }
    case 'PUT': {
      if (event.pathParameters?.userId) {
        const data: { column: string; data: any } = JSON.parse(event.body || '{}');
        return await updateUser({ id: event.pathParameters?.userId, ...data });
      }
    }
    case 'DELETE':
      if (event.pathParameters?.userId) {
        return await deleteUser(event.pathParameters?.userId || '');
      }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Invalid method',
    }),
  };
};

export { usersHandler };
