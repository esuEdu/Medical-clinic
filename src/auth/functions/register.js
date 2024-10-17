import middy from "@middy/core";
import AuthService from "../auth.service.js";

const register = async (event) => {

  await AuthService.register(event.detail.payload);
};

export const handler = middy().handler(register);
