// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Hardcode username dan password untuk sementara
        const hardcodedUsername = "kay";
        const hardcodedPassword = "kay123";

        console.log("Credentials received:", credentials);

        // Verifikasi username dan password
        if (
          credentials?.username === hardcodedUsername &&
          credentials?.password === hardcodedPassword
        ) {
          // Jika berhasil, kembalikan objek user
          console.log("Login successful");
          return {
            id: 1,
            name: "Super Admin",
            role: "superadmin",
          };
        } else {
          // Jika gagal, kembalikan null
          console.log("Login failed");
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Halaman login
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Tambahkan role ke token
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role; // Tambahkan role ke session
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Gunakan JWT untuk menyimpan session
  },
  secret: process.env.NEXTAUTH_SECRET, // Pastikan kamu sudah menambahkan NEXTAUTH_SECRET di env
});
