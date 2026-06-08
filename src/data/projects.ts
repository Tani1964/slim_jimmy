import { Project, Testimonial, Feature, Service } from '../types';
import bizeeThumbnail from '../assets/thumbails/bizee.png';
import execThumbnail from '../assets/thumbails/exec.png';
import bizeeLogo from '../assets/bizee_logo.png';
import execLogo from '../assets/exec_logo.png';

const _bizeeSB = import.meta.glob<{ default: string }>(
  '../assets/story board/BIZEE STORYBOARD/*.png',
  { eager: true }
);
const bizeeSBImages = Object.entries(_bizeeSB)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, m]) => m.default);

const _execCommSB = import.meta.glob<{ default: string }>(
  '../assets/story board/EXEC COMM STORYBOARD/*.png',
  { eager: true }
);
const execCommSBImages = Object.entries(_execCommSB)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, m]) => m.default);

const _bizeeGifs = import.meta.glob<{ default: string }>(
  '../assets/story board/BIZEE GIFS/*.gif',
  { eager: true }
);
const bizeeGifs = Object.entries(_bizeeGifs)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, m]) => m.default);

const _execCommGifs = import.meta.glob<{ default: string }>(
  '../assets/story board/EXEC COMM GIFS/*.gif',
  { eager: true }
);
const execCommGifs = Object.entries(_execCommGifs)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, m]) => m.default);

const _winRealtySB = import.meta.glob<{ default: string }>(
  '../assets/story board/WIN REALTY STORYBOARD/*.png',
  { eager: true }
);
const winRealtySBImages = Object.entries(_winRealtySB)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, m]) => m.default);

