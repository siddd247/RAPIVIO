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
          className="h-full bg-[#dface8]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Main Content Area */}
      <div className="w-[100vw] min-h-[100vh] flex flex-col items-center justify-center bg-[#000000] px-[24px]">
        <AnimatePresence mode="wait">
          {isSuccessScreen ? (
            <motion.div
              key="success"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full max-w-[480px] mx-auto text-center flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle2 size={80} color="#dface8" strokeWidth={1.5} style={{ marginBottom: '32px' }} />
              </motion.div>
              <motion.h2
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                style={{ color: '#FFFFFF', fontSize: '2.5rem', fontWeight: 700, marginBottom: '12px', display: 'block', textAlign: 'center' }}
              >You're all set!</motion.h2>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', marginTop: '16px', marginBottom: '48px', textAlign: 'center' }}
              >We'll reach out within 24 hours</motion.p>
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
              className="w-full max-w-[480px] mx-auto text-center"
            >
              <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', fontWeight: 700, textAlign: 'center', whiteSpace: 'nowrap' }}>{steps[currentStep].label}</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginTop: '20px', textAlign: 'center' }}>
                {steps[currentStep].subtext}
              </p>

              <div style={{ width: '100%', maxWidth: '480px', margin: '56px auto 0' }}>
                {steps[currentStep].type === 'textarea' ? (
                  <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    name={steps[currentStep].id}
                    value={formData[steps[currentStep].id as keyof typeof formData]}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#dface8] outline-none text-white text-2xl text-center resize-none transition-colors" style={{ padding: '0 0 8px 0', lineHeight: '1.5', verticalAlign: 'bottom' }}
                  />
                ) : (
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type={steps[currentStep].type}
                    name={steps[currentStep].id}
                    value={formData[steps[currentStep].id as keyof typeof formData]}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#dface8] outline-none text-white text-2xl py-3 text-center transition-colors"
                  />
                )}

                {/* Continue button within input context */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', marginTop: '56px' }}>
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
