import { prisma } from '@/shared/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

function signJwt(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: '7d'})
}

export async function POST(req: NextRequest) {
    try {
        const { email, password} = await req.json()
        const existingUser = await prisma.user.findUnique({where: {email}})
        if (existingUser) {
            return NextResponse.json({message: 'Пользователь уже существует'}, {status: 400})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {email, password: hashedPassword}
        })
        const token = signJwt({userId: user.id})
        const res = NextResponse.json({message: "Пользователь создан"})
        res.cookies.set("token", token, {httpOnly: true, path: '/'})
        return res
    } catch  {
        return NextResponse.json({message: "Ошибка сервера"}, {status: 500})
    }
}