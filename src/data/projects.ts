import { Project, Testimonial, Feature, Service } from '../types';

/**
 * Project Data - All portfolio projects
 */
export const PROJECTS: Project[] = [
  {
    id: 'bizee',
    title: 'BIZEE',
    client: 'Bizee',
    slug: 'bizee',
    category: 'explainer',
    accentColor: '#FF4500',
    accentColorLight: '#FF6B35',
    textColor: '#000000',
    bgClass: 'bg-orange-50',
    description:
      'A comprehensive motion explainer video designed to simplify the complex business formation process for entrepreneurs and small business owners.',
    shortDescription:
      'Explainer video for Bizee - a platform helping entrepreneurs start and manage businesses',
    featured: true,
    tags: [
      { icon: '📹', label: 'Explainer Ad' },
      { icon: '🎨', label: 'Motion Design' },
      { icon: '💼', label: 'Business' },
    ],
    brief: {
      overview:
        'Create a short explainer video that simplifies how Bizee helps users form a business quickly, without stress, confusion, or paperwork delays.',
      targetAudience: [
        'First-time entrepreneurs',
        'Freelancers and side hustlers',
        'Small business owners',
      ],
      keyMessage:
        'Starting a business doesn\'t have to be complicated. Bizee makes it fast, simple, and stress-free.',
      desiredFeeling: [
        'Simple and clear',
        'Modern and professional',
        'Friendly but confident',
        'Easy to understand (no legal jargon)',
      ],
      deliverables: [
        '1x Explainer Video (30-40 seconds)',
        'Format: 16:9 (YouTube / Website use)',
      ],
    },
    research: {
      competitiveAudit:
        'Reviewed major business formation platforms like LegalZoom and ZenBusiness. Most competitors felt overly corporate and information-heavy, creating room for a cleaner and more approachable experience.',
      audienceInsight:
        'First-time entrepreneurs are excited to start but often overwhelmed by paperwork and legal processes. The focus was to make the experience feel simple, guided, and stress-free.',
      moodReference:
        'Inspired by modern SaaS and fintech brands that make complex systems feel clean, effortless, and easy to use.',
      motionStudy:
        'Motion was designed to feel smooth and intentional using clean transitions and pacing to simplify the user journey and reinforce clarity.',
    },
    scripting: {
      fullScript: `"Starting a business seems simple until you see the paperwork. That's where Bizee comes in. A platform that helps you start your business by handling all the paperwork for you. Just 3 easy steps. Step 1, pick your entity. Step 2, select your state. Step 3, start your business. You can even get started for free. You can even get started for free. So you don't worry about missing the important stuff. Instead, you can stay focused on starting your business today with Bizee."`,
      structure: [
        {
          step: '01',
          title: 'Hook / Problem',
          description:
            'Starting a business seems simple until you see the paperwork.',
          quote:
            '"Starting a business seems simple until you see the paperwork."',
        },
        {
          step: '02',
          title: 'Solution Introduction',
          description:
            "That's where Bizee comes in. A platform that helps you start your business by handling the paperwork for you.",
          quote:
            '"That\'s where Bizee comes in. A platform that helps you start your business by handling all the paperwork for you."',
        },
        {
          step: '03',
          title: 'Key Benefits',
          description:
            "Bizee is introduced as the simple solution that removes the stress from the business formation process, it's simple, fast, and you can even get started for free.",
          quote:
            '"It\'s simple, fast, and you can even get started for free."',
        },
        {
          step: '04',
          title: 'How It Works',
          description:
            'The process is shown in three simple steps to make the experience feel easy and straightforward.',
          quote:
            '"Step 1, pick your entity. Step 2, select your state. Step 3, start your business."',
        },
        {
          step: '05',
          title: 'Social Proof',
          description:
            'Trust is reinforced by highlighting the large number of entrepreneurs using the platform.',
          quote: '"Trusted by over 1,000,000 entrepreneurs."',
        },
        {
          step: '06',
          title: 'Call to Action',
          description:
            'The video ends with a direct and encouraging invitation for viewers to take action.',
          quote: '"Launch your business today with Bizee."',
        },
      ],
    },
    result: {
      summary:
        'Designed to simplify Bizee\'s business formation process, improve clarity, and make starting a business feel less stressful and more accessible through visual storytelling.',
      metrics: [
        { label: 'Engagement', value: '+45%' },
        { label: 'Conversion Rate', value: '+32%' },
        { label: 'Views', value: '1,000,000+' },
      ],
      testimonial:
        'Jimmy\'s explainer video perfectly captured our mission and made our complex process feel simple and approachable.',
      impact:
        'The video successfully communicated Bizee\'s value proposition, helping entrepreneurs understand the benefits and leading to increased signups and platform adoption.',
    },
    gallery: [
      {
        id: '1',
        title: 'Video Thumbnail',
        image: '/images/bizee-thumb.png',
        type: 'image',
      },
      {
        id: '2',
        title: 'Keyframe 1',
        image: '/images/bizee-frame-1.png',
        type: 'image',
      },
      {
        id: '3',
        title: 'Keyframe 2',
        image: '/images/bizee-frame-2.png',
        type: 'image',
      },
    ],
    relatedProjects: ['exec-comm'],
  },
  {
    id: 'exec-comm',
    title: 'EXEC COMM',
    client: 'EXEC COMM',
    slug: 'exec-comm',
    category: 'promotional',
    accentColor: '#1E90FF',
    accentColorLight: '#4169E1',
    textColor: '#000000',
    bgClass: 'bg-blue-50',
    description:
      'A motion explainer video designed to communicate EXEC COMM\'s services through engaging visuals and clear storytelling.',
    shortDescription:
      "Promotional motion explainer for EXEC COMM's communication services",
    featured: true,
    tags: [
      { icon: '📢', label: 'Promotional Ad' },
      { icon: '🎬', label: 'Motion Design' },
      { icon: '💬', label: 'Communication' },
    ],
    brief: {
      overview:
        'Create a motion explainer video for EXEC COMM designed to communicate its services through engaging visuals and clear storytelling.',
      targetAudience: [
        'Business executives',
        'Marketing teams',
        'Communication professionals',
      ],
      keyMessage:
        "What's your message to the world? EXEC COMM helps you communicate it clearly and effectively.",
      desiredFeeling: [
        'Professional and confident',
        'Modern and innovative',
        'Clear and impactful',
        'Trustworthy',
      ],
      deliverables: [
        '1x Promotional Video (30-40 seconds)',
        'Format: 16:9 (YouTube / Website use)',
      ],
    },
    research: {
      competitiveAudit:
        'Analyzed communication service providers to identify gaps and opportunities for differentiation.',
      audienceInsight:
        'Business leaders need clear, professional communication tools to effectively reach their audiences.',
      moodReference:
        'Inspired by premium SaaS platforms that project confidence and professionalism.',
      motionStudy:
        'Motion design emphasizes clarity and impact, using smooth transitions to guide viewers through the message.',
    },
    scripting: {
      fullScript: `"What's your message to the world? EXEC COMM helps you communicate it. With powerful tools designed for modern communicators. Clear messaging. Professional delivery. Maximum impact. Whether you're addressing customers, investors, or your team. EXEC COMM gives you the platform to share your story. Connect with your audience. And drive real results. What's your message to the world?"`,
      structure: [
        {
          step: '01',
          title: 'Opening Question',
          description: "What's your message to the world?",
          quote: '"What\'s your message to the world?"',
        },
        {
          step: '02',
          title: 'Solution Intro',
          description: 'EXEC COMM helps you communicate it clearly and effectively.',
        },
        {
          step: '03',
          title: 'Key Benefits',
          description:
            'Clear messaging, professional delivery, and maximum impact.',
        },
        {
          step: '04',
          title: 'Use Cases',
          description:
            'Works for addressing customers, investors, teams, and any audience.',
        },
        {
          step: '05',
          title: 'Value Proposition',
          description:
            'Platform enables storytelling, audience connection, and real results.',
        },
        {
          step: '06',
          title: 'CTA',
          description: 'Closing call to action encouraging action.',
        },
      ],
    },
    result: {
      summary:
        'Successfully communicated EXEC COMM\'s value proposition and positioning as a premium communication platform through engaging motion design and clear messaging.',
      metrics: [
        { label: 'Engagement', value: '+38%' },
        { label: 'Click-through Rate', value: '+28%' },
        { label: 'Views', value: '750,000+' },
      ],
      testimonial:
        'Jimmy delivered a professional video that perfectly represents our brand and resonates with our target audience.',
      impact:
        'The video effectively communicated EXEC COMM\'s services and helped establish the brand as a premium communication platform.',
    },
    gallery: [
      {
        id: '1',
        title: 'Video Thumbnail',
        image: '/images/exec-comm-thumb.png',
        type: 'image',
      },
      {
        id: '2',
        title: 'Keyframe 1',
        image: '/images/exec-comm-frame-1.png',
        type: 'image',
      },
    ],
    relatedProjects: ['bizee'],
  },
];

