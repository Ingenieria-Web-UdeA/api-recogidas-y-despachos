import { APIGatewayProxyResult } from 'aws-lambda';
import { getDB } from '../db';

const getRoles = async (): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const roles = await db.role.findMany();

  return {
    statusCode: 200,
    body: JSON.stringify({
      roles,
    }),
  };
};

const getRole = async (roleId: string): Promise<APIGatewayProxyResult> => {
  const db = getDB();
  const role = await db.role.findUnique({
    where: {
      id: roleId,
    },
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      role,
    }),
  };
};

export { getRole, getRoles };
