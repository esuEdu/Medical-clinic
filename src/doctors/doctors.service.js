import dynamoose from "dynamoose";
import crypto from "node:crypto";
import { doctorSchema } from "./doctors.schema.js";

const DoctorModel = dynamoose.model("Doctor", doctorSchema, {
  create: true,
  waitForActive: false,
});

async function create(payload) {
  payload.id = crypto.randomUUID();

  payload.PK = `DOCTOR#${payload.id}`;

  const { PK, ...result } = await DoctorModel.create(payload);

  return result;
}

async function getOneById(id) {
  const { PK, ...result } = await DoctorModel.get(`DOCTOR#${id}`);

  return result;
}

async function getAll() {
  const result = await DoctorModel.scan().exec();

  return result.map((item) => {
    item.PK = undefined;
    return item;
  });
}

async function update(id, payload) {
  const { PK, ...result } = await DoctorModel.update(`DOCTOR#${id}`, payload);

  return result;
}

async function deleteById(id) {
  try {
    await DoctorModel.delete({ PK: `DOCTOR#${id}` });
    console.log("Successfully deleted item");
  } catch (error) {
    console.error(error);
  }

  return { message: "Doctor deleted successfully" };
}

export default {
  create,
  getOneById,
  getAll,
  update,
  deleteById,
};
