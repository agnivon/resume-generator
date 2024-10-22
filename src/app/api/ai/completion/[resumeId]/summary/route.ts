import prisma from "@/clients/prismaClient";
import { GPTGenerationType } from "@/constants/generation.constants";
import { getResumeSummaryPrompt } from "@/constants/prompt.constants";
import {
  getNextAuthServerSession,
  isAuthenticated,
} from "@/utils/session.utils";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { SummaryGenerationPayload } from "./_validation";

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
      const userMembership = await prisma.userMembership.findUnique({
        where: { userId: session.user.id },
      });

      if (!userMembership?.premium)
        return new NextResponse("Forbidden", { status: 401 });

      const { jobTitle, jobDescription, useExperiences, useSkills } =
        SummaryGenerationPayload.validateSync(await req.json());

      const resume = await prisma.resumeV2.findUniqueOrThrow({
        where: { id: params.resumeId },
      });

      const prompt = getResumeSummaryPrompt({
        resume,
        jobTitle,
        jobDescription,
        useExperiences,
        useSkills,
      });

      //console.log(prompt);

      // Ask OpenAI for a streaming completion given the prompt
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        temperature: 0.6,
        messages: [
          { role: "system", content: "You are a resume expert" },
          { role: "user", content: prompt },
        ],
      });
      // Convert the response into a friendly text-stream
      const stream = OpenAIStream(response, {
        onCompletion: async (completion) => {
          await prisma.gPTGeneration.create({
            data: {
              resumeId: params.resumeId,
              type: GPTGenerationType.SUMMARY,
              content: completion,
            },
          });
        },
      });
      // Respond with the stream
      return new StreamingTextResponse(stream);
    } catch (err) {
      console.log(err);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else {
    return new NextResponse("Forbidden", { status: 401 });
  }
}
