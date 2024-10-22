import connectToDB from '@/lib/dbConnect'; 
import skillModel from '@/models/skill'; 

export async function POST(req){


  const{name,svgUrl}= await req.json();
  try{
    await connectToDB();
    const newSkill=await skillModel.create({name,svgUrl});
    return new Response(JSON.stringify({ message:"skill added successfully" }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  }catch(error){
    return new Response(JSON.stringify({ 
        message: 'Server error',
        error
      }), { status: 500 });
  }

}