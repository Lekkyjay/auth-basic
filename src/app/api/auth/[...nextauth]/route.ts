import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { pool } from '../../dbConfig'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const { name, email, image } = user
      const provider = account?.provider

      try {
        const userInDb = await pool.query('SELECT * FROM users WHERE email = $1', [email])          

        if (userInDb.rows.length === 0) {            
          await pool.query(`INSERT INTO users (name, email, image, provider) VALUES ($1, $2, $3, $4) RETURNING *`, 
          [name, email, image, provider])
        }
        return true
      } 
      catch (error) {
        console.log(error)
        return false
      }
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }