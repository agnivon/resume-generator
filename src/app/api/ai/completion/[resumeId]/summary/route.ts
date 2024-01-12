import { getResumeSummaryPrompt } from "@/constants/prompt.constants";
import { getUniqueCompleteResume } from "@/utils/prisma.utils";
import { getNextAuthServerSession, isAuthenticated } from "@/utils/session.utils";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime =
  process.env.NODE_ENV === "production" ? "edge" : undefined;

export async function POST(
  req: Request,
  { params }: { params: { resumeId: string } }
) {
  const session = await getNextAuthServerSession();

  if (isAuthenticated(session)) {
    try {
      const { jobTitle, jobDescription, useExperiences, useSkills } =
        await req.json();

      const resume = await getUniqueCompleteResume(params.resumeId);

      const prompt = getResumeSummaryPrompt({
        resume,
        jobTitle,
        jobDescription,
        useExperiences,
        useSkills,
      });

      // Ask OpenAI for a streaming completion given the prompt
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        stream: true,
        temperature: 0.6,
        messages: [{ role: "user", content: prompt }],
      });
      // Convert the response into a friendly text-stream
      const stream = OpenAIStream(response);
      // Respond with the stream
      return new StreamingTextResponse(stream);
    } catch (err) {
      return new NextResponse(err as string, { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