const _winRealtyGifs = import.meta.glob<{ default: string }>(
  '../assets/story board/WIN REALTY GIFS/*.gif',
  { eager: true }
);
const winRealtyGifs = Object.entries(_winRealtyGifs)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, m]) => m.default);

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
      'This project involved creating a motion explainer video for Bizee, a platform that helps entrepreneurs start and manage their businesses easily.',
    shortDescription:
      'Explainer video for Bizee - a platform helping entrepreneurs start and manage businesses',
    thumbnail: bizeeThumbnail,
    logo: bizeeLogo,
    videoId: '9HrGef4eoc0',
    darkBg: '#5C0000',
    storyboardImages: bizeeSBImages,
    animationGifs: bizeeGifs,
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
      approach:
        "The script was structured to simplify the business formation journey into a clear and engaging narrative while focusing on the user's pain points, Bizee's solution, and a smooth step-by-step flow that keeps viewers engaged from start to finish.",
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
    accentColor: '#1AABF0',
    accentColorLight: '#44CFFF',
    textColor: '#000000',
    bgClass: 'bg-blue-50',
    description:
      'This project involved creating a motion explainer video for EXEC COMM, designed to communicate its services through engaging visuals and clear storytelling.',
    shortDescription:
      "Promotional motion explainer for EXEC COMM's communication and leadership training services",
    thumbnail: execThumbnail,
    logo: execLogo,
    videoId: 'uP-6MGdG5Bg',
    darkBg: '#0A0080',
    storyboardImages: execCommSBImages,
    animationGifs: execCommGifs,
    featured: true,
    tags: [
      { icon: '📢', label: 'promotional ad' },
      { icon: '🎬', label: 'Motion Design' },
      { icon: '💬', label: 'Communication' },
    ],
    brief: {
      overview:
        'Create a modern motion ad for EXEC COMM to promote its communication and leadership training services.',
      targetAudience: [
        'Professionals, executives, teams, and growing businesses.',
      ],
      keyMessage:
        'Strong communication builds confident leaders and better teams.',
      desiredFeeling: [
        'Simple and clear',
        'Modern and professional',
        'Empowering, and inspiring.',
      ],
      deliverables: [
        "30-60 second B2B Explainer Video ad for EXEC COMM's services",
        'Format: 16:9 (YouTube / Website use)',
      ],
    },
    research: {
      competitiveAudit:
        'I reviewed similar leadership and communication training brands to understand how they position their services, communicate value, and use motion design to attract clients.',
      audienceInsight:
        'The core audience consists of professionals, executives, and teams who want to improve communication, leadership, and workplace performance.',
      moodReference:
        'I explored modern, corporate, and minimal visual styles with a focus on clarity, confidence, and strong brand presence to guide the direction of the motion design.',
      motionStudy:
        'I analyzed motion styles used in corporate ads with clean transitions, typography-driven animation, and smooth pacing to ensure clear message delivery and engagement.',
    },
    scripting: {
      approach:
        "The script was structured to clearly communicate EXEC COMM's value by highlighting the importance of effective communication in leadership, identifying common workplace communication challenges, and presenting EXEC COMM as the solution through a smooth, concise, and engaging narrative flow.",
      fullScript: `"Your top performer just lost the pitch. Not because the idea was wrong but because the room never felt it. Every day, companies lose deals, stall careers and weaken influence... not from poor strategy, but from poor communication skills. That's where Exec-Comm comes in. We help leaders and teams communicate with clarity, confidence, and authority especially when the stakes are high. Exec-Comm doesn't deliver generic training. We take time to understand your challenges, design programs around your goals, deliver live, practical coaching, and drive measurable results that last. Real-world scenarios. Personalized feedback. Skills your team can apply immediately. Trusted by over 1,000 organizations across 34 countries. This is where better communication begins. Visit exec-comm.com to get started."`,
      structure: [
        {
          step: '01',
          title: 'Hook',
          description:
            'The video opens by highlighting a high-pressure business moment where strong ideas fail due to poor communication.',
          quote:
            '"Your top performer just lost the pitch. Not because the idea was wrong but because the room never felt it."',
        },
        {
          step: '02',
          title: 'Problem',
          description:
            'It presents the recurring impact of poor communication on business outcomes and performance.',
          quote:
            '"Every day, companies lose deals, stall careers and weaken influence... not from poor strategy, but from poor communication skills."',
        },
        {
          step: '03',
          title: 'Solution Intro',
          description:
            "Exec-Comm is introduced as the solution to this communication challenge.",
          quote: '"That\'s where Exec-Comm comes in..."',
        },
        {
          step: '04',
          title: 'Value Proposition',
          description:
            'The value is presented by showing how Exec-Comm strengthens communication for leaders in high-stakes environments.',
          quote:
            '"We help leaders and teams communicate with clarity, confidence, and authority especially when the stakes are high. Exec-Comm doesn\'t deliver generic training."',
        },
        {
          step: '05',
          title: 'How It Works',
          description:
            'The process is broken down into a structured approach focused on understanding needs, designing solutions, and delivering practical coaching.',
          quote:
            '"We take time to understand your challenges, design programs around your goals, deliver live, practical coaching, and drive measurable results that last. Real-world scenarios. Personalized feedback. Skills your team can apply immediately."',
        },
        {
          step: '06',
          title: 'Benefits',
          description:
            'The outcome is simplified into clear improvements in communication effectiveness and performance.',
          quote:
            '"Stronger communication. Better performance. Skills that work in real situations."',
        },
        {
          step: '07',
          title: 'Social Proof',
          description:
            'Credibility is reinforced through global adoption and organizational trust.',
          quote: '"Trusted by over 1,000 organizations across 34 countries."',
        },
        {
          step: '08',
          title: 'Call to Action',
          description:
            'The video is closed with a clear invitation to engage with Exec-Comm.',
          quote:
            '"This is where better communication begins. Visit exec-comm.com to get started."',
        },
      ],
    },
    result: {
      summary:
        "Designed to communicate Exec-Comm's value by highlighting the importance of effective communication, simplifying its training approach, and positioning the brand as a trusted solution for building clarity, confidence, and leadership communication skills through motion storytelling.",
      impact:
        "The video effectively communicated EXEC COMM's services and helped establish the brand as a premium communication platform.",
    },
    gallery: [
      {
        id: '1',
        title: 'Video Thumbnail',
        image: '/images/exec-comm-thumb.png',
        type: 'image',
      },
    ],
    relatedProjects: ['bizee'],
  },
  {
    id: 'win-realty',
    title: 'WIN REALTY',
    client: 'Win Realty',
    slug: 'win-realty',
    category: 'explainer',
    accentColor: '#1a3200',
    accentColorLight: '#2d5c00',
    textColor: '#ffffff',
    bgClass: 'bg-green-50',
    darkBg: '#0f1e00',
    description:
      'This project involved creating a motion design video for Project Young Landlord by Win Realty. The objective was to increase app downloads by simplifying the real estate investment process and presenting property ownership as accessible, secure, and achievable for everyday users.',
    shortDescription:
      "Motion design ad for Win Realty's Project Young Landlord campaign to drive app downloads",
    logo: undefined,
    thumbnail: undefined,
    videoId: 'fKpzUKjFAuA',
    storyboardImages: winRealtySBImages,
    animationGifs: winRealtyGifs,
    featured: true,
    tags: [
      { icon: '🏠', label: 'Win Realty' },
      { icon: '📹', label: 'Explainer Ad' },
      { icon: '🎨', label: 'Motion Design' },
    ],
    brief: {
      overview:
        "Created a motion design video for Win Realty's Project Young Landlord campaign to promote their mobile app and encourage users to begin their real estate investment journey through an accessible digital platform.",
      targetAudience: [
        'Young professionals',
        'First-time property investors',
        'Aspiring landlords',
        'Parents looking to secure assets for their children',
        'Individuals interested in building long-term wealth through real estate',
      ],
      keyMessage:
        'Owning property is no longer out of reach. With the Project Young Landlord app, users can easily start investing in real estate and take the first step toward property ownership.',
      desiredFeeling: [
        'Trust and confidence',
        'Empowerment',
        'Excitement about becoming a property owner',
        'Accessibility and clarity',
      ],
      deliverables: [
        '1x Explainer Video (30-40 seconds)',
        'Mobile Format (9:16) for social media platforms',
        'Landscape Format (16:9) for web and presentations',
      ],
    },
    research: {
      competitiveAudit:
        'Reviewed real estate and investment apps within and outside Nigeria. Most rely on static visuals and text-heavy messaging, with limited motion storytelling to simplify investment processes or build trust.',
      audienceInsight:
        'Target users include young professionals, first-time investors, and parents seeking long-term wealth creation. Key barrier is lack of trust and perceived complexity around real estate investment apps.',
      moodReference:
        'Direction focused on trust, clarity, and aspiration. Inspired by clean fintech animations, modern property app promos, and minimal UI-driven motion design.',
      motionStudy:
        'Used smooth transitions, UI flow animation, and kinetic typography to simplify the app journey and guide users toward understanding and downloading the app.',
    },
    scripting: {
      approach:
        'The script was structured to challenge a common belief about land ownership, reframe real estate as accessible, and drive urgency through a clear offer backed by a guarantee.',
      fullScript: `"Stop waiting to be a millionaire to buy land. Seriously. Real estate used to be expensive but not anymore. With Project Young Landlord from Win Realty, you can start with just ₦350,000 deposit and spread the balance for up to 18 months! It's easy: download the app, sign up in minutes, and fund your wallet. Plus, here's our guarantee: If you deposit before your physical inspection and don't like what you see, you get a 100% refund. Don't just save for the future, own it. Lock in your plot today. Download Project Young Landlord today. Your journey starts now."`,
      structure: [
        {
          step: '01',
          title: 'Hook',
          description:
            'The video opens by challenging a common belief around real estate investment — that you need to be a millionaire to buy land.',
          quote: '"Stop waiting to be a millionaire to buy land. Seriously."',
        },
        {
          step: '02',
          title: 'Problem / Reframe',
          description:
            'It reframes the misconception that land ownership is expensive and difficult, showing that real estate is now more accessible than ever.',
          quote: '"Real estate used to be expensive, but not anymore."',
        },
        {
          step: '03',
          title: 'Solution',
          description:
            'Win Realty\'s Project Young Landlord is introduced as the platform that makes property investment simple and accessible.',
          quote:
            '"With Project Young Landlord from Win Realty, you can start with just ₦350,000 deposit and spread the balance for up to 18 months."',
        },
        {
          step: '04',
          title: 'How It Works',
          description:
            'The script breaks the process into simple steps and highlights affordability.',
          quote:
            '"It\'s easy: download the app, sign up in minutes, and fund your wallet."',
        },
        {
          step: '05',
          title: 'Trust Element',
          description:
            'A strong guarantee is added to remove fear and build confidence in the offer.',
          quote:
            '"Here\'s our guarantee. If you deposit before your physical inspection and don\'t like what you see, you get a 100% refund."',
        },
        {
          step: '06',
          title: 'Call to Action',
          description: 'The video closes with urgency and ownership-driven messaging.',
          quote:
            '"Don\'t just save for the future, own it. Lock in your plot today. Download Project Young Landlord today. Your journey starts now."',
        },
      ],
    },
    result: {
      summary:
        "The motion ad helped simplify Win Realty's message and made the investment offer more accessible and easy to understand. By breaking down the process visually and highlighting affordability, the video improved clarity around the Project Young Landlord app and strengthened user trust.",
      impact:
        "The content was optimized for social media distribution, leading to increased engagement and improved interest in the app download funnel. The video positioned Win Realty's app as a simple entry point into property ownership, helping drive awareness and encouraging more users to take the next step toward downloading the app.",
    },
    relatedProjects: ['bizee', 'exec-comm'],
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
    title: 'SaaS Demo Videos',
    description:
      'Crisp, walkthrough-style videos that showcase your software and turn sign-ups into confident users.',
    icon: '🖥️',
  },
  {
    id: '2',
    title: 'Explainer Videos',
    description:
      'Clear, engaging videos that break down your product or service so your audience gets it instantly.',
    icon: '📹',
  },
  {
    id: '3',
    title: 'Logo Animations',
    description:
      'Bring your brand mark to life with a polished animated logo that leaves a lasting first impression.',
    icon: '✨',
  },
  {
    id: '4',
    title: 'Social Media Ads',
    description:
      'Scroll-stopping short-form video ads crafted for Instagram, TikTok, YouTube, and beyond.',
    icon: '📱',
  },
  {
    id: '5',
    title: 'Promotional Ads',
    description:
      'High-impact promotional videos designed to drive awareness, excitement, and conversions for your brand.',
    icon: '📢',
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