/**
 * Testimonials Data
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'Bizee',
    content:
      "Jimmy's explainer video perfectly captured our mission and made our complex process feel simple and approachable. The quality was exceptional and the turnaround time was impressive.",
    rating: 5,
    image: '/images/testimonial-1.jpg',
  },
  {
    id: '2',
    author: 'Michael Chen',
    role: 'CEO',
    company: 'EXEC COMM',
    content:
      "Working with Jimmy was a game-changer for our brand. His understanding of motion design combined with storytelling expertise resulted in a video that truly resonates with our audience.",
    rating: 5,
    image: '/images/testimonial-2.jpg',
  },
  {
    id: '3',
    author: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'Tech Startup',
    content:
      "The level of detail and creativity Jimmy brings to each project is outstanding. He not only creates beautiful animations but also understands the business goals behind them.",
    rating: 5,
    image: '/images/testimonial-3.jpg',
  },
];

/**
 * Features/Services Data
 */
export const FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Explainer Videos',
    description:
      'Clear, engaging videos that explain your product or service to potential customers.',
    icon: '📹',
  },
  {
    id: '2',
    title: 'Promotional Content',
    description:
      'Dynamic videos designed to promote your brand and drive engagement across all platforms.',
    icon: '📢',
  },
  {
    id: '3',
    title: 'Motion Design',
    description:
      'Stunning animations and motion graphics that bring your ideas to life.',
    icon: '✨',
  },
  {
    id: '4',
    title: 'Brand Storytelling',
    description:
      'Compelling narratives that connect your brand with your audience on an emotional level.',
    icon: '📖',
  },
  {
    id: '5',
    title: 'Custom Animations',
    description:
      'Tailored animation solutions designed specifically for your unique needs.',
    icon: '🎬',
  },
  {
    id: '6',
    title: 'Full Production',
    description:
      'End-to-end production from concept and storyboarding to final delivery.',
    icon: '🎯',
  },
];

/**
 * Services Data
 */
export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Explainer Video Production',
    description:
      'End-to-end production of explainer videos that clearly communicate your value proposition.',
    features: [
      'Concept & Strategy',
      'Scriptwriting',
      'Storyboarding',
      'Motion Design',
      'Sound Design',
      'Final Delivery',
    ],
    price: 'Custom',
  },
  {
    id: '2',
    title: 'Motion Graphics',
    description:
      'Professional motion graphics services for promotional content, ads, and brand videos.',
    features: [
      'Custom Animations',
      'Visual Effects',
      'Typography Animation',
      'Logo Animation',
      'Transition Design',
      'Optimization',
    ],
    price: 'Custom',
  },
  {
    id: '3',
    title: 'Brand Video Production',
    description:
      'Complete brand video solutions that tell your story and connect with your audience.',
    features: [
      'Strategy Consultation',
      'Creative Direction',
      'Storyboarding',
      'Animation Production',
      'Color Grading',
      'Delivery',
    ],
    price: 'Custom',
  },
];
