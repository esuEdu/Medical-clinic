import dynamoose from "dynamoose";

export const doctorSchema = new dynamoose.Schema(
  {
    //primary key
    //DoctorId
    PK: {
      type: String,
      hashKey: true,
    },

    id: String,
    name: String,
    taxId: String,
    medicalRegistration: String,
    specialty: String,
    phoneNumber: String,
    email: String,
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
    saveUnknown: true,
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
