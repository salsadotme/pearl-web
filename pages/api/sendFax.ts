import axios from 'axios'; 

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// async..await is not allowed in global scope, must use a wrapper
const send = async (
  title = "Hi from the Pearl Fax Machine!",
  message = "Something you will like forsure! ( From the Future! )"
) => {
  try {
      let baseURL = "kernel-labs.signalwire.com"; 
      
    // return {
    //   success: true,
    //   url: nodemailer.getTestMessageUrl(info),
    //   title,
    //   message,
    // };
      
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

const sendFax = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  console.log("Request body: " + JSON.stringify(req.body));

  let { title, message } = req.body;

  let sendRes = await send(title, message);
  res.status(200).json(sendRes);
};

export default sendFax;
