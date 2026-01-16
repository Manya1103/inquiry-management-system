import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import InquiryForm from './Pages/InquiryForm';
import AllInquiries from './Pages/AllInquiries';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<InquiryForm />} />
            <Route path="/inquiries" element={<AllInquiries />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;