'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  X,
  ArrowRight,
  Zap,
  Building2,
  Users,
  Mail
} from 'lucide-react';

interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  limitations: string[];
  cta: string;
  ctaLink?: string;
  popular?: boolean;
  type: 'basic' | 'pro' | 'enterprise';
}

const Pricing: React.FC = () => {
  const [showEnterpriseForm, setShowEnterpriseForm] = useState(false);

  const tiers: PricingTier[] = [
    {
      name: 'Basic',
      price: 79,
      period: 'month',
      description: 'Perfect for small teams getting started',
      features: [
        '10,000 API calls/month',
        '10 GB storage',
        '5 team members',
        '3 integrations',
        'Analytics dashboard',
        'Email support',
        'API access'
      ],
      limitations: [
        'No priority support',
        'No custom domain',
        'No SSO'
      ],
      cta: 'Buy Now',
      ctaLink: process.env.NEXT_PUBLIC_WHOP_BASIC_PLAN_URL,
      type: 'basic'
    },
    {
      name: 'Pro',
      price: 229,
      period: 'month',
      description: 'For growing teams that need more power',
      features: [
        '100,000 API calls/month',
        '100 GB storage',
        '20 team members',
        '10 integrations',
        'Advanced analytics',
        'Priority support',
        'Custom domain',
        'API access',
        'Advanced reporting',
        'White label options'
      ],
      limitations: [
        'No SSO',
        'No dedicated support'
      ],
      cta: 'Buy Now',
      ctaLink: process.env.NEXT_PUBLIC_WHOP_PRO_PLAN_URL,
      popular: true,
      type: 'pro'
    },
    {
      name: 'Enterprise',
      price: 0,
      period: 'custom',
      description: 'Tailored for large organizations',
      features: [
        'Unlimited API calls',
        'Unlimited storage',
        'Unlimited team members',
        'Unlimited integrations',
        'Everything in Pro',
        'SSO (SAML/OAuth)',
        'Dedicated support',
        'SLA guarantees',
        'Custom integrations',
        'Compliance (SOC 2, HIPAA)',
        'On-premise options',
        'Custom contracts'
      ],
      limitations: [],
      cta: 'Get Custom Quote',
      type: 'enterprise'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Simple, Transparent <span className="text-blue-400">Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Scale as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-gray-800/50 backdrop-blur-sm border rounded-2xl p-8 flex flex-col ${
                tier.popular
                  ? 'border-blue-500 shadow-xl shadow-blue-500/20 scale-105'
                  : 'border-gray-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="mb-6">
                {tier.type === 'basic' && (
                  <Zap className="w-10 h-10 text-blue-400" />
                )}
                {tier.type === 'pro' && (
                  <Users className="w-10 h-10 text-purple-400" />
                )}
                {tier.type === 'enterprise' && (
                  <Building2 className="w-10 h-10 text-cyan-400" />
                )}
              </div>

              {/* Tier Info */}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-gray-400 mb-6">{tier.description}</p>

              {/* Price */}
              <div className="mb-8">
                {tier.type === 'enterprise' ? (
                  <div className="text-4xl font-bold">Custom</div>
                ) : (
                  <>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold">${tier.price}</span>
                      <span className="text-gray-400 ml-2">/{tier.period}</span>
                    </div>
                  </>
                )}
              </div>

              {/* CTA Button */}
              {tier.type === 'enterprise' ? (
                <button
                  onClick={() => setShowEnterpriseForm(true)}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mb-8"
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <a
                  href={tier.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mb-8 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              )}

              {/* Features */}
              <div className="space-y-3 flex-grow">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
                {tier.limitations.map((limitation) => (
                  <div key={limitation} className="flex items-start space-x-3">
                    <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500">{limitation}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <FAQItem
              question="Can I change plans later?"
              answer="Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle."
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards through our secure payment processor Whop. Enterprise customers can also pay via invoice."
            />
            <FAQItem
              question="Is there a free trial?"
              answer="Yes! All new accounts get a 7-day free trial with full access to Pro features. No credit card required."
            />
            <FAQItem
              question="What happens if I exceed my quota?"
              answer="We'll notify you when you approach your limits. You can upgrade your plan anytime or purchase additional quota as needed."
            />
          </div>
        </div>
      </div>

      {/* Enterprise Form Modal */}
      {showEnterpriseForm && (
        <EnterpriseFormModal onClose={() => setShowEnterpriseForm(false)} />
      )}
    </div>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
};

const EnterpriseFormModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    company_name: '',
    seats: 10,
    integrations: [] as string[],
    compliance_needs: [] as string[],
    additional_info: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const integrationOptions = [
    'Salesforce',
    'Slack',
    'Microsoft Teams',
    'Google Workspace',
    'Zapier',
    'Custom API'
  ];

  const complianceOptions = [
    'SOC 2',
    'HIPAA',
    'GDPR',
    'ISO 27001',
    'PCI DSS'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enterprise-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Request Submitted!</h3>
          <p className="text-gray-300 mb-6">
            Our team will review your requirements and send you a custom quote within 24 hours.
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full my-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Enterprise Quote Request</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Work Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@company.com"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Acme Inc."
            />
          </div>

          {/* Number of Seats */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Users *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.seats}
              onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Integrations */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Required Integrations
            </label>
            <div className="grid grid-cols-2 gap-3">
              {integrationOptions.map((integration) => (
                <label key={integration} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.integrations.includes(integration)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          integrations: [...formData.integrations, integration]
                        });
                      } else {
                        setFormData({
                          ...formData,
                          integrations: formData.integrations.filter(i => i !== integration)
                        });
                      }
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                  />
                  <span className="text-gray-300">{integration}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Compliance Requirements
            </label>
            <div className="grid grid-cols-2 gap-3">
              {complianceOptions.map((compliance) => (
                <label key={compliance} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.compliance_needs.includes(compliance)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          compliance_needs: [...formData.compliance_needs, compliance]
                        });
                      } else {
                        setFormData({
                          ...formData,
                          compliance_needs: formData.compliance_needs.filter(c => c !== compliance)
                        });
                      }
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                  />
                  <span className="text-gray-300">{compliance}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Additional Requirements
            </label>
            <textarea
              value={formData.additional_info}
              onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })}
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us more about your needs..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                <span>Get Custom Quote</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pricing;