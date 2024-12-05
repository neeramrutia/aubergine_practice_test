import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest , res : NextResponse){
    const country = req.nextUrl.searchParams.get("country");
    try {
        let uni = await fetch("http://universities.hipolabs.com");
        let uni_data = await uni.json();
        return NextResponse.json(uni_data)
    } catch (error) {
        
    }
}