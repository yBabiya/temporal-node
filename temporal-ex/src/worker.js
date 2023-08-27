import { Worker } from '@temporalio/worker';
import { fileURLToPath, URL } from 'url';
import * as activities from './activities.js';

async function run() {
  const workflowsPathUrl = new URL('./workflows.js', import.meta.url);
  const worker = await Worker.create({
    workflowsPath: fileURLToPath(workflowsPathUrl),
    activities,
    taskQueue: 'hello-javascript',
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
