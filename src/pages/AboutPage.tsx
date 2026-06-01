import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection, CTASection } from '../components/sections';
import { Container, Card } from '../components/common';
import { SPACING_PRESETS } from '../constants';

export const AboutPage: React.FC = () => {
  const skills = [
    'Motion Design',
    'Animation',
    'Video Production',
    'Scriptwriting',
    'Storyboarding',
    'After Effects',
    'Cinema 4D',
    'Illustration',
  ];

  const timeline = [
    { year: '2019', title: 'Started Motion Design Journey', desc: 'Began freelancing as a motion designer' },
    { year: '2020', title: 'First Major Client', desc: 'Created explainer video for emerging startup' },
    { year: '2021', title: 'Growth Phase', desc: 'Expanded team and portfolio significantly' },
    { year: '2023', title: 'Industry Recognition', desc: 'Won awards for innovative motion design' },
    { year: '2024', title: 'Full Service Studio', desc: 'Became go-to motion design partner for brands' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <HeroSection
        subtitle="About Me"
        title="Hi, I'm Jimmy"
        description="A motion designer dedicated to creating stunning visual experiences that help brands tell their stories and connect with audiences."
      />

      {/* Story */}
      <section className={`${SPACING_PRESETS.section.full} bg-gradient-to-b from-white to-gray-50`}>
        <Container>
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-4">
              My Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">My Story</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From passion to profession: how I became a motion design partner for innovative brands.
            </p>
          </motion.div>

          {/* Story Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-600 mb-4 leading-relaxed">
                I've always been fascinated by the power of motion and visual storytelling. With over 5 years of
                experience in motion design, I've developed a passion for creating explainer videos and motion graphics
                that not only look stunning but also drive real business results.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                My approach is simple: combine creative excellence with strategic thinking. I believe that great motion
                design isn't just about making things beautiful—it's about making things clear, engaging, and
                effective.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Over the years, I've had the privilege of working with innovative startups, established brands, and
                everything in between. Each project has been an opportunity to solve a unique creative challenge and
                deliver exceptional results.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">By the Numbers</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-4xl font-bold">50+</div>
                    <p className="text-blue-100">Projects Completed</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">30+</div>
                    <p className="text-blue-100">Happy Clients</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">5+</div>
                    <p className="text-blue-100">Years Experience</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">15+</div>
                    <p className="text-blue-100">Awards Won</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section className={`${SPACING_PRESETS.section.full} bg-gray-50`}>
        <Container>
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My Skills &amp; Expertise
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="text-center">
                  <p className="font-semibold text-gray-900">{skill}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className={`${SPACING_PRESETS.section.full}`}>
        <Container>
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-blue-700 transform -translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className={`md:grid md:grid-cols-2 gap-8 ${i % 2 === 0 ? 'md:text-right' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={i % 2 === 1 ? 'md:col-start-2' : ''}>
                    <Card>
                      <div className="text-blue-600 font-bold text-lg mb-2">{item.year}</div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className={`${SPACING_PRESETS.section.full} bg-gradient-to-r from-blue-600 to-blue-700 text-white`}>
        <Container>
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My Values
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Quality', desc: 'Excellence in every frame, every transition, every detail' },
              { title: 'Creativity', desc: 'Bold ideas that push boundaries and inspire audiences' },
              { title: 'Partnership', desc: 'Collaborative approach that aligns with your vision and goals' },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-blue-100">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Let's Create Something Extraordinary"
        description="Ready to bring your vision to life? Let's work together to create motion design that truly matters."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </div>
  );
};
