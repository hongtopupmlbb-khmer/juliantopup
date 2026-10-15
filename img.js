const {r}=require('./_lib');
module.exports=async(q,s)=>{
  const d=await r('GET','img:'+String(q.query.id||'').replace(/\W/g,'')),m=d&&d.match(/^data:([^;]+);base64,(.*)$/);
  if(!m)return s.status(404).end();
  s.setHeader('Content-Type',m[1]); s.setHeader('Cache-Control','public, max-age=31536000, immutable'); s.send(Buffer.from(m[2],'base64'));
};
