import dynamoose from "dynamoose";
import crypto from "node:crypto";
import { assistantSchema } from "./assistants.schema.js";

const AssistantModel = dynamoose.model("Assistant", assistantSchema, {
  create: true,
  waitForActive: false,
});

async function create(payload) {
  payload.id = crypto.randomUUID();

  payload.PK = `ASSISTANT#${payload.id}`;

  const { PK, ...result } = await AssistantModel.create(payload);

  return result;
}

async function getOneById(id) {
  const { PK, ...result } = await AssistantModel.get(`ASSISTANT#${id}`);

  return result;
}

async function getAll() {
  const result = await AssistantModel.scan().exec();

  return result.map((item) => {
    item.PK = undefined;
    return item;
  });
}

async function update(id, payload) {
  const { PK, ...result } = await AssistantModel.update(`ASSISTANT#${id}`, payload);

  return result;
}

async function deleteById(id) {
  try {
    await AssistantModel.delete({ PK: `ASSISTANT#${id}` });
    console.log("Successfully deleted item");
  } catch (error) {
    console.error(error);
  }

  return { message: "Assistant deleted successfully" };
}

export default {
  create,
  getOneById,
  getAll,
  update,
  deleteById,
};
