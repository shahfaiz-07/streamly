import NextAuth, {DefaultSession} from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      username: string;
    } & DefaultSession["user"]
  }
  interface User {
    id: string;
    username: string;
  }
}