import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"], 
      trim: true, // Remove whitespace from both ends
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      trim: true,
    },
    source: {
      type: String,
      enum: ["Website", "WhatsApp", "Email", "Referral"], // prevents invalid entries
      required: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Closed"],
      default: "New", // Default State
    },
  },
  { timestamps: true }
); // Automatically manage createdAt and updatedAt fields

const inquiryModel =
  mongoose.models.inquiry || mongoose.model("inquiry", inquirySchema);

export default inquiryModel;
