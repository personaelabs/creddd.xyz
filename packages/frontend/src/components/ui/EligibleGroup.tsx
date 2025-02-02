'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import useProver from '@/hooks/useProver';
import { captureFetchError, getCredddDescription, postJSON } from '@/lib/utils';
import { Info, Loader2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { EligibleGroup } from '@/app/types';
import { Connector } from 'wagmi';
import { useAddingCredddModal } from '@/context/AddingCredddModalContext';

interface WalletViewProps {
  connector: Connector;
  group: EligibleGroup;
  afterAdd: () => void;
}

const EligibleGroup: React.FC<WalletViewProps> = ({ connector, group }) => {
  const { refetchUser } = useUser();
  const { setIsOpen: setIsAddingCredddModalOpen } = useAddingCredddModal();
  const prover = useProver(group);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const addGroup = async () => {
    setIsAdding(true);
    const proof = await prover.prove(connector);

    if (proof) {
      const response = await postJSON({
        method: 'POST',
        url: '/api/attestations',
        body: proof,
      });

      if (response.ok) {
        // Close the "Adding Creddd" modal
        setIsAddingCredddModalOpen(false);

        setIsAdding(false);
        refetchUser();
        toast.success('creddd added', {
          duration: 10000,
          closeButton: true,
        });
      } else {
        toast.error('Failed to add creddd', {
          duration: 100000,
          closeButton: true,
        });
        await captureFetchError(response);
      }
    }

    setIsAddingCredddModalOpen(false);
  };

  const credddDescription = group.typeId
    ? getCredddDescription(group.displayName, group.typeId)
    : null;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center justify-center gap-[20px] w-[300px]">
        <div className="flex flex-row items-center">
          <div className="text-center w-[150px]">{group.displayName}</div>
          {credddDescription ? (
            <Tooltip delayDuration={200}>
              <TooltipTrigger>
                <Info className="w-4 h-4 ml-2"></Info>
              </TooltipTrigger>
              <TooltipContent>{credddDescription}</TooltipContent>
            </Tooltip>
          ) : (
            <></>
          )}
        </div>
        <div className="w-[85px] text-center">
          <Button onClick={addGroup} disabled={isAdding}>
            {isAdding ? (
              <Loader2 className="animate-spin mr-2 w-4 h-4"></Loader2>
            ) : (
              <></>
            )}
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EligibleGroup;
