import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How long does setup take?',
    answer: 'Most clients are live within 2–3 weeks. Complex integrations may take up to 4 weeks.',
  },
  {
    question: 'Do I need to change my existing tools?',
    answer: 'No. We integrate with your current CRM, calendar, and communication tools.',
  },
  {
    question: 'Is this only for physiotherapists?',
    answer: 'No — Rapivio works for any service business that needs faster lead capture and follow-up.',
  },
  {
    question: 'What if I\'m not happy with the results?',
    answer: 'We offer a satisfaction guarantee. If we don\'t hit agreed benchmarks, we work for free until we do.',
  },
  {
    question: 'How is this different from a chatbot?',
    answer: 'Our systems are multi-channel, context-aware AI pipelines — not scripted bots. They learn and adapt.',
  },
  {
    question: 'What\'s the minimum commitment?',
    answer: 'We recommend a 3-month engagement to see compounding results, but we offer month-to-month options.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="section-fade-bottom"
      style={{
        background: '#000000',
        padding: '7rem 1.5rem',
        width: '100%',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', marginBottom: '4rem' }}>
          <p
            style={{
              color: '#dface8',
              fontSize: '1.13rem',
              letterSpacing: '0.2em',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            FAQ
          </p>
          <h2
            style={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
            }}
          >
            Questions we hear
            <br />
            all the time.
          </h2>
        </div>

        {/* Accordion list */}
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => toggle(idx)}
                style={{
                  borderBottom: '1px solid #2A114B',
                  padding: '1.25rem 0',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ color: '#FFFFFF', fontWeight: 500, fontSize: '1rem', margin: 0 }}>
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    color="#dface8"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 300ms',
                    }}
                  />
                </div>
                {isOpen && (
                  <p
                    style={{
                      color: '#AAAAAA',
                      fontSize: '0.875rem',
                      lineHeight: 1.7,
                      marginTop: '0.75rem',
                      marginBottom: 0,
                    }}
                  >
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
