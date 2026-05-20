import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    id: 'name',
    label: "What's your name?",
    subtext: "Let's start with the basics",
    type: 'text',
  },
  {
    id: 'email',
    label: 'Your email address?',
    subtext: "We'll send the details here",
    type: 'email',
  },
  {
    id: 'phone',
    label: 'Best number to reach you?',
    subtext: 'Optional but helpful for quick calls',
    type: 'tel',
  },
  {
    id: 'message',
    label: 'How can we help you?',
    subtext: 'Share what you have in mind — we read every message',
    type: 'textarea',
  },
];

export default function BookingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    // Autofocus input on step change
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0 || currentStep === steps.length) {
      navigate('/');
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentStep < steps.length && steps[currentStep].type !== 'textarea') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'Enter' && e.shiftKey && steps[currentStep].type === 'textarea') {
      // allow newline on shift+enter for textarea
    } else if (e.key === 'Enter' && steps[currentStep].type === 'textarea') {
      e.preventDefault();
      handleNext();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isSuccessScreen = currentStep === steps.length;
  const progressPercentage = isSuccessScreen ? 100 : (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col relative overflow-hidden font-sans">
      {/* Top Left Back Arrow */}
      <button
        onClick={handleBack}
        className="fixed top-8 left-8 flex items-center gap-2 text-[rgba(255,255,255,0.4)] hover:text-[#FFFFFF] transition-colors z-50 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Top Right Step Counter */}
      {!isSuccessScreen && (
        <div className="fixed top-8 right-8 text-[rgba(255,255,255,0.3)] text-sm font-medium z-50">
          {currentStep + 1} of {steps.length}
        </div>
      )}

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[2px] bg-[rgba(255,255,255,0.1)] z-50">
        <motion.div
          className="h-full bg-[#522959]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Main Content Area */}
      <div className="min-h-screen w-full px-6 relative">
        <AnimatePresence mode="wait">
          {isSuccessScreen ? (
            <motion.div
              key="success"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex flex-col items-center text-center w-full absolute"
              style={{ top: '25vh', left: '50%', transform: 'translateX(-50%)' }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle2 size={80} color="#522959" strokeWidth={1.5} className="mb-6" />
              </motion.div>
              <h2 className="text-[#FFFFFF] text-4xl font-bold mb-3">You're all set!</h2>
              <p className="text-[rgba(255,255,255,0.5)] text-lg mb-10">We'll reach out within 24 hours</p>
              <button
                onClick={() => navigate('/')}
                className="btn-primary"
              >
                Back to Home
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full max-w-md mx-auto absolute"
              style={{ top: '25vh', left: '50%', transform: 'translateX(-50%)' }}
            >
              <h2 className="text-[#FFFFFF] text-4xl font-bold text-center">{steps[currentStep].label}</h2>
              <p className="text-[rgba(255,255,255,0.4)] text-base mt-[24px] text-center">
                {steps[currentStep].subtext}
              </p>

              <div className="w-full max-w-md mx-auto mt-[48px]">
                {steps[currentStep].type === 'textarea' ? (
                  <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    name={steps[currentStep].id}
                    value={formData[steps[currentStep].id as keyof typeof formData]}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    rows={3}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#522959] outline-none text-white text-2xl py-3 text-center resize-none transition-colors"
                  />
                ) : (
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type={steps[currentStep].type}
                    name={steps[currentStep].id}
                    value={formData[steps[currentStep].id as keyof typeof formData]}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#522959] outline-none text-white text-2xl py-3 text-center transition-colors"
                  />
                )}
                
                {/* Continue button within input context */}
                <div className="flex justify-center items-center gap-12 mt-[48px]">
                  {steps[currentStep].id === 'phone' && (
                    <button
                      onClick={handleNext}
                      className="text-[rgba(255,255,255,0.3)] hover:text-[#FFFFFF] text-xl font-medium transition-colors"
                    >
                      Skip
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="text-[rgba(255,255,255,0.6)] hover:text-[#FFFFFF] text-xl font-medium flex items-center gap-2 group transition-colors"
                  >
                    <span className="group-hover:underline">Continue</span>
                    <ArrowRight size={22} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
