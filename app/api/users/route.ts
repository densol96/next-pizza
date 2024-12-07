import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const users = await prisma.user.findMany();
    return NextResponse.json({users});
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    try {
        const user = await prisma.user.create({data});
        return NextResponse.json({status: 200, message: "User created", user});
    } catch(e) {
        return NextResponse.json({status: 400, message: "Error happened"});
    }
}



