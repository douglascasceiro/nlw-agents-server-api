import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { generateEmbedding, transcribeAudio } from "../../services/gemini.ts";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/rooms/:roomId/audio",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { roomId } = request.params;
        const audio = await request.file();

        if (!audio) {
          throw new Error("Audio is required");
        }

        // 1. Transcrever o áudio
        const audioBuffer = await audio.toBuffer();
        const audioAsBase64 = audioBuffer.toString("base64");
        const transcription = await transcribeAudio(
          audioAsBase64,
          audio.mimetype
        );

        // 2. Gerar o vetor semântico (embeddings)
        const embeddings = await generateEmbedding(transcription);

        // 3. Armazenar os vetores no banco de dados
        const result = await db
          .insert(schema.audioChunks)
          .values({
            roomId,
            transcription,
            embeddings,
          })
          .returning();

        const chunk = result[0];
        if (!chunk) {
          throw new Error("Erro ao salvar chunk de áudio");
        }

        return reply
          .status(201)
          .send({ chunkId: chunk.id, transcription, embeddings });
      } catch (err) {
        // biome-ignore lint/suspicious/noConsole: Identificar Erros de Banco no LOG
        console.error(err);
        throw err;
      }
    }
  );
};
