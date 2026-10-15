const U=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL,T=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;
exports.r=async(...c)=>(await(await fetch(U,{method:'POST',headers:{Authorization:'Bearer '+T},body:JSON.stringify(c)})).json()).result;
exports.auth=q=>!!process.env.ADMIN_PASSWORD&&q.headers['x-admin']===process.env.ADMIN_PASSWORD;
exports.body=q=>typeof q.body==='string'?JSON.parse(q.body||'{}'):(q.body||{});
