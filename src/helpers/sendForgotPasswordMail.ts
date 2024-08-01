import MailComponent from "@/components/emails/MailComponent";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendForgotPasswordMail(email: string, Code: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Banao Auth | Forget Password Code",
      react: MailComponent({ email, otp: Code }),
    });

    console.log(data);
    console.log(error);

    if (error) {
      return {
        success: false,
        message: "Failed to send verification Email",
      };
    }

    console.log("Email sent successfully");

    return {
      success: true,
      message: "Email sent successfullt",
      data,
    };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return {
      success: false,
      message: "Failed to send verification Email",
    };
  }
}
