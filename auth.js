import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./database/mongoClientPromise"
import Credentials from "next-auth/providers/credentials"
import { userModel } from "./models/user-model"
import bcrypt from "bcryptjs";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt"
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (credentials === null) return null;
        const user = await userModel.findOne({email: credentials.email});

        if (user) {
          const isMatch = await bcrypt.compare(credentials?.password, user.password);

          if (isMatch) {
            return user;
          } else {
            throw new Error("Email and password do not match");
          }
        } else {
          throw new Error("User not found");
        }
      }
    })
  ],
})