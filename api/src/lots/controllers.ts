import { APIGatewayProxyResult } from 'aws-lambda';
import { getDB } from '../db';

// 1. Get all Lots
const getLots = async (): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const lots = await db.lot.findMany();

  return {
    statusCode: 200,
    body: JSON.stringify({
      lots,
    }),
  };
};

// 2. Get a specific Lot by ID
const getLot = async (lotId: string): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const lot = await db.lot.findUnique({
    where: {
      id: lotId,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      lot,
    }),
  };
};

export interface LotCreateInput {
  name: string;
  // Add other fields if needed
}

// 3. Create a new Lot
const createLot = async (data: LotCreateInput): Promise<APIGatewayProxyResult> => {
  const db = getDB();

  const lot = await db.lot.create({
    data,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      lot,
    }),
  };
};

// 4. Delete a Lot by ID
const deleteLot = async (lotId: string): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const lot = await db.lot.delete({
    where: {
      id: lotId,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      lot,
    }),
  };
};

export interface LotUpdateInput {
  id: string;
  column: string;
  data: any;
}

// 5. Update a specific Lot by ID
const updateLot = async ({ id, column, data }: LotUpdateInput): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const lot = await db.lot.update({
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
      lot,
    }),
  };
};

export { getLots, getLot, createLot, deleteLot, updateLot };
