import dynamoose from "dynamoose";
import crypto from "node:crypto";
import { PatientSchema } from "./patient.schema.js";

const PatientModel = dynamoose.model("Patient", PatientSchema, {
  create: true,
  waitForActive: false,
});

async function create(payload) {
  payload.id = crypto.randomUUID();

  // change this because the birthDate is always enter in undeifined
  payload.birthDate = payload.birthDate
    ? new Date(payload.birthDate)
    : undefined;

  payload.PK = `PATIENT#${payload.id}`;

  const { PK, ...result } = await PatientModel.create(payload);

  return result;
}

async function getOneById(id) {
  const { PK, ...result } = await PatientModel.get(`PATIENT#${id}`);

  return result;
}

async function getAll() {
  const result = await PatientModel.scan().exec();

  return result.map((item) => {
    item.PK = undefined;
    return item;
  });
}

async function update(id, payload) {
  // change this because the birthDate is always enter in undeifined
  payload.birthDate = payload.birthDate
    ? new Date(payload.birthDate)
    : undefined;

  const { PK, ...result } = await PatientModel.update(`PATIENT#${id}`, payload);

  return result;
}

async function deleteById(id) {

  try {
    await PatientModel.delete({ PK: `PATIENT#${id}` });
    console.log("Successfully deleted item");
  } catch (error) {
    console.error(error);
  }

  return { message: "Patient deleted successfully" };
}

export default {
  create,
  getOneById,
  getAll,
  update,
  deleteById,
};
