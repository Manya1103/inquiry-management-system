import inquiryModel from "../models/inquiryModel.js";

// Add Inquiry
export const addInquiry = async (req, res) => {
    try {
        const { name, contact, source } = req.body;

        if (!name || !contact || !source) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newInquiry = new inquiryModel({ name, contact, source });
        await newInquiry.save();

        res.status(201).json({ success: true, message: "Inquiry added successfully", data: newInquiry });
    } catch (error) {
        console.error("Error adding inquiry:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get All Inquiries
export const getInquiries = async (req, res) => {
    try {
        const inquiries = await inquiryModel.find({}).sort({ createdAt: -1 }); // puts the newest inquiries at the top of the list
        res.status(200).json({ success: true, data: inquiries });
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Update inquiry status
export const updateInquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedInquiry = await inquiryModel.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true } // ensures the API returns the new status immediately, so the frontend UI can update instantly without refreshing.
        );

        if (!updatedInquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found" });
        }

        res.status(200).json({ success: true, message: "Status updated", data: updatedInquiry });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};