import dynamoose from "dynamoose";
import crypto from "node:crypto";
import { appointmentSchema } from "./appointments.schema.js";

const AppointmentModel = dynamoose.model("Appointment", appointmentSchema, {
  create: true,
  waitForActive: false,
});

async function create(payload) {
  payload.id = crypto.randomUUID();

  payload.PK = `APPOINTMENT#${payload.id}`;

  // change this because the birthDate is always enter in undeifined
  payload.appointmentDate = payload.appointmentDate
    ? new Date(payload.appointmentDate)
    : undefined;

  const { PK, ...result } = await AppointmentModel.create(payload);

  return result;
}

async function getOneById(id) {
  const { PK, ...result } = await AppointmentModel.get(`APPOINTMENT#${id}`);

  return result;
}

async function getAll() {
  const result = await AppointmentModel.scan().exec();

  return result.map((item) => {
    item.PK = undefined;
    return item;
  });
}

async function update(id, payload) {
  const { PK, ...result } = await AppointmentModel.update(
    `APPOINTMENT#${id}`,
    payload
  );

  return result;
}

async function deleteById(id) {
  try {
    await AppointmentModel.delete({ PK: `APPOINTMENT#${id}` });
    console.log("Successfully deleted item");
  } catch (error) {
    console.error(error);
  }

  return { message: "Appointment deleted successfully" };
}

export default {
  create,
  getOneById,
  getAll,
  update,
  deleteById,
};
