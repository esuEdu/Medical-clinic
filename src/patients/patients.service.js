import dynamoose from "dynamoose";
import crypto from "node:crypto";
import { PatientSchema } from "./patient.schema.js";
import * as OneSignal from "@onesignal/node-onesignal";
import dotenv from "dotenv";
dotenv.config();

import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";

const PatientModel = dynamoose.model("Patient", PatientSchema, {
  create: true,
  waitForActive: false,
});

async function create(payload) {
  payload.id = crypto.randomUUID();

  payload.PK = `PATIENT#${payload.id}`;

  payload.birthDate = payload.birthDate
    ? new Date(payload.birthDate)
    : undefined;

  try {
    const { PK, password, ...result } = await PatientModel.create(payload);

    return result;
  } catch (error) {
    throw new Error(`Error creating patient: ${error.message}`);
  }
}

async function register(id, email, password) {
  const client = new EventBridgeClient({});

  const payload = {
    id: id,
    email: email,
    password: password,
    group: "Patient",
  };

  await client.send(
    new PutEventsCommand({
      Entries: [
        {
          Source: "Medical-Clinic",
          DetailType: "patientRegister",
          Detail: JSON.stringify({ payload }),
        },
      ],
    })
  );
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
  const { PK, ...result } = await PatientModel.update(`PATIENT#${id}`, payload);

  payload.birthDate = payload.birthDate
    ? new Date(payload.birthDate)
    : undefined;

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

async function notifyPatientCreated(patient) {
  const client = new EventBridgeClient({});

  await client.send(
    new PutEventsCommand({
      Entries: [
        {
          Source: "Medical-Clinic",
          DetailType: "patientCreated",
          Detail: JSON.stringify({ patient }),
        },
      ],
    })
  );
}

async function sendEmail(payload) {
  
}


export default {
  create,
  getOneById,
  getAll,
  update,
  deleteById,
  register,
  notifyPatientCreated,
  sendEmail,
};
