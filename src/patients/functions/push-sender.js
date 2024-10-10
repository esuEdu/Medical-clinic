import middy from "@middy/core";

const pushSender = async (event) => {
  console.log("Push sender function");
};

export const handler = middy().handler(pushSender);
