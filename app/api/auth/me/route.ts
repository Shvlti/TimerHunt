import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { prisma } from "@/shared/lib/prisma";

export async function GET(req: NextRequest){
    try {
        const token = req.cookies.get("token")?.value

        if (!token) {
            return NextResponse.json({message: "Не авторизован"}, {status: 401})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: string
        }
        const user = await prisma.user.findUnique({
            where: {id: decoded.userId},
            select: {
                id: true,
                email: true
            }
        })
        return NextResponse.json({user})
    } catch {
        return NextResponse.json({ message: 'ОШибка аторизации'}, {status: 401})
    }
}