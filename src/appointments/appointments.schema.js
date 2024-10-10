import dynamoose from "dynamoose";

export const appointmentSchema = new dynamoose.Schema(
  {
    //primary key
    //PatientId
    PK: {
      type: String,
      hashKey: true,
    },

    id: {
      type: String,
      hashKey: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  }
);
