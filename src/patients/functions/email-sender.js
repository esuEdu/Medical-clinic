import middy from "@middy/core";

const mailSender = async (event) => {
  console.log("Event received", event);
};

export const handler = middy().handler(mailSender);
