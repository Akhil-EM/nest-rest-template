import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PORT } from "./common/config";
import { log } from "./common/utils/log";
import { createDbConnection } from "./database";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT);
    log("bootstrap", "log", `Application is running on: ${await app.getUrl()}`);
    await createDbConnection();
  } catch (error) {
    log("bootstrap", "error", `error starting server : ${(error as Error).message}`);
  }

}
bootstrap();
