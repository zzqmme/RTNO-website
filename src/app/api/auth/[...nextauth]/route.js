import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: '624235519227-k07molbp641a02hqfofjl9j6vf5t3nr6.apps.googleusercontent.com',
        clientSecret: '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',
      }),
    ],
})
  

export { handler as GET, handler as POST };