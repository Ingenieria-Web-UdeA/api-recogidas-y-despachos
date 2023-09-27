import { APIGatewayProxyResult } from 'aws-lambda';
import { getDB } from '../db';

// 1. Get all Collections
const getCollections = async (): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const collections = await db.collection.findMany();

  return {
    statusCode: 200,
    body: JSON.stringify({
      collections,
    }),
  };
};

// 2. Get a specific Collection by ID
const getCollection = async (collectionId: string): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const collection = await db.collection.findUnique({
    where: {
      id: collectionId,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      collection,
    }),
  };
};

export interface CollectionCreateInput {
  bunches: number;
  collectionDate: Date;
  lotId: string;
  userId: string;
  // Add other fields if needed
}

// 3. Create a new Collection
const createCollection = async (data: CollectionCreateInput): Promise<APIGatewayProxyResult> => {
  const db = getDB();

  const collection = await db.collection.create({
    data,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      collection,
    }),
  };
};

// 4. Delete a Collection by ID
const deleteCollection = async (collectionId: string): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const collection = await db.collection.delete({
    where: {
      id: collectionId,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      collection,
    }),
  };
};

export interface CollectionUpdateInput {
  id: string;
  column: string;
  data: any;
}

// 5. Update a specific Collection by ID
const updateCollection = async ({
  id,
  column,
  data,
}: CollectionUpdateInput): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const collection = await db.collection.update({
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
      collection,
    }),
  };
};

export { getCollections, getCollection, createCollection, deleteCollection, updateCollection };
