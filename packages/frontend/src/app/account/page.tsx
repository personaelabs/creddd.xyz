/* eslint-disable @next/next/no-img-element */
'use client';

import { useUser } from '@/context/UserContext';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import WalletView from '@/components/ui/WalletView'; // Fixed import statement
import { AddressToGroupsResponse } from '@/app/api/address-to-groups/route';
import { GroupSelect } from '../api/groups/route';
import Link from 'next/link';

export default function AccountPage() {
  const [addressesToGroups, setAddressesToGroups] =
    useState<AddressToGroupsResponse>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [groups, setGroups] = useState<GroupSelect[]>([]);
  const [accounts, setAccounts] = useState<string[]>([]);
  const { user } = useUser();
  const [isSwitchingWallets, setIsSwitchingWallets] = useState<boolean>(false);

  const listenForAccountChanges = () => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccounts(accounts);
      });
    }
  };

  const connectAccounts = async () => {
    if ((window as any).ethereum) {
      // Raw dog!
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccounts(accounts);
      listenForAccountChanges();
      // Do something with the account
    } else {
      // Handle the case when Ethereum provider is not available
      console.log('no ethereum provider');
    }
  };

  useEffect(() => {
    (async () => {
      const groupResponse = await fetch('/api/groups', {
        cache: 'no-store',
      });

      if (!groupResponse.ok) {
        throw new Error('Group fetch failed');
      }
      const groupData = (await groupResponse.json()) as GroupSelect[];
      setGroups(groupData);
    })();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      for (const account of accounts) {
        const searchParams = new URLSearchParams();
        searchParams.set('addressPrefix', account.slice(0, 4));
        const response = await fetch(
          `/api/address-to-groups?${searchParams.toString()}`,
          {
            cache: 'no-store',
          }
        );
        if (!response.ok) {
          throw new Error('Data fetch failed'); // This will be caught by the catch block
        }

        const data = await response.json();
        setAddressesToGroups(prev => ({ ...prev, ...data }));
      }
      setIsLoading(false);
    };

    fetchGroups();
  }, [accounts]);

  const switchWallets = async () => {
    if ((window as any).ethereum) {
      setIsSwitchingWallets(true);
      await (window as any).ethereum.request({
        method: 'wallet_revokePermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });

      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      setAccounts(accounts);
      setIsSwitchingWallets(false);
    }
  };

  const eligibleGroups = () => {
    const addressAndGroup: {
      address: string;
      group: string;
    }[] = [];

    for (const account of accounts) {
      if (addressesToGroups[account]) {
        for (const group of addressesToGroups[account]) {
          addressAndGroup.push({
            address: account,
            group,
          });
        }
      }
    }

    // Filter out duplicate groups
    const uniqueGroups = addressAndGroup.filter(
      ({ group }, index) =>
        index === addressAndGroup.findIndex(t => t.group === group)
    );

    return uniqueGroups.map(({ address, group }) => {
      return {
        address,
        group: groups.find(g => g.handle === group)!,
      };
    });
  };

  const addedGroups =
    user?.fidAttestations.map(
      attestation => attestation.MerkleTree.Group.handle
    ) || [];

  const creddd = eligibleGroups();

  return (
    <div className="flex flex-col gap-y-[30px] justify-start items-center h-[90vh]">
      <div className="text-[24px]">Add creddd to your Farcaster account</div>

      {!!user && (
        <div className="flex flex-col items-center gap-y-[20px]">
          <img
            src={user.pfp_url}
            alt="profile image"
            className="w-[60px] h-[60px] rounded-full object-cover"
          ></img>
          <div>
            <div>{user.display_name} </div>
            <div className="opacity-50">(FID {user?.fid})</div>
          </div>
        </div>
      )}

      {!isLoading && accounts.length == 0 && !isSwitchingWallets && (
        <div className="flex flex-col gap-[14px]">
          <div className="opacity-80">Connect your wallets to add creddd</div>
          <Button onClick={connectAccounts}>
            Connect Wallets via Metamask
          </Button>
        </div>
      )}

      {isLoading && <div>Loading...</div>}

      {!isLoading && accounts && accounts.length > 0 && (
        <div className="flex flex-col gap-[14px]">
          <div className="opacity-80 text-center">
            {creddd.length === 0 ? (
              <>No creddd found for connected wallets</>
            ) : (
              <>You are eligible for the following creddd:</>
            )}
          </div>
          <div className="flex flex-col h-[200px] items-center gap-y-[20px] overflow-scroll">
            {creddd.map((group, i) => (
              <WalletView
                walletAddr={group.address}
                group={group.group}
                added={addedGroups.some(g => g === group.group.handle)}
                key={i}
              />
            ))}
            {addedGroups.length > 0 ? (
              <div className="text-sm opacity-80">
                See what you can do with creddd{' '}
                <Link
                  href="https://personae-labs.notion.site/Creddd-9cdf710a1cf84a388d8a45bf14ecfd20"
                  target="_blank"
                >
                  here
                </Link>
              </div>
            ) : (
              <></>
            )}
            <Button variant="link" onClick={switchWallets}>
              Switch wallets
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
