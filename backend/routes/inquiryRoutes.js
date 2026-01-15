import express from 'express';
import { addInquiry, getInquiries, updateInquiryStatus } from '../controllers/inquiryController.js';

const inquiryRouter = express.Router();

inquiryRouter.post('/add', addInquiry);
inquiryRouter.get('/get', getInquiries);
inquiryRouter.put('/update/:id', updateInquiryStatus);

export default inquiryRouter;