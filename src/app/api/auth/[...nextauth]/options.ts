
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
          // Find user by email or username
          const user = await UserModel.findOne({
            $or: [
              { userEmail: credentials?.email },
              { userName: credentials?.email } 
            ]
          });

          if (!user) throw new Error("No user found with the provided email/username");

          if (!user.isVerified) throw new Error("Please verify your account first!");

          const isPasswordValid = await bcrypt.compare(credentials?.password, user.password);
          if (!isPasswordValid) throw new Error("Incorrect password");

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
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessage = user.isAcceptingMessage;
        token.userName = user.userName;  
      }
      return token;
    },

    async session({ session, token }) {
      const customToken = token as any as { 
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessage?: boolean;
        userName?: string;
      };
    
      if (customToken) {
        session.user._id = customToken._id?.toString();
        session.user.isVerified = customToken.isVerified;
        session.user.isAcceptingMessage = customToken.isAcceptingMessage;
        session.user.userName = customToken.userName;
      }
    
      return session;
    }
    
  },

  pages: { signIn: '/signin' },
  session: { strategy: 'jwt' }
};



