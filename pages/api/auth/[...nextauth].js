// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
// import clientPromise from "../../../config/database/connection";

export default NextAuth({
providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    ],
//     secret: process.env.SECRET,
//     jwt: {
//     secret: process.env.SECRET,
//     maxAge: 60 * 60 * 24 * 30,
//   },
//   session:{
//     jwt: true
//   }
//   adapter: MongoDBAdapter(clientPromise),
});