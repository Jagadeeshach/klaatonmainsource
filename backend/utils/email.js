import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import dotenv from "dotenv";

dotenv.config(); 

const sesClient = new SESClient({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export const sendEmail = async ({email, subject, message}) => {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: { Data: message },
      },
      Subject: { Data: subject },
    },
    Source: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`, 
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    console.log("Email sent! Message ID:", response.MessageId);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};












