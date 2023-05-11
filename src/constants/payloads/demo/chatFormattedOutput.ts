import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';
import { BaseRequesttPayload, BaseResponsePayload } from 'constants/ai';

const stucturedOutput = z.object({
  answer: z.string().describe('Rewriting'),
  summary: z
    .array(z.string())
    .describe(
      'as an array of strings ex. ["item:"]: stated in first-person, 3 points that summarize the main points of the text.',
    ),
});

export const parser = StructuredOutputParser.fromZodSchema(stucturedOutput);

export interface RequestPayload extends BaseRequesttPayload {}

export interface ResponsePayload extends BaseResponsePayload {
  structuredOutput: z.infer<typeof stucturedOutput>;
}
