import {NextResponse} from "next/server";
import {db,normalizeCode,requireAdmin} from "@/lib/supabase-rest";
export async function GET(req:Request){
 try{requireAdmin(req);const code=normalizeCode(new URL(req.url).searchParams.get("teamCode")||"");const orgs=await db(`organizations?team_code=eq.${encodeURIComponent(code)}&select=id,name`) as Array<{id:string;name:string}>;if(!orgs?.[0])throw new Error("Team not found");const rows=await db(`submissions?organization_id=eq.${orgs[0].id}&select=stakeholder_group,domain_scores,evidence_confidence,created_at&order=created_at.desc`) as Array<{stakeholder_group:string;domain_scores:unknown;evidence_confidence:unknown;created_at:string}>;
 const counts=rows.reduce((a:Record<string,number>,r)=>({...a,[r.stakeholder_group]:(a[r.stakeholder_group]||0)+1}),{});const visibleGroups=Object.fromEntries(Object.entries(counts).filter(([,n])=>n>=3));return NextResponse.json({organization:orgs[0],responseCount:rows.length,submissions:rows,stakeholderCounts:visibleGroups,suppressionThreshold:3});
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Unable to load summary"},{status:401})}
}
