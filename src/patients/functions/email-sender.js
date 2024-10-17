import middy from "@middy/core";
import patientsService from "../patients.service";

const mailSender = async (event) => {
  patientsService.sendEmail(event.detail.patient);
};

export const handler = middy().handler(mailSender);
