import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';

export default function FAQ({ onBack }) {
  const [expandedId, setExpandedId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'What is STRADE?',
      answer: 'STRADE is a modern trading bot dashboard that helps you manage your automated trading strategies with ease.'
    },
    {
      id: 2,
      question: 'How do I get started?',
      answer: 'Create an account, configure your API keys, and start setting up your trading bots.'
    },
    {
      id: 3,
      question: 'Is my data secure?',
      answer: 'Yes, we use industry-standard encryption and never store your actual API keys.'
    },
    {
      id: 4,
      question: 'What fees apply?',
      answer: 'Trading fees vary by plan. Check our pricing page for detailed information.'
    },
    {
      id: 5,
      question: 'Can I use multiple exchanges?',
      answer: 'Yes, STRADE supports multiple exchanges including Binance, Kucoin, and more.'
    },
    {
      id: 6,
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel anytime from your account settings without any penalties.'
    },
  ];

  return (
    <PageLayout
      title="FAQ"
      subtitle="Frequently asked questions"
      onBack={onBack}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={faq.id}>
                <Card className="overflow-hidden">
                  <button
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-white pr-4">{faq.question}</h3>
                    <div
                      className={`w-5 h-5 md:w-6 md:h-6 text-84F7F0 transition-transform flex-shrink-0 ${expandedId === faq.id ? 'rotate-180' : ''}`}
                    >
                      <ChevronDown className="w-full h-full" />
                    </div>
                  </button>
                  {expandedId === faq.id && (
                    <div className="px-6 py-4 bg-slate-700/30 border-t border-white/10">
                      <p className="text-white/80 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="text-center">
            <div className="w-12 h-12 bg-84F7F0/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-84F7F0/30">
              <HelpCircle className="w-6 h-6 text-84F7F0" />
            </div>
            <SectionTitle
              title="Still have questions?"
              subtitle="Our support team is here to help you"
              className="mb-6"
            />
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button>Contact Support</Button>
              <Button variant="outline">Live Chat</Button>
            </div>
          </Card>
        </div>
      </PageLayout>
  );
}
