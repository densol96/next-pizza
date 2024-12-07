import { prisma } from "@/prisma/prisma-client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const searchQuery = req.nextUrl.searchParams.get('query') || '';

    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchQuery,
                mode: 'insensitive' 

            }
        },
        take: 5,
    })

    return NextResponse.json({response: "hello World"});
}