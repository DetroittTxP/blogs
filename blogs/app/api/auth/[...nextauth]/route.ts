//@ts-nocheck
import NextAuth,{NextAuthOptions} from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';
import { ConnectDB } from "@/lib/ConnectDB";
import User from "@/models/UserModel";

type credentialsType = {
    username:string,
    password:string,
}

export const authOptions : NextAuthOptions = {
     providers:[
        CredentialsProvider({
             name:"credentials",
             credentials:{},

             async authorize(credentials,req){
                 
                  const {username,password} = credentials as credentialsType;
                  try{
                        await ConnectDB();
                        const user = await User.findOne({username}); 
                        
                        if(!user){
                           return null;
                        }

                        const isMatch = await bcrypt.compare(password,user.password);
                        if(!isMatch)return null;
            
                        return user;
                  }  
                  catch(err){
                     console.log(err);
                     
                  }
               
             }
        })
     ],
     session:{
        strategy:'jwt'
     },
     secret:process.env.NEXTAUTH_SECRET,
     pages:{
        signIn:'/login'
     },
     callbacks: {
      async jwt({ token, user }) {
          if (user) {
              token.id = user.id;
              token.username = user.username;
          }
          return token;
      },
      async session({ session, token }) {
          if (token) {
              session.user.id = token.id;
              session.user.username = token.username;
          }
          return session;
      }
  },
  jwt: {
      maxAge: 60 * 60 * 24 * 7, // 1 week
  }

}


const handler = NextAuth(authOptions);

export {handler as GET,handler as POST};

