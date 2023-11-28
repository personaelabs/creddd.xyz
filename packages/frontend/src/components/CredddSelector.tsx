import { SET_METADATA } from '@/lib/sets';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { trimAddress } from '@/lib/utils';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from './ui/table';
import { Bold, Italic, Underline } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Card } from './ui/card';

// Number of Merkle proofs that can be proven at once
// TODO: extract into a single constant file
const NUM_MERKLE_PROOFS = 4;

export const CredddSelector = (props: {
  // TODO: add props
  address: string;
  connectedAccounts: string[];
}) => {
  // TODO: eligible sets, selected sets, user sets
  // "i/o" logic:
  // - comumunicate which sets selected (to parent)
  // - figure out which addresses connected (from parent). `address` + `connectedAccounts`
  // - communicate with backend/local data to display eligible credd

  // eligible sets = [{set, eligibleAddr}]

  // hooks:
  // get sets and
  // regenerate eligible sets with connected accounts
  return (
    <div className="flex flex-col space-y-1.5">
      <div>
        <Label htmlFor="framework">Eligible creddd</Label>
      </div>
      {/* NOTE: token whale selector */}
      <Card className="p-4">
        <Label>Token Whale</Label>
        {/* TODO: description? i.e. what exactly are we showing here? */}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Token</TableHead>
              <TableHead className="text-center">Supply owned</TableHead>
              <TableHead className="text-right">Include?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">UNI</TableCell>
              <TableCell>
                <ToggleGroup type="single">
                  <ToggleGroupItem value="bold">
                    <p>&gt;0.1%</p>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" disabled>
                    <p>&gt;0.5%</p>
                  </ToggleGroupItem>
                </ToggleGroup>
              </TableCell>
              <TableCell className="text-right">
                <Switch id="uni-toggle" />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">ARB</TableCell>
              <TableCell>
                <ToggleGroup type="single">
                  <ToggleGroupItem value="bold">
                    <p>&gt;0.1%</p>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic">
                    <p>&gt;0.5%</p>
                  </ToggleGroupItem>
                </ToggleGroup>
              </TableCell>
              <TableCell className="text-right">
                <Switch id="arb-toggle" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* NOTE: genesis depositor selector */}
      <Card className="p-4">
        <Label>Beacon genesis depositor</Label>

        <Table>
          <TableRow>
            <TableCell>
              <ToggleGroup type="single">
                <ToggleGroupItem value="bold">
                  <p>first 100</p>
                </ToggleGroupItem>
                <ToggleGroupItem value="italic">
                  <p>genesis</p>
                </ToggleGroupItem>
              </ToggleGroup>
            </TableCell>

            <TableCell>
              <Switch id="beacon-toggle" />
            </TableCell>
          </TableRow>
        </Table>
      </Card>
    </div>
  );
};
