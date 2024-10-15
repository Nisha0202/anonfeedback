
// import { Resend } from "resend";
// import VerificationEmail from "@/email/VerificationEmail";
// import { ApiResponse } from "@/types/ApiResponse";
// const resend = new Resend(process.env.RESENT_API_KEY);

// export async function sendVerificationEmail(useremail:string, username:string, verifycode: string): Promise<ApiResponse>{

// try {

// // sending mail
// await resend.emails.send({
//     from: 'onboarding@resend.dev',
//     to: useremail,
//     subject: 'Verification Code - AnonFeedback ',
//     react: VerificationEmail({ username, verifycode}),
//   });



  
//     return {success:true, message: "Verification email sent successfully."}
// } catch (error) {
//     console.error("Error Sending Verification Email", error);
//     return {success:false, message: "Failed to send a verification mail!" }
// }

// }



import nodemailer from 'nodemailer';
import { ApiResponse } from "@/types/ApiResponse";

// Create the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL, // Your Gmail email address
    pass: process.env.GMAIL_APP, // Your app-specific password
  },
});

export async function sendVerificationEmail(useremail: string, username: string, verifycode: string): Promise<ApiResponse> {
  try {
    //the email HTML content
    const htmlContent = `
      <div style="background-color: #f5f5f5; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 8px; padding: 20px;">
          <h2 style="font-size: 20px; color: #333;">Hi, ${username}</h2>
          <p style="font-size: 16px; color: #555;">
            Thank you for starting the journey with AnonFeedback!<br/>
            Your OTP for verification is: <strong>${verifycode}</strong>
          </p>
          <a href="https://anonfeedback0.vercel.app/verify/${username}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin:20px">
            Verify Now
          </a>
        </div>
      </div>
    `;

    // Send the email using Nodemailer
    await transporter.sendMail({
      from: '"AnonFeedback" <no-reply@anonfeedback.com>', // Sender address
      to: useremail, // Recipient's email address
      subject: 'Verification Code - AnonFeedback',
      html: htmlContent, // Email content (HTML)
    });

    return { success: true, message: "Verification email sent successfully." };
  } catch (error) {
    console.error("Error Sending Verification Email", error);
    return { success: false, message: "Failed to send a verification mail!" };
  }
}



