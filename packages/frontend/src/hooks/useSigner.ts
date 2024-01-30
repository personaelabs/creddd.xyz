import { SIG_ALGO, SIG_SALT } from '@/lib/utils';
import { useCallback } from 'react';
import { useUserAccount } from '@/contexts/UserAccountContext';

// We only have one account for now
export const SIGNER_ID = 1;

const useSigner = () => {
  const { account } = useUserAccount();

  const sign = useCallback(
    async (message: Buffer): Promise<Buffer> => {
      const messageWithSalt = Buffer.concat([SIG_SALT, message]);

      if (account) {
        const sig = await window.crypto.subtle.sign(
          SIG_ALGO,
          account.privKey,
          messageWithSalt
        );

        return Buffer.from(sig);
      } else {
        throw new Error('DB not initialized');
      }
    },
    [account]
  );

  return { sign };
};

export default useSigner;