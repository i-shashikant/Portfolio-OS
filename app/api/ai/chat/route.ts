import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { retrieveKnowledge } from '@/lib/ai/retriever';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = body?.query;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'A valid query is required.' },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY is missing');

      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured.' },
        { status: 500 },
      );
    }

    const contextItems = retrieveKnowledge(query, 5);

    const context = contextItems
      .map(
        (item) =>
          `### ${item.title}\n${item.content}`,
      )
      .join('\n\n');

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.6-flash',
      systemInstruction: `
You are Portfolio AI for Shashikant's developer portfolio.

Answer questions using only the portfolio information
provided below.

Do not invent facts.

If the information is unavailable, say so clearly.

Be concise, professional, and natural.

PORTFOLIO INFORMATION:

${context}
`,
    });

    const result = await model.generateContent(query);

    const answer = result.response.text();

    return NextResponse.json({
      answer,
    });
  } catch (error) {
    console.error('========== PORTFOLIO AI ERROR ==========');
    console.error(error);
    console.error('=========================================');

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Unknown Gemini API error.',
      },
      { status: 500 },
    );
  }
}