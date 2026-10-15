const {r,auth,body}=require('./_lib');
module.exports=async(q,s)=>{
  if(q.method==='GET'){ if(!auth(q))return s.status(401).end(); return s.json((await r('LRANGE','orders',0,199)).map(x=>JSON.parse(x))); }
  const o=body(q),rows=(Array.isArray(o.rows)?o.rows:[]).slice(0,8).map(x=>[String(x[0]).slice(0,40),String(x[1]).slice(0,80)]);
  const ord={code:String(o.code||'').slice(0,12),usd:+o.usd||0,kind:o.kind==='account'?'account':'topup',rows,t:Date.now()};
  await r('LPUSH','orders',JSON.stringify(ord)); await r('LTRIM','orders',0,499);
  const c=JSON.parse(await r('GET','cfg')||'{}');
  if(c.tgToken&&c.tgChat) await fetch('https://api.telegram.org/bot'+c.tgToken+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:c.tgChat,text:'🛒 បញ្ជាទិញថ្មី $'+ord.usd.toFixed(2)+'\n'+rows.map(x=>x[0]+': '+x[1]).join('\n')})}).catch(()=>{});
  s.json({ok:1});
};
