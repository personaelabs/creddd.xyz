import { addUserConnectedAddress } from '@/lib/backend/connectedAddress';
import privy, { isAuthenticated } from '@/lib/backend/privy';
import { constructAttestationMessage } from '@/lib/utils';
import { ConnectAddressRequestBody } from '@/types';
import { NextRequest } from 'next/server';
import { verifyMessage } from 'viem';

export async function POST(req: NextRequest) {
  const verifiedClaims = await isAuthenticated(req);

  const body = (await req.json()) as ConnectAddressRequestBody;

  const user = await privy.getUser(verifiedClaims.userId);
  const { address, signature } = body;

  const userPrivyAddress = user.wallet?.address;

  if (!userPrivyAddress) {
    return new Response('User doesn`t have a wallet', { status: 400 });
  }

  const message = constructAttestationMessage(userPrivyAddress);

  const isValid = await verifyMessage({
    address,
    message,
    signature,
  });

  if (!isValid) {
    return new Response('Invalid signature', { status: 400 });
  }

  await addUserConnectedAddress({
    userId: verifiedClaims.userId,
    address,
  });

  return new Response('OK');
}