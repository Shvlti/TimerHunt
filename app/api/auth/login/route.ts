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
        const user = await prisma.user.findUnique({
            where: {email}
        })
        if (!user) {
            return NextResponse.json(
                {message: 'Пользователь не найден'}, {status: 400}
            )
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword){
            return NextResponse.json(
                {message: "Неверный пароль"}, {status: 400}
            )
        }
        const token = signJwt({userId: user.id})
        const res = NextResponse.json({message: "Вы успешно вошли"})
        res.cookies.set("token", token, {httpOnly: true, path: '/'})
        return res
    } catch  {
        return NextResponse.json({message: "Ошибка сервера"}, {status: 500})
    }
}