import { Connection, Client } from '@temporalio/client';
import * as workflows from './workflows.js';
import { createExpressMiddleware } from 'temporal-rest';
import express from "express"
const app = express();


const connection = await Connection.connect({});

const client = new Client({
  connection
});
async function run(req, res) {

  // this is the oneliner that does all the work!
  const workflowId = 'my-business-id'+Math.random()
  const result = await client.workflow.start(workflows.example, {
    taskQueue: 'hello-javascript',
    workflowId: workflowId,
    args: [req.query?.name || "TEMP"],
  });
  return res.send({runId:result.firstExecutionRunId, workflowId: workflowId})
}

async function connectAndStop(req, res) {
  const handle = client.workflow.getHandle(req.query.workflowId ,req.query.runId)
  handle.signal("stopSignal")
  return res.send("It is blocked")
}


app.get("/sendMail",(req,res)=>{
  run(req, res).catch((err) => {
    console.error(err);
    process.exit(1);
  });
});

app.get("/cancelMail",(req, res)=>{
  connectAndStop(req, res).catch((err) => {
    console.error(err);
    process.exit(1);
  });
})

app.listen(5000,()=>{
  console.log('Runnning on 5000...');
})