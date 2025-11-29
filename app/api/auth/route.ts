import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const {email, password} = await request.json();

        if(email !== process.env.EMAIL) {
            return NextResponse.json({error: "Email is invalid"});
        }
        if(password !== process.env.PASSWORD) {
            return NextResponse.json({error: "Password is invalid"});
        }

        return NextResponse.json({message: "Login successful"}, {
            status: 200
        });
    } catch (e) {
        console.log(e);
        return NextResponse.json({error: "Authentication error"}, {
            status: 500,
        })
    }
}