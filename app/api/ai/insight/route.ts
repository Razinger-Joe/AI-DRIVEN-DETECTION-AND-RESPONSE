
import { NextResponse } from 'next/server';
import { mockAIService } from '@/lib/ai-service-mock';

export async function POST() {
    try {
        const insight = await mockAIService.getHealthInsight();
        return NextResponse.json(insight);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to generate AI insight' },
            { status: 500 }
        );
    }
}
