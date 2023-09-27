import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { usersHandler } from './src/users';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { collectionsHandler } from './src/collections';
import { lotsHandler } from './src/lots';
import { shipmentsHandler } from './src/shipments';

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  const { path } = event;
  try {
    switch (true) {
      case path.startsWith('/users'):
        const userResponse = await usersHandler(event);
        return {
          headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          },
          ...userResponse,
        };
      case path.startsWith('/collections'):
        const collectionResponse = await collectionsHandler(event);
        return {
          headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          },
          ...collectionResponse,
        };
      case path.startsWith('/lots'):
        const lotResponse = await lotsHandler(event);
        return {
          headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          },
          ...lotResponse,
        };
      case path.startsWith('/shipments'):
        const shipmentResponse = await shipmentsHandler(event);
        return {
          headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          },
          ...shipmentResponse,
        };
    }
  } catch (e: any) {
    if (e instanceof PrismaClientValidationError) {
      // Handle Prisma validation error
      return {
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        statusCode: 400, // Bad Request, since it's a validation error
        body: JSON.stringify({
          message: 'Bad request. Please input the correct information.',
        }),
      };
    }

    // Handle other errors
    return {
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      statusCode: 500,
      body: JSON.stringify({
        message: e.message,
      }),
    };
  }

  return {
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    statusCode: 400,
    body: JSON.stringify({
      message: 'Invalid path',
    }),
  };
};
