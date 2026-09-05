const url=process.env.SUPABASE_URL;
const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
export async function db(path:string,init:RequestInit={}){
 if(!url||!key) throw new Error("Supabase is not configured");
 const res=await fetch(`${url}/rest/v1/${path}`,{...init,headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json",Prefer:"return=representation",...(init.headers||{})},cache:"no-store"});
 if(!res.ok) throw new Error(`Database request failed: ${res.status}`);
 return res.status===204?null:res.json();
}
export function normalizeCode(value:string){return value.trim().replace(/\s+/g,"-").toUpperCase()}
export function requireAdmin(req:Request){if(req.headers.get("authorization")!==`Bearer ${process.env.ADMIN_ACCESS_TOKEN}`)throw new Error("Unauthorized")}
