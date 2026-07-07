import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    participantName: {
      type: String,
      required: true,
      trim: true
    },
    organizationName: {
      type: String,
      required: true,
      trim: true
    },
    eventName: {
      type: String,
      required: true,
      trim: true
    },
    certificateCategory: {
      type: String,
      required: true,
      trim: true
    },
    certificateTitle: {
      type: String,
      required: true,
      trim: true
    },
    eventDate: {
      type: String,
      required: true
    },
    description: {
      type: String,
      trim: true
    },
    templateStyle: {
      type: String,
      required: true,
      trim: true
    },
    authorizedSignatureName: {
      type: String,
      default: "Authorized Person",
      trim: true
    },
    certificateId: {
      type: String,
      unique: true
    },
    generationType: {
      type: String,
      enum: ["Single", "Bulk"],
      default: "Single"
    },
    status: {
      type: String,
      default: "Generated"
    }
  },
  {
    timestamps: true
  }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
