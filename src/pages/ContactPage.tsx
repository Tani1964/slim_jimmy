import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { HeroSection, CTASection } from '../components/sections';
import { Container, Card, Button } from '../components/common';
import { ContactFormData } from '../types';
import { SPACING_PRESETS } from '../constants';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    projectType: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        projectType: formData.projectType || 'Not specified',
        message: formData.message,
      }, PUBLIC_KEY);

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '', projectType: '' });
      }, 4000);
    } catch {
      setError('Something went wrong. Please try again or email me directly.');
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: '✉️',
      title: 'Email',
      content: 'contact@jimmythecreative.com',
      link: 'mailto:contact@jimmythecreative.com',
    },
    {
      icon: '💬',
      title: 'LinkedIn',
      content: '@jimmythecreative',
      link: 'https://linkedin.com',
    },
    {
      icon: '🎬',
      title: 'Instagram',
      content: '@jimmythecreative',
      link: 'https://instagram.com',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroSection
        subtitle="Get in Touch"
        title="Let's Talk About Your Project"
        description="Have a motion design project in mind? I'd love to hear from you. Reach out and let's discuss how I can help bring your vision to life."
      />

      {/* Contact Methods & Form */}
      <section className={`${SPACING_PRESETS.section.full}`}>
        <Container>
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Get in Touch</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose your preferred way to reach out or use the form below.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.title}
                href={method.link}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card hover className="text-center">
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="font-bold mb-2">{method.title}</h3>
                  <p className="text-gray-600 group-hover:text-blue-600 transition-colors">{method.content}</p>
                </Card>
              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <h2 className="text-2xl font-bold mb-8">Send Me a Message</h2>

              {submitted ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-ring"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-ring"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-ring"
                    >
                      <option value="">Select a project type</option>
                      <option value="explainer">Explainer Video</option>
                      <option value="promotional">Promotional Video</option>
                      <option value="motion-graphics">Motion Graphics</option>
                      <option value="animation">Animation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-ring"
                      placeholder="Project subject"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-ring resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}

                  <Button type="submit" variant="primary" size="lg" fullWidth>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>
        </Container>
      </section>

      {/* FAQ */}
      <section className={`${SPACING_PRESETS.section.full}`}>
        <Container>
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="max-w-2xl mx-auto space-y-4">
            {[
              {
                q: 'What is your typical project timeline?',
                a: 'Most projects take 2-4 weeks from concept to delivery, depending on complexity and scope.',
              },
              {
                q: 'Do you offer revisions?',
                a: 'Absolutely! I include revision rounds in all my packages to ensure you\'re completely satisfied.',
              },
              {
                q: 'What file formats do you deliver?',
                a: 'I deliver MP4, WebM, and other formats optimized for web, social media, and broadcast.',
              },
              {
                q: 'Can you work with my budget?',
                a: 'Yes! I offer custom packages tailored to different budgets and project scopes.',
              },
            ].map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card hover>
                  <h3 className="font-bold mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Get Started?"
        description="Let's create something amazing together. Reach out today and let's discuss your project."
        buttonText="Send Me a Message"
        buttonHref="#contact"
      />
    </div>
  );
};
