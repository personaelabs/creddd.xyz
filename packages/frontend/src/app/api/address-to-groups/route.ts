export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { AddressToGroupsMap, Groups } from '@/proto/address_to_groups_pb';

interface AddressToGroupsQueryResult {
  address: string;
  groups: number[];
}

// Get a list of addresses and the groups they belong to
export async function GET(req: NextRequest) {
  const skip = parseInt(req.nextUrl.searchParams.get('skip') || '0');
  const take = parseInt(req.nextUrl.searchParams.get('take') || '50000');

  const result = await prisma.$queryRaw<AddressToGroupsQueryResult[]>`
    SELECT
      address,
      ARRAY_AGG("groupId") AS "groups"
    FROM
      "MerkleTreeLeaf"
    GROUP BY
      address
      OFFSET ${skip}
      LIMIT ${take}
    `;

  if (result.length === 0) {
    // Return a 204 No Content response if there are no results
    return new NextResponse(null, {
      status: 204,
    });
  }

  const addressesToGroups = new AddressToGroupsMap();
  const map = addressesToGroups.getAddresstogroupsMap();

  for (const row of result) {
    const groups = new Groups();
    groups.setGroupsList(row.groups);
    map.set(row.address, groups);
  }

  return new NextResponse(addressesToGroups.serializeBinary(), {
    headers: {
      'Content-Type': 'application/x-protobuf',
    },
  });
}
