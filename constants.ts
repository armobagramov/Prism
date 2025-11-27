import { Topic, ArgumentType, User } from './types';

const mockAuthor1 = { id: 'a1', name: 'Dr. Sarah Chen', isExpert: true, expertLabel: 'AI Ethics Researcher', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' };
const mockAuthor2 = { id: 'a2', name: 'Mark Davis', isExpert: false, avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark' };
const mockAuthor3 = { id: 'a3', name: 'Elena Rodriguez', isExpert: true, expertLabel: 'Policy Analyst', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' };
const mockAuthor4 = { id: 'a4', name: 'James Wilson', isExpert: true, expertLabel: 'Economist', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' };
const mockAuthor5 = { id: 'a5', name: 'Maya Patel', isExpert: false, avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya' };

export const MOCK_USER: User = {
    id: 'u1',
    name: 'Alex Wanderer',
    email: 'alex@example.com',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'Curious about technology and future societies.',
    joinedDate: 'Oct 2023',
    reputationScore: 1250
};

export const MOCK_TOPICS: Topic[] = [
  {
    id: 't1',
    title: 'Generative AI & Jobs',
    shortDescription: 'Will AI replace creative professionals?',
    fullDescription: 'This topic explores the rapid advancement of generative AI tools like Midjourney and GPT-4 and their potential to displace human artists, writers, and designers versus the argument that they serve as force multipliers.',
    category: 'Technology',
    temperature: 'High',
    activityLevel: 85,
    lastUpdated: '2h ago',
    arguments: {
      pro: [
        {
          id: 'arg1',
          author: mockAuthor1,
          content: 'AI automates the technical aspects of creation, allowing artists to focus on high-level concepts. It is a tool, like the camera was to painting.',
          type: ArgumentType.PRO,
          votes: 124,
          timestamp: '1 day ago',
          sources: [{ title: 'History of Photography: A Parallel', url: 'https://example.com/photo-history' }],
          children: [
             {
              id: 'arg1-r1',
              author: mockAuthor2,
              content: 'But unlike a camera, AI trains on existing copyrighted work without consent. That is a fundamental difference in extraction.',
              type: ArgumentType.CON,
              votes: 45,
              timestamp: '20h ago',
              sources: [],
              children: []
             }
          ]
        }
      ],
      con: [
        {
          id: 'arg2',
          author: mockAuthor2,
          content: 'The speed and cost-efficiency of AI will devalue human labor, making it impossible for entry-level creatives to find work and build skills.',
          type: ArgumentType.CON,
          votes: 98,
          timestamp: '5h ago',
          sources: [{ title: 'Economic Impact Report 2024', url: 'https://example.com/report' }],
          children: []
        }
      ],
      nuance: [
        {
          id: 'arg3',
          author: mockAuthor3,
          content: 'The likely outcome is a hybrid model where "prompt engineering" becomes a new creative skill, shifting the job market rather than erasing it.',
          type: ArgumentType.NUANCE,
          votes: 210,
          timestamp: '2h ago',
          sources: [{ title: 'Future of Work Study', url: 'https://example.com/study' }],
          children: []
        }
      ]
    }
  },
  {
    id: 't2',
    title: 'Universal Basic Income',
    shortDescription: 'Combatting inequality via guaranteed income.',
    fullDescription: 'A structured discussion on the economic feasibility and social impact of providing every citizen with a recurring cash payment regardless of income.',
    category: 'Economics',
    temperature: 'Medium',
    activityLevel: 60,
    lastUpdated: '1d ago',
    arguments: {
      pro: [
        {
          id: 't2-a1',
          author: mockAuthor4,
          content: 'UBI provides a necessary floor for existence. As automation decouples productivity from labor, we need a mechanism to circulate capital back to consumers to keep the economy functioning.',
          type: ArgumentType.PRO,
          votes: 342,
          timestamp: '2 days ago',
          sources: [{ title: 'Automation and the Future of Labor', url: 'https://www.nber.org/papers/w24835' }],
          children: []
        }
      ],
      con: [
        {
          id: 't2-a2',
          author: mockAuthor5,
          content: 'The cost is prohibitive. Funding a meaningful UBI would require doubling federal taxes or slashing all other safety nets, potentially leaving the vulnerable worse off.',
          type: ArgumentType.CON,
          votes: 215,
          timestamp: '1 day ago',
          sources: [{ title: 'The Cost of UBI', url: 'https://www.cbpp.org/research/poverty-and-opportunity/commentary-universal-basic-income-may-sound-attractive-but-if-it' }],
          children: []
        }
      ],
      nuance: [
        {
          id: 't2-a3',
          author: mockAuthor3,
          content: 'Negative Income Tax (NIT) offers a more targeted approach than UBI. It ensures a floor without the inefficiency of paying the wealthy, maintaining work incentives more effectively.',
          type: ArgumentType.NUANCE,
          votes: 180,
          timestamp: '5h ago',
          sources: [{ title: 'Friedman\'s Negative Income Tax', url: 'https://mitsloan.mit.edu/ideas-made-to-matter/negative-income-tax-explained' }],
          children: []
        }
      ]
    }
  },
  {
    id: 't3',
    title: 'Ban TikTok?',
    shortDescription: 'National security vs Free Speech.',
    fullDescription: 'Analyzing the proposed bans on TikTok in Western countries due to data privacy concerns related to its parent company ByteDance.',
    category: 'Politics',
    temperature: 'High',
    activityLevel: 95,
    lastUpdated: '30m ago',
    arguments: {
      pro: [
         {
          id: 't3-a1',
          author: mockAuthor3,
          content: 'The app presents a unique national security threat because Chinese law compels companies to assist intelligence gathering. This risk cannot be mitigated by standard regulation.',
          type: ArgumentType.PRO,
          votes: 560,
          timestamp: '3h ago',
          sources: [{ title: 'CSIS: The TikTok Security Threat', url: 'https://www.csis.org/analysis/tiktok-ban-explained' }],
          children: []
        }
      ],
      con: [
         {
          id: 't3-a2',
          author: mockAuthor5,
          content: 'Banning a specific platform sets a dangerous precedent for free speech. The focus should be on comprehensive data privacy laws that apply to ALL tech companies, domestic or foreign.',
          type: ArgumentType.CON,
          votes: 490,
          timestamp: '4h ago',
          sources: [{ title: 'EFF: Why Banning TikTok is Unconstitutional', url: 'https://www.eff.org/deeplinks/2023/03/tiktok-ban-bill-is-dangerous' }],
          children: []
        }
      ],
      nuance: [
         {
          id: 't3-a3',
          author: mockAuthor4,
          content: 'Forced divestiture is the most likely middle ground. It addresses ownership concerns without destroying the platform\'s economic value or speech rights.',
          type: ArgumentType.NUANCE,
          votes: 310,
          timestamp: '1h ago',
          sources: [{ title: 'Project Texas Explained', url: 'https://usds.tiktok.com/' }],
          children: []
        }
      ]
    }
  },
  {
    id: 't4',
    title: 'Nuclear Energy',
    shortDescription: 'Essential for Net-Zero?',
    fullDescription: 'Weighing the low-carbon benefits of nuclear fission against the risks of waste storage and proliferation.',
    category: 'Environment',
    temperature: 'Medium',
    activityLevel: 70,
    lastUpdated: '4h ago',
    arguments: {
        pro: [
             {
              id: 't4-a1',
              author: mockAuthor1,
              content: 'Nuclear is the only scalable, dispatchable zero-carbon baseload power source. We cannot reach net-zero targets with intermittent renewables alone.',
              type: ArgumentType.PRO,
              votes: 420,
              timestamp: '1 day ago',
              sources: [{ title: 'IEA: Nuclear Power in a Clean Energy System', url: 'https://www.iea.org/reports/nuclear-power-in-a-clean-energy-system' }],
              children: []
            }
        ], 
        con: [
             {
              id: 't4-a2',
              author: mockAuthor2,
              content: 'Nuclear projects are consistently over budget and behind schedule. The radioactive waste problem remains politically and technically unsolved for long-term storage.',
              type: ArgumentType.CON,
              votes: 310,
              timestamp: '6h ago',
              sources: [{ title: 'UCS: The Nuclear Power Dilemma', url: 'https://www.ucsusa.org/energy/nuclear-power' }],
              children: []
            }
        ], 
        nuance: [
             {
              id: 't4-a3',
              author: mockAuthor4,
              content: 'Small Modular Reactors (SMRs) offer a potential path forward by reducing upfront capital costs and improving safety profiles, though the technology is not yet proven at scale.',
              type: ArgumentType.NUANCE,
              votes: 215,
              timestamp: '2h ago',
              sources: [{ title: 'What are SMRs?', url: 'https://www.iaea.org/newscenter/news/what-are-small-modular-reactors-smrs' }],
              children: []
            }
        ]
    }
  },
  {
    id: 't5',
    title: 'Space Exploration',
    shortDescription: 'Public vs Private investment.',
    fullDescription: 'Should governments prioritize space agencies like NASA or rely on private sector companies like SpaceX?',
    category: 'Science',
    temperature: 'Low',
    activityLevel: 40,
    lastUpdated: '3d ago',
    arguments: {
        pro: [
             {
              id: 't5-a1',
              author: mockAuthor1,
              content: 'Investment in space yields massive terrestrial benefits, from GPS to climate monitoring satellites and advanced materials. It drives STEM education and innovation.',
              type: ArgumentType.PRO,
              votes: 150,
              timestamp: '3 days ago',
              sources: [{ title: 'NASA Spinoff Technologies', url: 'https://spinoff.nasa.gov/' }],
              children: []
            }
        ], 
        con: [
             {
              id: 't5-a2',
              author: mockAuthor5,
              content: 'Spending billions on Mars colonization is ethically questionable when we face existential threats on Earth like climate change and extreme poverty.',
              type: ArgumentType.CON,
              votes: 130,
              timestamp: '2 days ago',
              sources: [{ title: 'The Case for Earth First', url: 'https://theconversation.com/why-spend-billions-on-space-when-we-have-problems-on-earth-126236' }],
              children: []
            }
        ], 
        nuance: [
             {
              id: 't5-a3',
              author: mockAuthor3,
              content: 'The public-private partnership model (e.g., COTS) has lowered costs dramatically. The gov should focus on deep space science, leaving LEO transport to private firms.',
              type: ArgumentType.NUANCE,
              votes: 180,
              timestamp: '1 day ago',
              sources: [{ title: 'NASA Commercial Crew Program', url: 'https://www.nasa.gov/exploration/commercial/crew/index.html' }],
              children: []
            }
        ]
    }
  },
  {
    id: 't6',
    title: 'CRISPR & Gene Editing',
    shortDescription: 'Ethics of "Designer Babies".',
    fullDescription: 'The moral implications of germline editing in humans. Where do we draw the line between therapy and enhancement?',
    category: 'Bioethics',
    temperature: 'Medium',
    activityLevel: 55,
    lastUpdated: '5h ago',
    arguments: { 
        pro: [
             {
              id: 't6-a1',
              author: mockAuthor1,
              content: 'CRISPR holds the promise of permanently eradicating horrific genetic diseases like Huntington’s and Sickle Cell Anemia, ending suffering for millions.',
              type: ArgumentType.PRO,
              votes: 240,
              timestamp: '10h ago',
              sources: [{ title: 'CRISPR Clinical Trials Results', url: 'https://www.nature.com/articles/d41586-020-03298-6' }],
              children: []
            }
        ], 
        con: [
             {
              id: 't6-a2',
              author: mockAuthor2,
              content: 'Germline editing creates permanent changes to the human gene pool with unknown long-term consequences, risking off-target mutations and eugenic practices.',
              type: ArgumentType.CON,
              votes: 210,
              timestamp: '8h ago',
              sources: [{ title: 'NIH Statement on Gene Editing', url: 'https://www.nih.gov/about-nih/who-we-are/nih-director/statements/statement-nih-funding-research-using-gene-editing-technologies-human-embryos' }],
              children: []
            }
        ], 
        nuance: [
             {
              id: 't6-a3',
              author: mockAuthor3,
              content: 'We must distinguish between somatic editing (treating the patient) and germline editing (heritable). A global moratorium on germline is needed while somatic proceeds.',
              type: ArgumentType.NUANCE,
              votes: 300,
              timestamp: '4h ago',
              sources: [{ title: 'WHO Standards for Human Genome Editing', url: 'https://www.who.int/publications/i/item/9789240030060' }],
              children: []
            }
        ]
    }
  },
  {
    id: 't7',
    title: 'Cryptocurrency Regulation',
    shortDescription: 'Innovation vs Consumer Protection.',
    fullDescription: 'How strictly should decentralized finance be regulated to prevent fraud without stifling innovation?',
    category: 'Economics',
    temperature: 'High',
    activityLevel: 80,
    lastUpdated: '12m ago',
    arguments: { 
        pro: [
             {
              id: 't7-a1',
              author: mockAuthor2,
              content: 'DeFi democratizes finance by removing rent-seeking intermediaries. Excessive regulation will only push this innovation offshore to other jurisdictions.',
              type: ArgumentType.PRO,
              votes: 280,
              timestamp: '1h ago',
              sources: [{ title: 'The Promise of DeFi', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3711777' }],
              children: []
            }
        ], 
        con: [
             {
              id: 't7-a2',
              author: mockAuthor4,
              content: 'The crypto space is rife with fraud, wash trading, and systemic risk. Without strict securities laws, retail investors are constantly exploited.',
              type: ArgumentType.CON,
              votes: 320,
              timestamp: '45m ago',
              sources: [{ title: 'SEC Chair on Crypto Markets', url: 'https://www.sec.gov/news/speech/gensler-aspen-security-forum-2021-08-03' }],
              children: []
            }
        ], 
        nuance: [
             {
              id: 't7-a3',
              author: mockAuthor3,
              content: 'Regulation should target the centralized on/off ramps (exchanges) and stablecoins, while leaving the underlying open-source protocols permissionless.',
              type: ArgumentType.NUANCE,
              votes: 250,
              timestamp: '10m ago',
              sources: [{ title: 'Brookings: The Future of Crypto Regulation', url: 'https://www.brookings.edu/research/the-future-of-crypto-regulation/' }],
              children: []
            }
        ] 
    }
  },
  {
    id: 't8',
    title: 'Remote Work Rights',
    shortDescription: 'Right to disconnect and WFH.',
    fullDescription: 'Should remote work be a protected legal right for compatible jobs?',
    category: 'Culture',
    temperature: 'Low',
    activityLevel: 35,
    lastUpdated: '2d ago',
    arguments: { 
        pro: [
             {
              id: 't8-a1',
              author: mockAuthor5,
              content: 'Remote work decouples livelihood from location, allowing for better work-life balance and reducing the carbon footprint of commuting.',
              type: ArgumentType.PRO,
              votes: 190,
              timestamp: '2 days ago',
              sources: [{ title: 'Global Workplace Analytics', url: 'https://globalworkplaceanalytics.com/telecommuting-statistics' }],
              children: []
            }
        ], 
        con: [
             {
              id: 't8-a2',
              author: mockAuthor2,
              content: 'Mandating remote work harms younger employees who rely on mentorship and osmosis. It erodes company culture and collaboration.',
              type: ArgumentType.CON,
              votes: 110,
              timestamp: '1 day ago',
              sources: [{ title: 'HBR: The Downside of Remote Work', url: 'https://hbr.org/2021/03/the-downside-of-remote-work' }],
              children: []
            }
        ], 
        nuance: [
             {
              id: 't8-a3',
              author: mockAuthor1,
              content: 'The "Right to Disconnect" is more critical than the right to work from home. The danger of remote work is the blurring of boundaries, not the location.',
              type: ArgumentType.NUANCE,
              votes: 220,
              timestamp: '5h ago',
              sources: [{ title: 'European Parliament: Right to Disconnect', url: 'https://www.europarl.europa.eu/news/en/headlines/society/20210121STO96103/parliament-calls-for-the-right-to-disconnect' }],
              children: []
            }
        ] 
    }
  }
];

// Helper to create links for the graph visualization
export const MOCK_LINKS = [
    { source: 't1', target: 't2' }, // Tech -> Econ (Automation/UBI)
    { source: 't1', target: 't3' }, // Tech -> Politics
    { source: 't2', target: 't4' },
    { source: 't4', target: 't5' }, // Env -> Science
    { source: 't6', target: 't1' }, // Bioethics -> Tech
    { source: 't7', target: 't2' }, // Crypto -> UBI (Money)
    { source: 't8', target: 't1' }, // Culture -> Tech
    { source: 't3', target: 't7' }, // Politics -> Econ
];