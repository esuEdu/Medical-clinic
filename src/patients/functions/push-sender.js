import middy from "@middy/core";

const pushSender = async (event) => {
  console.log("Event received", event);
};

export const handler = middy().handler(pushSender);
