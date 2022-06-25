import nodemailer from "nodemailer";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

// async..await is not allowed in global scope, must use a wrapper
const send = async (
  title = "Hi from Pearl!",
  message = "Something you will like forsure!"
) => {
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "carl.lippert@gmail.com", // list of receivers
      subject: title, // Subject line
      text: message, // plain text body
      html: "<b>This works!?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return {
      success: true,
      url: nodemailer.getTestMessageUrl(info),
      title,
      message,
    };
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

const sendSMTP = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  console.log("Request body: " + JSON.stringify(req.body));

  let { title, message } = req.body;

  let sendRes = await send(title, message);
  res.status(200).json(sendRes);
};

export default sendSMTP;
