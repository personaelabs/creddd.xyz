import db from '@/lib/firestore';
import { roomConverter } from '@cred/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import useSignedInUser from './useSignedInUser';

const joinRoom = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  const roomRef = doc(
    collection(db, 'rooms').withConverter(roomConverter),
    roomId
  );

  await updateDoc(roomRef, {
    joinedUserIds: arrayUnion(userId),
  });
};

const useJoinRoom = ({ roomId }: { roomId: string }) => {
  const { data: signedInUser } = useSignedInUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (signedInUser) {
        await joinRoom({
          roomId,
          userId: signedInUser.id,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['joined-rooms'],
      });
    },
  });
};

export default useJoinRoom;
