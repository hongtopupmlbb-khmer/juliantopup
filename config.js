const {r,auth,body}=require('./_lib'),def=require('./_default.json');
module.exports=async(q,s)=>{
  if(q.method==='POST'){ if(!auth(q))return s.status(401).json({error:'auth'}); await r('SET','cfg',JSON.stringify(body(q))); return s.json({ok:1}); }
  const raw=await r('GET','cfg'),cfg=raw?JSON.parse(raw):def;
  if(auth(q)){ s.setHeader('Cache-Control','no-store'); return s.json(cfg); }
  const o=(await r('LRANGE','orders',0,9)||[]).map(x=>JSON.parse(x)).filter(x=>x.kind!=='account');
  cfg.ticker=o.map(x=>({n:String((x.rows[2]||[])[1]||'').slice(0,3)+'***',g:(x.rows[1]||[])[1]||'',p:(x.rows[3]||[])[1]||'',t:x.t}));
  delete cfg.tgToken; delete cfg.tgChat;
  s.setHeader('Cache-Control','public, max-age=0, s-maxage=5, stale-while-revalidate=30'); s.json(cfg);
};
