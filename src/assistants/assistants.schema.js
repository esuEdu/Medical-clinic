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
    address: {
      type: Object,
      schema: {
        street: String,
        number: String,
        complement: String,
        neighborhood: String,
        city: String,
        state: String,
        zipCode: String,
      },
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
