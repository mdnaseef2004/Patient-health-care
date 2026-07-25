import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, phone, age, gender, cause } = data;

    // Generate patient ID
    const generatedId = `${name.replace(/\s+/g, '').toUpperCase().substring(0, 4)}-${phone.slice(-4)}`;

    // Create or update patient
    const patient = await prisma.patient.upsert({
      where: { patientId: generatedId },
      update: { name, phone, age: parseInt(age), gender },
      create: {
        patientId: generatedId,
        name,
        phone,
        age: parseInt(age),
        gender
      }
    });

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        cause
      }
    });

    return NextResponse.json({ id: patient.id, appointmentId: appointment.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment', details: (error as Error).message },
      { status: 500 }
    );
  }
}
