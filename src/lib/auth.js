import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient( process.env.MONGODB_URI);
const db = client.db("ridevault-database");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    
    client: client,
  }),

  emailAndPassword: { 
    enabled: true, 
  }, 
});