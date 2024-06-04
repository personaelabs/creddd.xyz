import { PortalAbi } from '@cred/shared';
import { Hex, encodeFunctionData, formatEther } from 'viem';
import axios from '@/lib/axios';
import { BottomSheetType, SyncRoomRequestBody } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getRoomTokenId } from '@/lib/utils';
import { PORTAL_CONTRACT_ADDRESS } from '@/lib/contract';
import { toast } from 'sonner';
import { useSendTransaction, useWallets } from '@privy-io/react-auth';
import useRoom from './useRoom';
import wagmiConfig from '../lib/wagmiConfig';
import { readContract } from '@wagmi/core';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import useSignedInUser from './useSignedInUser';

const sendTransactionId = async ({
  roomId,
  txId,
}: {
  roomId: string;
  txId: Hex;
}) => {
  const body: SyncRoomRequestBody = {
    buyTransactionHash: txId,
  };

  await axios.post(`/api/rooms/${roomId}/sync`, body);
};

const getCurrentSellPrice = async (roomIdBigInt: bigint) => {
  const amount = BigInt(1);
  return await readContract(wagmiConfig, {
    abi: PortalAbi,
    address: PORTAL_CONTRACT_ADDRESS,
    functionName: 'getSellPrice',
    args: [roomIdBigInt, amount],
  });
};

const useSellKey = (roomId: string) => {
  const queryClient = useQueryClient();
  const { sendTransaction } = useSendTransaction();
  const { data: room } = useRoom(roomId);
  const { wallets } = useWallets();
  const { setOpenedSheet, closeSheet } = useBottomSheet();
  const { data: signedInUser } = useSignedInUser();

  const result = useMutation({
    mutationFn: async () => {
      const roomIdBigInt = getRoomTokenId(roomId);

      const embeddedWallet = wallets.find(
        wallet => wallet.walletClientType === 'privy'
      );

      if (!embeddedWallet) {
        throw new Error('No embedded wallet found.');
      }

      const amount = BigInt(1);
      const data = encodeFunctionData({
        abi: PortalAbi,
        functionName: 'sellKeys',
        args: [roomIdBigInt, amount],
      });

      const sellPrice = await getCurrentSellPrice(roomIdBigInt);

      const formattedKeyPrice = formatEther(sellPrice);

      const txReceipt = await sendTransaction(
        {
          from: embeddedWallet.address,
          to: PORTAL_CONTRACT_ADDRESS,
          data,
        },
        {
          header: `Sell ${room?.name} key`,
          description: `You will receive ${formattedKeyPrice} ETH (estimated)`,
          buttonText: 'Sell key',
        }
      );

      setOpenedSheet(BottomSheetType.PROCESSING_TX);
      await sendTransactionId({
        roomId,
        txId: txReceipt.transactionHash as Hex,
      });

      closeSheet();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['key-price', roomId] });
      queryClient.invalidateQueries({
        queryKey: ['key-balance', { address: signedInUser?.wallet?.address }],
      });
      queryClient.invalidateQueries({ queryKey: ['joined-rooms'] });
      queryClient.invalidateQueries({ queryKey: ['all-rooms'] });

      toast.success('Sold key');
    },
  });

  return { ...result };
};

export default useSellKey;