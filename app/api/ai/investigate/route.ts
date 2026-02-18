
import { NextResponse } from 'next/server';
import { mockAIService } from '@/lib/ai-service-mock';

export async function POST(request: Request) {
    try {
        const { threatId, query } = await request.json();

        if (!threatId) {
            return NextResponse.json({ error: 'Threat ID required' }, { status: 400 });
        }

        const investigation = await mockAIService.investigateThreat(threatId, query || '');
        return NextResponse.json(investigation);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to run AI investigation' },
            { status: 500 }
        );
    }
}
