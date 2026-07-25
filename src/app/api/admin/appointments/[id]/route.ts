import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import * as jose from 'jose';

async function checkAuth(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production');
    const { payload } = await jose.jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await checkAuth(req);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const id = (await params).id;
    const body = await req.json();
    const { status, doctorId, date, time } = body;

    const dataToUpdate: any = { status };

    if (doctorId !== undefined) {
      dataToUpdate.doctorId = doctorId === '' ? null : doctorId;
    }
    if (date !== undefined) {
      // Allow clearing date by passing empty string, or update it
      dataToUpdate.date = date === '' ? null : new Date(date);
    }
    if (time !== undefined) {
      dataToUpdate.time = time === '' ? null : time;
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: dataToUpdate,
      include: {
        patient: true,
        doctor: true,
      }
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
