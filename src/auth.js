import NextAuth, { AuthError } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
const {
  loginUser,
  getUserByEmail,
  createUser,
  checkIntegrationById,
} = require("@/backend/controllers/userController");
// google provider
import Google from "next-auth/providers/google";
// github provider
import GitHub from "next-auth/providers/github";
// login with facebook
// login with twitter
import Twitter from "next-auth/providers/twitter";
// authenticate with tiktok provider
import TikTok from "next-auth/providers/tiktok";
// facebook provider
import Facebook from "next-auth/providers/facebook";
// generate random password while loginw ith any provdier
import Instagram from "next-auth/providers/instagram";
import Slack from "next-auth/providers/slack";
import Discord from "next-auth/providers/discord";
import { authConfig, InvalidLoginError } from "./auth.config";
// save Google User
import { generateRandomPassword } from "./utils/helper";

let currentAccount = null;
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  debug: true,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log("these are credentials--", credentials);

        let errorMessage = null;
        let currentUser = null;
        try {
          const req = {
            body: {
              email: credentials?.email,
              password: credentials?.password,
            },
          };
          const res = {
            status: (code) => {
              return res;
            },
            json: (data) => {
              if (data.status == false) {
                errorMessage = data.message;
                throw new Error(data.message);
              } else {
                console.log("this is user ---", data.user);
                currentUser = data.user;
              }
            },
          };

          const getUser = await loginUser(req, res);
          console.log(":rocket: ~ authorize ~ getUser:", getUser);
        } catch (err) {
          console.log("Error in authorize: ", err);
          throw new Error(err.message);
        }

        console.log("this is currentUser--", currentUser);
        if (currentUser != null) {
          return currentUser;
        }
        return null;
      },
    }),
    // First Google provider for general login
    Google(),
    // Second Google provider for specific purpose
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID_2,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET_2,
    //   // Optionally, add a custom name for this provider
    //   name: 'google-integration'
    // }),
    GitHub(),
    Twitter(),
    Facebook(),
    Instagram(),
    Slack(),
    Discord(),
    TikTok({
      clientId: "awmjm2zq4j3b9xfh",
      clientSecret: "8xW8z6Fd5mYviC2kWTeFHajP2JhvmlEw",
      issuer: "https://tiktok.com",
      token: "https://api.tiktok.com/oauth/token",
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      try {
        console.log("this is session---", session);
        let currentUser = null;
        let currentStatus = null;
        const req = {
          body: {
            email: session.user.email,
          },
        };
        const res = {
          status: (code) => {
            currentStatus = code;
            return res;
          },
          json: (data) => {
            currentUser = data.user;
          },
        };
        await getUserByEmail(req, res);
        if (currentStatus == 200) {
          session.user = currentUser;
        } else {
          const req = {
            body: {
              username: session?.user?.name,
              email: session?.user?.email,
              password: await generateRandomPassword(),
            },
          };
          const res = {
            status: (code) => {
              currentStatus = code;
              return res;
            },
            json: (data) => {
              currentUser = data.user;
            },
          };
          session.user.id = token.id;
          return session;
        }

        currentAccount = session;
        return session;
      } catch (err) {
        console.log("Error in session callback: ", err);
        return session;
      }
      return null;
    },
    async signIn({ user, account, profile, credentials }) {
      console.log("user---", user);
      console.log("account---", account);
      console.log("profile---", profile);
      console.log("credentials---", credentials);
      console.log("currentAccount---", currentAccount);

      return true;
    },
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
        }
        return token;
      } catch (error) {
        return token;
      }
    },
  },
});
