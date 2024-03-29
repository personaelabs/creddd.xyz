export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import neynar from '@/lib/neynar';
import { NeynarUserResponse } from '@/app/types';

const selectAttestation = {
  MerkleTree: {
    select: {
      Group: {
        select: {
          id: true,
          handle: true,
          typeId: true,
          displayName: true,
        },
      },
    },
  },
} satisfies Prisma.FidAttestationSelect;

const selectMintLog = {
  tokenId: true,
} satisfies Prisma.MintLogSelect;

export type FidAttestationSelect = Prisma.FidAttestationGetPayload<{
  select: typeof selectAttestation;
}>;

export type MintLogSelect = Prisma.MintLogGetPayload<{
  select: typeof selectMintLog;
}>;

export type GetUserResponse = NeynarUserResponse & {
  fidAttestations: FidAttestationSelect[];
  mints: MintLogSelect[];
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

  // Get mints for the FID
  const mints = await prisma.mintLog.findMany({
    select: selectMintLog,
    where: {
      fid,
    },
  });

  // Filter out dev groups in production
  if (process.env.VERCEL_ENV === 'production') {
    fidAttestations = fidAttestations.filter(
      attestation => !attestation.MerkleTree.Group.handle.startsWith('dev')
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
    mints,
    fidAttestations,
  });
}
