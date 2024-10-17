const dynamoose = require("dynamoose");

export const assistantSchema = new dynamoose.Schema(
  {
    //primary key
    //PatientId
    PK: {
      type: String,
      hashKey: true,
    },
    id: String,
    name: String,
    taxId: String,
    phoneNumber: String,
    email: String,
    birthDate: Date,
    hireDate: Date,
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
