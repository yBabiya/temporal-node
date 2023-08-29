import wf from '@temporalio/workflow';

export const stopSignal = wf.defineSignal('stopSignal');
const { sendConfirmation, alertBlocked } = wf.proxyActivities({
  startToCloseTimeout: '1 minute',
});

export async function example(name) {
  try{
    let isBlocked = false;
    wf.setHandler(stopSignal, ()=>{isBlocked = true})
    await Promise.race([wf.condition(()=>isBlocked),wf.sleep("30s")]);
    if(isBlocked){
      return await alertBlocked(name);
    }
    return await sendConfirmation(name);
  }catch(err){
    console.log(err)
    return;
  }
}
