import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import * as jose from 'jose';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production');
    const { payload } = await jose.jwtVerify(token, secret);

    const admin = await prisma.admin.findUnique({
      where: { id: payload.id as string },
      select: { id: true, email: true, name: true, role: true, photo: true, createdAt: true }
    });

    if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });

    return NextResponse.json(admin);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production');
    const { payload } = await jose.jwtVerify(token, secret);

    const { name, email, photo } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const admin = await prisma.admin.update({
      where: { id: payload.id as string },
      data: { name, email, photo },
      select: { id: true, email: true, name: true, role: true, photo: true }
    });

    return NextResponse.json(admin);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
