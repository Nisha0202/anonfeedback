import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          // Find the user by email
          const user = await UserModel.findOne({ email: credentials?.email });

          if (!user) {
            throw new Error("No user found with the provided email");
          } 
          
          if (!user.isVerified) {
            throw new Error("Please verify your account first!");
          }

          // Compare the provided password with the stored hash
          const isPasswordValid = await bcrypt.compare(credentials?.password, user.password);

          if (!isPasswordValid) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Cast token to your custom JWT interface
      const customToken = token as any as { _id?: string; isVerified?: boolean; isAcceptingMessages?: boolean; username?: string };

      if (user) {
        customToken._id = user._id?.toString();
        customToken.isVerified = user.isVerified;
        customToken.isAcceptingMessages = user.isAcceptingMessages;
        customToken.username = user.username;
      }

      return customToken;
    },

    async session({ session, token }) {
      // Cast token to your custom JWT interface
      const customToken = token as any as { _id?: string; isVerified?: boolean; isAcceptingMessages?: boolean; username?: string };

      if (customToken) {
        session.user._id = customToken._id?.toString();
        session.user.isVerified = customToken.isVerified;
        session.user.isAcceptingMessages = customToken.isAcceptingMessages;
        session.user.username = customToken.username;
      }

      return session;
    }
  },




  pages:{
    signIn: '/signin'
  },
  session:{
    strategy: 'jwt'
  }


};

//sign up we are handeling 
//sign in with next auth

