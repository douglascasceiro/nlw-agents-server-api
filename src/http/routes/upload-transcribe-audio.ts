import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { transcribeAudio } from "../../services/gemini.ts";

export const uploadTranscribeAudio: FastifyPluginCallbackZod = (app) => {
  app.post("/transcribe-audio", async (request, reply) => {
    try {
      const audio = await request.file();

      if (!audio) {
        throw new Error("Audio is required");
      }

      // Transcrever o áudio
      const audioBuffer = await audio.toBuffer();
      const audioAsBase64 = audioBuffer.toString("base64");
      const transcription = await transcribeAudio(
        audioAsBase64,
        audio.mimetype
      );

      return reply.status(201).send({ transcription });
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: Identificar Erros de Banco no LOG
      console.error(err);
      throw err;
    }
  });
};
