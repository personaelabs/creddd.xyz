export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import neynar from '@/lib/neynar';
import { NeynarUserResponse } from '@/app/types';

console.log('NODE_ENV', process.env.NODE_ENV);

const selectAttestation = {
  MerkleTree: {
    select: {
      Group: {
        select: {
          id: true,
          handle: true,
          displayName: true,
        },
      },
    },
  },
} satisfies Prisma.FidAttestationSelect;

type FidAttestationSelect = Prisma.FidAttestationGetPayload<{
  select: typeof selectAttestation;
}>;

export type GetUserResponse = NeynarUserResponse & {
  fidAttestations: FidAttestationSelect[];
};

/**
 * Get user data and attestations for a given FID
 */
export async function GET(
  _req: NextRequest,
  {
    params,
  }: {
    params: {
      fid: string;
    };
  }
) {
  const fid = Number(params.fid);

  // Get attestations (i.e. proofs) for the FID
  let fidAttestations = await prisma.fidAttestation.findMany({
    select: selectAttestation,
    where: {
      fid,
    },
  });

  // Filter out dev groups in production
  if (process.env.NODE_ENV === 'production') {
    fidAttestations = fidAttestations.filter(
      attestation => !attestation.MerkleTree.Group.handle.startsWith('dev0')
    );
  }

  // Get user data from Neynar
  const result = await neynar.get<{ users: NeynarUserResponse[] }>(
    `/user/bulk?fids=${fid}`
  );
  const user = result.data.users[0];

  if (!user) {
    return Response.json('User not found', { status: 404 });
  }

  // Return user data and attestations
  return Response.json({
    ...user,
    fidAttestations,
  });
}
