import { log } from "src/common/utils/log";
import * as mongodb from "../index";
// import * as schema from "./schemas";
/**
 * run database seeding operations.
 */
async function seeder() {
  //create connection
  await mongodb.createDbConnection();
  //seeding data
  
}

seeder()
  .then(async() => {
    log("seed", "log", "mongo db seeding completed ..!!");

    await mongodb.closeDbConnection();
    process.exit(0);
  })
  .catch(async (error) => {
    log("seed", "error",`error seeding database : ${(error as Error).message}`);
    
    await mongodb.closeDbConnection();
    process.exit(0);
  });
