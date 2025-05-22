// import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// const ses = new SESClient({
//   region: process.env.AWS_MAIN_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_MY_ACCESS_KEY,
//     secretAccessKey: process.env.AWSCHCE_SECRET_ACCESS_KEY,
//   },
// });

// const sendEmail = async (options) => {
//   const params = {
//     Destination: {
//       ToAddresses: [options.email],
//     },
//     Message: {
//       Body: {
//         Text: {
//           Data: options.message,
//         },
//       },
//       Subject: {
//         Data: options.subject,
//       },
//     },
//     Source: `${process.env.SMTDRP_FROM_NAME} <${process.env.SMTHHP_FROM_EMAIL}>`, // Verified email address
//   };

//   try {
//     const data = await ses.send(new SendEmailCommand(params));
//     console.log("Email sent! Message ID:", data.MessageId);
//     return data;
//   } catch (err) {
//     console.error("Error sending email:", err);
//     throw err;
//   }
// };

// export default sendEmail;

// require("dotenv").config();

// import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// const ses = new SESClient({
//   region: "your-aws-region",
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const params = {
//   Destination: {
//     ToAddresses: ["recipient@example.com"],
//   },
//   Message: {
//     Body: {
//       Text: {
//         Data: "This is a test email from your Node.js app.",
//       },
//     },
//     Subject: {
//       Data: "Test Email from Node.js",
//     },
//   },
//   Source: "sender@example.com",
// };

// ses.sendEmail(params, (err, data) => {
//   if (err) {
//     console.error("Error sending email:", err);
//   } else {
//     console.log("Email sent! Message ID:", data.MessageId);
//   }
// });





// import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// const ses = new SESClient({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// const sendEmail = async (options) => {
//   const params = {
//     Destination: {
//       ToAddresses: [options.email],
//     },
//     Message: {
//       Body: {
//         Text: {
//           Data: options.message,
//         },
//       },
//       Subject: {
//         Data: options.subject,
//       },
//     },
//     Source: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`, // Verified email address
//   };

//   try {
//     const data = await ses.send(new SendEmailCommand(params));
//     console.log("Email sent! Message ID:", data.MessageId);
//     return data;
//   } catch (err) {
//     console.error("Error sending email:", err);
//     throw err;
//   }
// };

// export default sendEmail;

// import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// const ses = new SESClient({
//   region: "",
//   credentials: {
//     accessKeyId: "",
//     secretAccessKey: "",
//   },
// });

// const sendEmail = async (options) => {
//   const params = {
//     Destination: {
//       ToAddresses: [options.email],
//     },
//     Message: {
//       Body: {
//         Text: {
//           Data: options.message,
//         },
//       },
//       Subject: {
//         Data: options.subject,
//       },
//     },
//     Source: `Jcodeuniverse <jagadeeshach126@gmail.com>`,
//   };

//   try {
//     const data = await ses.send(new SendEmailCommand(params));
//     console.log("Email sent! Message ID:", data.MessageId);
//     return data;
//   } catch (err) {
//     console.error("Error sending email:", err);
//     throw err;
//   }
// };

// export default sendEmail;