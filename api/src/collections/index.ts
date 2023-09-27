import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  CollectionCreateInput,
  createCollection,
  deleteCollection,
  getCollection,
  getCollections,
  updateCollection,
} from './controllers';

const collectionsHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const { httpMethod } = event;

  switch (httpMethod) {
    case 'GET': {
      if (event.pathParameters?.collectionId) {
        return await getCollection(event.pathParameters?.collectionId || '');
      }
      return await getCollections();
    }
    case 'POST': {
      const data: CollectionCreateInput = JSON.parse(event.body || '{}');
      return await createCollection(data);
    }
    case 'PUT': {
      if (event.pathParameters?.collectionId) {
        const data: { column: string; data: any } = JSON.parse(event.body || '{}');
        return await updateCollection({ id: event.pathParameters?.collectionId, ...data });
      }
    }
    case 'DELETE':
      if (event.pathParameters?.collectionId) {
        return await deleteCollection(event.pathParameters?.collectionId || '');
      }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Invalid method',
    }),
  };
};

export { collectionsHandler };
