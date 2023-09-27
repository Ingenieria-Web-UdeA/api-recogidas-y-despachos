import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  ShipmentCreateInput,
  createShipment,
  deleteShipment,
  getShipment,
  getShipments,
  updateShipment,
} from './controllers'; // Assuming you've placed the shipment controllers in a separate file

const shipmentsHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const { httpMethod } = event;

  switch (httpMethod) {
    case 'GET': {
      if (event.pathParameters?.shipmentId) {
        return await getShipment(event.pathParameters?.shipmentId || '');
      }
      return await getShipments();
    }
    case 'POST': {
      const data: ShipmentCreateInput = JSON.parse(event.body || '{}');
      return await createShipment(data);
    }
    case 'PUT': {
      if (event.pathParameters?.shipmentId) {
        const data: { column: string; data: any } = JSON.parse(event.body || '{}');
        return await updateShipment({ id: event.pathParameters?.shipmentId, ...data });
      }
    }
    case 'DELETE':
      if (event.pathParameters?.shipmentId) {
        return await deleteShipment(event.pathParameters?.shipmentId || '');
      }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Invalid method',
    }),
  };
};

export { shipmentsHandler };
