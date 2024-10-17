import dynamoose from "dynamoose";

export const PatientSchema = new dynamoose.Schema(
  {
    //primary key
    //PatientId
    PK: {
      type: String,
      hashKey: true,
    },

    //personal data
    id: String,
    taxId: String,
    healthInsurance: String,
    name: String,
    email: String,
    birthDate: Date,
    phoneNumber: String,
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

    //health data
    weight: Number,
    height: Number,
    bloodType: String,
    allergies: {
      type: Array,
      schema: [String],
    },
    diseases: {
      type: Array,
      schema: [String],
    },
    medications: {
      type: Array,
      schema: [String],
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
