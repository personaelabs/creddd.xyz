import { CredAbi } from '@cred/shared';
import { getRoomTokenId } from '@/lib/utils';
import { CRED_CONTRACT_ADDRESS } from '@/lib/contract';
import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import wagmiConfig from '../lib/wagmiConfig';

const useBuyPrice = (roomId: string) => {
  const roomIdBigInt = getRoomTokenId(roomId);

  return useQuery({
    queryKey: ['buy-price', roomId],
    queryFn: async () => {
      const result = readContract(wagmiConfig, {
        abi: CredAbi,
        address: CRED_CONTRACT_ADDRESS,
        functionName: 'getBuyPrice',
        args: [roomIdBigInt],
      });

      return result;
    },
  });
};

export default useBuyPrice;