import mail from "@sendgrid/mail";

export const sendOtp = async () => {
  mail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(process.env.from_email);
  const msg = {
    to: "ritikprajapati084@gmail.com",
    from: process.env.from_email,
    subject: "OTP for login",
    text: "Email is sent jsut for fun",
  };

  mail
    .send(msg)
    .then((res) => console.log(`Email sent: ${res}`))
    .catch((err) => console.log("Erroe", err.response.body.errors));
};
