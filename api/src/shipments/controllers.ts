import { APIGatewayProxyResult } from 'aws-lambda';
import { getDB } from '../db';

// 1. Get all Shipments
const getShipments = async (): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const shipments = await db.shipment.findMany();

  return {
    statusCode: 200,
    body: JSON.stringify({
      shipments,
    }),
  };
};

// 2. Get a specific Shipment by ID
const getShipment = async (shipmentId: string): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const shipment = await db.shipment.findUnique({
    where: {
      id: shipmentId,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      shipment,
    }),
  };
};

export interface ShipmentCreateInput {
  shippedBunches: number;
  shipmentDate: Date;
  bunchWeight: number;
  deliveredWeight: number;
  userId: string;
  // Add other fields if needed
}

// 3. Create a new Shipment
const createShipment = async (data: ShipmentCreateInput): Promise<APIGatewayProxyResult> => {
  const db = getDB();

  const shipment = await db.shipment.create({
    data,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      shipment,
    }),
  };
};

// 4. Delete a Shipment by ID
const deleteShipment = async (shipmentId: string): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const shipment = await db.shipment.delete({
    where: {
      id: shipmentId,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      shipment,
    }),
  };
};

export interface ShipmentUpdateInput {
  id: string;
  column: string;
  data: any;
}

// 5. Update a specific Shipment by ID
const updateShipment = async ({
  id,
  column,
  data,
}: ShipmentUpdateInput): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const shipment = await db.shipment.update({
    where: {
      id: id,
    },
    data: {
      [column]: data,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      shipment,
    }),
  };
};

export { getShipments, getShipment, createShipment, deleteShipment, updateShipment };
