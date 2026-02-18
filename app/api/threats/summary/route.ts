
import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db-service';

export async function GET() {
    try {
        const summary = await dbService.getThreatSummary();
        return NextResponse.json(summary);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch usage summary' },
            { status: 500 }
        );
    }
}
