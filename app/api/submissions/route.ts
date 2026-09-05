import {NextResponse} from "next/server";
import {db,normalizeCode} from "@/lib/supabase-rest";
const groups=new Set(["leader","staff","student","family","community","design_team"]);
export async function POST(req:Request){
 try{const body=await req.json();const code=normalizeCode(body.teamCode||"");if(code.length<3)throw new Error("Enter a valid team code");if(!groups.has(body.stakeholderGroup))throw new Error("Select a stakeholder group");if(!Array.isArray(body.responses)||body.responses.length!==25)throw new Error("Complete all 25 indicators");
 const orgs=await db(`organizations?team_code=eq.${encodeURIComponent(code)}&active=eq.true&select=id`);if(!orgs?.[0])throw new Error("Team code not found");
 const rows=await db("submissions",{method:"POST",body:JSON.stringify({organization_id:orgs[0].id,cycle_id:body.cycleId||null,stakeholder_group:body.stakeholderGroup,responses:body.responses,domain_scores:body.domainScores,evidence_confidence:body.evidenceConfidence,reflections:body.reflections||{},top_priority_domain:body.topPriorityDomain||null})});return NextResponse.json({ok:true,id:rows[0].id});
 }catch(e){return NextResponse.json({ok:false,error:e instanceof Error?e.message:"Submission failed"},{status:400})}
}
