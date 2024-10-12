import 'next-auth';
import { DefaultSession, DefaultJWT } from 'next-auth';

declare module 'next-auth' {
  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessage?: boolean;
    userName?: string;
  }

  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessage?: boolean;
      userName?: string;
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessage?: boolean;
    userName?: string;
  }
}


// import 'next-auth'
// import { DefaultSession } from 'next-auth';

// declare module 'next-auth' {
//     interface User {
//         _id?: string;
//         isVerified?: boolean;
//         isAcceptingMessage?: boolean;
//         userName?: string;
//     }

//     interface Session {
//         user: {
//           _id?: string;
//           isVerified?: boolean;
//           isAcceptingMessage?: boolean;
//           userName?: string;
//         } & DefaultSession["user"];
//       }
    
//       interface JWT {
//         _id?: string;
//         isVerified?: boolean;
//         isAcceptingMessage?: boolean;
//         userName?: string;
//       }



// }