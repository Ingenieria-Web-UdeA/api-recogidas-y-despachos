import { APIGatewayProxyResult } from 'aws-lambda';
import { getDB } from '../db';

const getUsers = async (): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const users = await db.user.findMany();

  return {
    statusCode: 200,
    body: JSON.stringify({
      users,
    }),
  };
};

const getUser = async (userId: string): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      user,
    }),
  };
};

export interface UserCreateInput {
  email: string;
  name: string;
  image?: string;
  roleId?: string;
}

const createUser = async (data: UserCreateInput): Promise<APIGatewayProxyResult> => {
  const db = getDB();

  const user = await db.user.create({
    data,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      user,
    }),
  };
};

const deleteUser = async (userId: string): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const user = await db.user.delete({
    where: {
      id: userId,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      user,
    }),
  };
};

const updateUser = async ({
  id,
  column,
  data,
}: {
  id: string;
  column: string;
  data: any;
}): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const user = await db.user.update({
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
      user,
    }),
  };
};

export { getUsers, getUser, createUser, deleteUser, updateUser };
