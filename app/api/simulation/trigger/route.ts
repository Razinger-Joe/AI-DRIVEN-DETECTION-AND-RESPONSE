
import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db-service';

export async function POST() {
    try {
        const newThreat = await dbService.simulateIncomingThreat();
        return NextResponse.json(newThreat);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to simulate threat' }, { status: 500 });
    }
}
