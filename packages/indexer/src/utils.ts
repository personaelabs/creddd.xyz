import chalk from 'chalk';
import { Hex, HttpTransport, PublicClient } from 'viem';
import { getNextAvailableClient, releaseClient } from './providers/ethRpc';
import * as chains from 'viem/chains';

export const IGNORE_CONTRACTS = ['link', 'mkr'];

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// TODO: Turn this into exponential backoff
export const retry = async <T>(
  fn: () => Promise<T>,
  retries = 5,
  interval = 1000
): Promise<T> => {
  let retried = 0;
  let error: any;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return await fn();
    } catch (_err: any) {
      if (retried >= retries) {
        console.log(chalk.red('Retries exhausted'));
        error = _err;
        break;
      } else {
        retried++;
        console.error(_err);
        console.log(chalk.yellow(`Error detected. Retrying... ${retried}`));
        await sleep(interval);
      }
    }
  }

  throw error;
};

/**
 * Run a function concurrently which uses an Ethereum RPC client.
 * We use a pool of clients to run the function concurrently.
 * @param fn Function to run in parallel
 * @param args List of arguments to pass to fn in parallel
 */
export const runInParallel = async <T>(
  fn: (
    _client: PublicClient<HttpTransport, chains.Chain>,
    _args: T
  ) => Promise<void>,
  jobs: { chain: chains.Chain; args: T }[]
) => {
  const numJobs = jobs.length;

  // Assign each argument an index
  const queuedJobs = jobs.map((job, i) => {
    return {
      job,
      index: i,
    };
  });

  // Keep track of completed jobs
  const completedJobs = new Set<number>();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    while (queuedJobs.length > 0) {
      const queuedJob = queuedJobs[0];
      const managedClient = getNextAvailableClient(queuedJob.job.chain);

      if (managedClient) {
        const arg = queuedJob.job.args;

        const _promise = fn(managedClient.client, arg)
          .then(() => {
            completedJobs.add(queuedJob.index);
            console.log(
              chalk.green(
                `Completed job ${queuedJob.index}/${jobs.length} with client ${managedClient.id}(Completed ${completedJobs.size}/${numJobs})`
              )
            );

            // Free the client
            releaseClient(managedClient);
          })
          .catch(err => {
            console.error(err);

            // TODO: Retry the job
            completedJobs.add(queuedJob.index);

            console.log(
              chalk.red(
                `Failed job ${queuedJob.index}/${jobs.length} with client ${managedClient.id}`
              )
            );
            // Free the client
            releaseClient(managedClient);
          });

        console.log(
          chalk.blue(
            `Started job ${queuedJob.index}/${jobs.length} with client ${managedClient.id} on chain ${queuedJob.job.chain.name}`
          )
        );

        // Remove the job from the queue
        queuedJobs.shift();
      } else {
        // When there are no available clients, wait 3 seconds and try again
        await sleep(3000);
      }
    }

    if (completedJobs.size === numJobs) {
      console.log(chalk.green('All jobs completed'));
      break;
    }

    await sleep(3000);
  }
};

export const getDevAddresses = () => {
  const DEV_ADDRESSES: Hex[] = [
    // Dev addresses
    '0x400ea6522867456e988235675b9cb5b1cf5b79c8', // dantehrani.eth
    '0xcb46219ba114245c3a18761e4f7891f9c4bef8c0', // lsankar.eth
    '0x141b63d93daf55bfb7f396eee6114f3a5d4a90b2', // personaelabs.eth
    '0x4f7d469a5237bd5feae5a3d852eea4b65e06aad1', // pfeffunit.eth
    '0x7806db3adab7e0bdfbba3840bea9389b36c48f52',
    '0xe20fa23c3bc21e0307b6ef0cc8eff9e76a563e47',
  ];

  const DEV_GROUP_SIZE = 1000;

  const members: Hex[] = [];

  for (const address of DEV_ADDRESSES) {
    members.push(address);
  }

  // Add dummy members till the group size
  for (let i = 0; i < DEV_GROUP_SIZE - DEV_ADDRESSES.length; i++) {
    members.push(`0x${i.toString(16).padStart(40, '0')}`);
  }

  return members;
};
