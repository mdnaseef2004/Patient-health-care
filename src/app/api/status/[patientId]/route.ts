import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ patientId: string }> }
) {
  try {
    const patientId = (await params).patientId.trim().toUpperCase();

    // Find the patient's latest appointment
    const appointment = await prisma.appointment.findFirst({
      where: { 
        patient: { patientId: patientId } 
      },
      orderBy: { createdAt: 'desc' },
      include: { doctor: true }
    });

    if (!appointment) {
      return NextResponse.json({ error: 'No appointments found for this Patient ID' }, { status: 404 });
    }

    return NextResponse.json({
      status: appointment.status,
      date: appointment.date ? appointment.date.toISOString() : null,
      time: appointment.time,
      doctorName: appointment.doctor ? appointment.doctor.name : null,
    });
  } catch (error) {
    console.error('Error fetching appointment status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
