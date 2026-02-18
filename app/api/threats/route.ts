
import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db-service';

export async function GET() {
    try {
        const threats = await dbService.getThreats();
        return NextResponse.json(threats);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch threats' },
            { status: 500 }
        );
    }
}
