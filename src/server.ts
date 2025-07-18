import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";
import { createRoomRoute } from "./http/routes/create-room.ts";
import { getRoomsQuestions } from "./http/routes/get-rooms-questions.ts";
import { createQuestionRoute } from "./http/routes/create-question.ts";
import { uploadAudioRoute } from "./http/routes/upload-audio.ts";
import { uploadTranscribeAudio } from "./http/routes/upload-transcribe-audio.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});
app.register(fastifyMultipart);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
  return "Server OK";
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomsQuestions);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);
app.register(uploadTranscribeAudio);

app.listen({ port: env.PORT, host: env.HOST });
