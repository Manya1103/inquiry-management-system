import React, { useState } from "react";
import { addInquiry } from "../config";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Globe,
  MessageCircle,
  Mail,
  Users,
  User,
  Phone,
  Loader2
} from "lucide-react";
import tw from "tailwind-styled-components";

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    source: "Website",
  });
  const [status, setStatus] = useState({
    loading: false,
    type: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, type: "", message: "" });

    try {
      await addInquiry(formData);
      setStatus({
        loading: false,
        type: "success",
        message: "Inquiry logged successfully!",
      });
      setFormData({ name: "", contact: "", source: "Website" });
      setTimeout(
        () => setStatus({ loading: false, type: "", message: "" }),
        3000
      );
    } catch (err) {
      setStatus({
        loading: false,
        type: "error",
        message: err.response?.data?.message || "Failed to submit.",
      });
    }
  };

  return (
    <PageWrapper>
      <FormCard>
        <CardHeader>
          <div className="p-3 bg-blue-50 w-fit rounded-xl mb-4">
             <Send className="text-blue-600" size={24} />
          </div>
          <Title>Log New Inquiry</Title>
          <Subtitle>Enter the details of the potential lead below.</Subtitle>
        </CardHeader>

        {status.message && (
          <AlertBox $type={status.type}>
            {status.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            {status.message}
          </AlertBox>
        )}

        <StyledForm onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <InputGroup>
              <Label>Client Name</Label>
              <InputWrapper>
                <IconWrapper><User size={18} /></IconWrapper>
                <InputField
                  required
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </InputWrapper>
            </InputGroup>

            <InputGroup>
              <Label>Contact Info</Label>
              <InputWrapper>
                <IconWrapper><Phone size={18} /></IconWrapper>
                <InputField
                  required
                  placeholder="Email ID or Phone Number"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                />
              </InputWrapper>
            </InputGroup>

            <InputGroup>
              <Label>Source</Label>
              <SourceGrid>
                {["Website", "WhatsApp", "Email", "Referral"].map((src) => (
                  <SourceButton
                    key={src}
                    $active={formData.source === src}
                    onClick={() => setFormData({ ...formData, source: src })}
                    type="button"
                  >
                    <SourceIcon source={src} active={formData.source === src} />
                    <span>{src}</span>
                  </SourceButton>
                ))}
              </SourceGrid>
            </InputGroup>
          </div>

          <SubmitBtn disabled={status.loading}>
            {status.loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                Save Inquiry <Send size={18} className="ml-2" />
              </>
            )}
          </SubmitBtn>
        </StyledForm>
      </FormCard>
    </PageWrapper>
  );
};

// UI Helper Components
const SourceIcon = ({ source, active }) => {
  const className = active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600";
  const props = { size: 24, className };
  if (source === "WhatsApp") return <MessageCircle {...props} />;
  if (source === "Email") return <Mail {...props} />;
  if (source === "Referral") return <Users {...props} />;
  return <Globe {...props} />;
};

export default InquiryForm;

/* --- Styled Components --- */

const PageWrapper = tw.div`
  min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6
`;

const FormCard = tw.div`
  w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden
`;

const CardHeader = tw.div`
  bg-white px-8 pt-8 pb-4
`;

const Title = tw.h2`
  text-2xl font-bold text-gray-900 tracking-tight
`;

const Subtitle = tw.p`
  mt-2 text-gray-500
`;

const StyledForm = tw.form`
  p-8 pt-4 space-y-8
`;

const InputGroup = tw.div`
  space-y-3
`;

const Label = tw.label`
  block text-sm font-semibold text-gray-700 ml-1
`;

const InputWrapper = tw.div`
  relative flex items-center
`;

const IconWrapper = tw.div`
  absolute left-4 text-gray-400 pointer-events-none
`;

const InputField = tw.input`
  w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-xl border border-transparent
  focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 
  outline-none transition-all placeholder:text-gray-400 text-gray-800 font-medium
`;

const SourceGrid = tw.div`
  grid grid-cols-2 sm:grid-cols-4 gap-3
`;

const SourceButton = tw.button`
  ${(p) =>
    p.$active
      ? "bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500"
      : "bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100 hover:border-gray-200"}
  group flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 
  text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5
`;

const AlertBox = tw.div`
  ${(p) =>
    p.$type === "success"
      ? "bg-emerald-50 text-emerald-800 border-emerald-100"
      : "bg-red-50 text-red-800 border-red-100"}
  mx-8 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border animate-in fade-in slide-in-from-top-2
`;

const SubmitBtn = tw.button`
  ${(p) =>
    p.disabled
      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-0.5"}
  w-full py-4 rounded-xl font-bold text-base transition-all duration-200 
  flex justify-center items-center
`;