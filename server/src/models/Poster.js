import mongoose from "mongoose";

const isRequiredForGeneratedPoster = function () {
  return this.status !== "Draft";
};

const posterSchema = new mongoose.Schema(
  {
    posterTitle: {
      type: String,
      required: isRequiredForGeneratedPoster,
      trim: true
    },
    tagline: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      required: isRequiredForGeneratedPoster
    },
    eventDate: {
      type: String,
      required: isRequiredForGeneratedPoster
    },
    eventTime: {
      type: String,
      default: ""
    },
    venue: {
      type: String,
      default: ""
    },
    speakerName: {
      type: String,
      default: ""
    },
    speakerDesignation: {
      type: String,
      default: ""
    },
    organizerName: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    contactInformation: {
      type: String,
      default: ""
    },
    registrationText: {
      type: String,
      default: "Register Now"
    },
    templateStyle: {
      type: String,
      required: isRequiredForGeneratedPoster
    },
    designKey: {
      type: String,
      default: ""
    },
    posterImage: {
      type: String,
      default: ""
    },
    organizationLogo: {
      type: String,
      default: ""
    },
    posterId: {
      type: String,
      unique: true,
      required: true
    },
    status: {
      type: String,
      enum: ["Draft", "Generated"],
      default: "Generated"
    }
  },
  {
    timestamps: true
  }
);

const Poster = mongoose.model("Poster", posterSchema);

export default Poster;
