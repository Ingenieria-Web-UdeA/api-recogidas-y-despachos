import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { LotCreateInput, createLot, deleteLot, getLot, getLots, updateLot } from './controllers';

const lotsHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const { httpMethod } = event;

  switch (httpMethod) {
    case 'GET': {
      if (event.pathParameters?.lotId) {
        return await getLot(event.pathParameters?.lotId || '');
      }
      return await getLots();
    }
    case 'POST': {
      const data: LotCreateInput = JSON.parse(event.body || '{}');
      return await createLot(data);
    }
    case 'PUT': {
      if (event.pathParameters?.lotId) {
        const data: { column: string; data: any } = JSON.parse(event.body || '{}');
        return await updateLot({ id: event.pathParameters?.lotId, ...data });
      }
    }
    case 'DELETE':
      if (event.pathParameters?.lotId) {
        return await deleteLot(event.pathParameters?.lotId || '');
      }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Invalid method',
    }),
  };
};

export { lotsHandler };
