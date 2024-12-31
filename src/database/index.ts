import { MONGODB_URI } from "src/common/config";
import { UserSchema } from "./schemas/user.schema";
import mongoose from "mongoose";
import { log } from "src/common/utils/log";
/**
 * create mongo db database connection.
 */
async function createDbConnection() {
  try {
    await mongoose.connect(MONGODB_URI, {});
    log("database", "log", "mongodb connection success.!!!");
  } catch (error) {
    log("database", "error", "mongodb connection error");
  }
}

/**
 * close mongo db connection
 */
async function closeDbConnection() {
  await mongoose.connection.close();
  log("database", "log", "mongo db connection closed successfully");
}

/**
 * start mongodb transaction
 * @returns {session}
 */
async function startTransaction() {
  const session = await mongoose.startSession();
  session.startTransaction();
  return session;
}
/**
 * end mongo db transaction
 * @param {Session} session 
 */
async function endTransaction(session: any) {
  await session.commitTransaction();
  session.endSession();
}

/**
 * abort mongo db transaction
 * @param {Session} session 
 */
async function abortTransaction(session: any) {
  await session.abortTransaction();
  session.endSession();
}

export {
  createDbConnection,
  closeDbConnection,
  startTransaction,
  endTransaction,
  abortTransaction,
};
export const schemas = {
    UserSchema,
}
