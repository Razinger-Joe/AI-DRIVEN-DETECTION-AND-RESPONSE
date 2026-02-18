
import { NextResponse } from 'next/server';
import { dbService } from '@/lib/db-service';

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { status } = await request.json();

        // Validate status
        if (!['active', 'investigating', 'resolved'].includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status' },
                { status: 400 }
            );
        }

        const updatedThreat = await dbService.updateThreatStatus(params.id, status);
        return NextResponse.json(updatedThreat);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update threat status' },
            { status: 500 }
        );
    }
}
