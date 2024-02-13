import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';

const selectAttestation = {
  MerkleTree: {
    select: {
      Group: {
        select: {
          displayName: true,
        },
      },
    },
  },
} satisfies Prisma.FidAttestationSelect;

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
  const fidAttestations = await prisma.fidAttestation.findMany({
    select: selectAttestation,
    where: {
      fid,
    },
  });

  // TODO: Get user profile from Neynar

  return Response.json({});
}
