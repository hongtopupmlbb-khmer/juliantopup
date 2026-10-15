const {r,auth,body}=require('./_lib');
module.exports=async(q,s)=>{
  if(!auth(q))return s.status(401).json({error:'auth'});
  const {data}=body(q);
  if(!/^data:image\/(png|jpeg|webp);base64,/.test(data||'')||data.length>1.4e6)return s.status(400).json({error:'bad image'});
  const id=Math.random().toString(36).slice(2,10)+Date.now().toString(36);
  await r('SET','img:'+id,data); s.json({url:'/api/img?id='+id});
};
