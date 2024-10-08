import { Resend } from "resend";
import VerificationEmail from "@/email/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
const resend = new Resend(process.env.RESENT_API_KEY);

export async function sendVeficationEmail(useremail:string, username:string, verifycode: string): Promise<ApiResponse>{

try {

// sending mail
await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: useremail,
    subject: 'Verification Code - AnonFeedback ',
    react: VerificationEmail({ username, verifycode}),
  });



  
    return {success:true, message: "Verification email sent successfully."}
} catch (error) {
    console.error("Error Sending Verification Email", error);
    return {success:false, message: "Failed to send a verification mail!" }
}

}