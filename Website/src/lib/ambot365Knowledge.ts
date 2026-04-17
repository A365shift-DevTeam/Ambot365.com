export type QA = {
  keywords: string[];
  question: string;
  answer: string;
};

export const QA_DATABASE: QA[] = [
  // ── COMPANY OVERVIEW ──────────────────────────────────────────────────────
  {
    keywords: ['what is ambot365', 'what is ambot', 'about ambot365', 'about ambot', 'who are you', 'company', 'ambot365'],
    question: 'What is Ambot365 / Ambot365?',
    answer: '**Ambot365** (trading as Ambot365) is a premium AI automation company under the **Ambot365** group.\n\nTagline: *"We Build It. You Operate It. We Transform It."*\n\nWe build intelligent AI agents and automation solutions that run securely on your own infrastructure — your data never leaves your network.\n\n**Group structure:** Ambot365 → Ambot365Shift → Ambot365',
  },
  {
    keywords: ['founder', 'ambrose', 'denny', 'who founded', 'leadership'],
    question: 'Who founded Ambot365?',
    answer: '**Ambrose Denny** is the founder of Ambot365. The group brings together 40+ years of combined enterprise experience across finance, ERP, and AI automation.',
  },
  {
    keywords: ['stats', 'statistics', 'numbers', 'clients', 'how many', 'experience', 'track record'],
    question: 'What are Ambot365\'s key stats?',
    answer: 'Here are our key numbers:\n\n- **50+** enterprise clients served\n- **6+** AI agents live in production\n- **19+** enterprise systems integrated\n- **8 weeks** average delivery time\n- **24/7** support provided\n- **40+** years combined enterprise experience',
  },
  {
    keywords: ['tagline', 'slogan', 'motto', 'build operate transform'],
    question: 'What is Ambot365\'s tagline?',
    answer: 'Our tagline is: **"We Build It. You Operate It. We Transform It."**\n\nThis reflects our end-to-end commitment — we build the solution, hand it over for you to operate, and continuously help transform your business with AI.',
  },
  {
    keywords: ['ambot365', 'ambot365shift', 'group', 'parent company', 'group structure'],
    question: 'What is the Ambot365 group structure?',
    answer: 'The group is structured as:\n\n**Ambot365** (parent — 20+ years enterprise IT background)\n→ **Ambot365Shift** (AI transformation division)\n→ **Ambot365** (AI agents and automation products)',
  },
  {
    keywords: ['industries', 'sectors', 'industry', 'manufacturing', 'automotive', 'finance', 'saas', 'private equity'],
    question: 'Which industries does Ambot365 serve?',
    answer: 'We serve the following industries:\n\n- **Manufacturing**\n- **Automotive**\n- **Finance & Banking**\n- **Venture Capital / Private Equity (VC/PE)**\n- **B2B SaaS companies**',
  },

  // ── INTELLIGENT AI AGENTS ─────────────────────────────────────────────────
  {
    keywords: ['ai agents', 'intelligent agent', 'what agents', 'agents offer', 'automation agents', 'agent list'],
    question: 'What Intelligent AI Agents do you offer?',
    answer: 'We offer four production-ready AI agents:\n\n1. **AP Agent** — Automates Accounts Payable: vendor invoice processing, matching, and payment workflows\n2. **AR Agent** — Automates Accounts Receivable: customer invoice tracking, collections, and reconciliation\n3. **SAP Reconcile Agent** — Automates GRN reconciliation within SAP ECC and SAP HANA\n4. **Reconcile Agent** — General-purpose financial reconciliation for non-SAP environments\n\nAll agents run on your infrastructure. Your data never leaves your network.',
  },
  {
    keywords: ['ap agent', 'accounts payable', 'invoice processing', 'vendor invoice', 'payment workflow'],
    question: 'What is the AP Agent?',
    answer: 'The **AP Agent** (Accounts Payable Agent) automates:\n\n- Vendor invoice ingestion and processing\n- 3-way matching (PO → GRN → Invoice)\n- Exception flagging and escalation\n- Payment run preparation\n\nIt integrates with SAP, NetSuite, and other ERPs via secure APIs, running entirely within your network.',
  },
  {
    keywords: ['ar agent', 'accounts receivable', 'customer invoice', 'collections', 'receivable'],
    question: 'What is the AR Agent?',
    answer: 'The **AR Agent** (Accounts Receivable Agent) automates:\n\n- Customer invoice tracking and follow-up\n- Collections workflow management\n- Remittance matching and allocation\n- Overdue escalation and reporting\n\nIt reduces manual AR workload significantly and improves cash flow visibility.',
  },
  {
    keywords: ['sap reconcile', 'grn', 'goods receipt', 'sap agent', 'sap automation'],
    question: 'What is the SAP Reconcile Agent?',
    answer: 'The **SAP Reconcile Agent** automates GRN (Goods Receipt Note) reconciliation in SAP ECC and SAP HANA.\n\n**Manual process (10 steps, ~10 sec/record):** Open SAP → Search GRN → Locate PO → Check line items → Open Invoice → Cross-reference → Identify discrepancies → Log exceptions → Escalate → Update records.\n\n**Automated (4 steps, ~4 sec/record):** Agent reads GRN → Matches PO & Invoice → Flags exceptions → Posts to dashboard.\n\n**Result:** 60% time reduction, near-zero manual errors.',
  },
  {
    keywords: ['reconcile agent', 'reconciliation', 'financial reconciliation', 'non-sap', 'bank reconciliation'],
    question: 'What is the Reconcile Agent?',
    answer: 'The **Reconcile Agent** is a general-purpose financial reconciliation agent for non-SAP environments.\n\nUse cases include:\n- Bank statement reconciliation\n- Intercompany reconciliation\n- Month-end close acceleration\n- Any multi-source financial matching task',
  },
  {
    keywords: ['erp', 'integrate', 'integration', 'netsuite', 'sap ecc', 'sap hana', 'connect'],
    question: 'How do AI Agents integrate with our ERP?',
    answer: 'Our agents integrate with:\n\n- **SAP ECC** and **SAP HANA** (via BAPI, RFC, or REST APIs)\n- **NetSuite** (SuiteScript and REST)\n- Other ERPs via secure REST/SOAP APIs\n\nAll integrations run on your own infrastructure. No data is sent externally. We handle the full integration design as part of Phase 02 (Solution Design).',
  },

  // ── MICROSOFT AI ECOSYSTEM ────────────────────────────────────────────────
  {
    keywords: ['microsoft', 'microsoft ai', 'copilot', 'm365', 'microsoft solutions', 'microsoft ecosystem'],
    question: 'What Microsoft AI solutions do you offer?',
    answer: 'Our Microsoft AI Ecosystem solutions include:\n\n1. **Microsoft Copilot Solutions** — Deploy and customise Copilot for your M365 tenant\n2. **Custom Agent Development** — Build bespoke agents using the Microsoft Agents SDK\n3. **Microsoft 365 Desktop Automation** — Power Automate Desktop, VBA, and custom scripts\n4. **Microsoft 365 Cloud Automation** — Power Platform, Power Automate cloud flows, Microsoft Graph API',
  },
  {
    keywords: ['copilot', 'custom copilot', 'copilot agent', 'copilot studio', 'microsoft agent'],
    question: 'Can you build custom Copilot agents?',
    answer: 'Yes. We develop custom agents using **Microsoft Copilot Studio** and the **Microsoft Agents SDK**, tailored to your workflows and integrated with your M365 tenant.\n\nExamples include Copilot agents for HR FAQs, finance queries, procurement approvals, and customer service.',
  },
  {
    keywords: ['power automate', 'power platform', 'power bi', 'power apps', 'desktop automation', 'cloud automation'],
    question: 'Do you support Power Platform and Power Automate?',
    answer: 'Yes. We cover both:\n\n- **Desktop automation:** Power Automate Desktop, VBA macros, custom scripts\n- **Cloud automation:** Power Automate cloud flows, Power Apps, Power BI, Microsoft Graph API\n\nWe design, build, and deploy end-to-end Power Platform solutions as part of our Microsoft AI Ecosystem service.',
  },
  {
    keywords: ['graph api', 'sharepoint', 'teams', 'outlook', 'microsoft 365'],
    question: 'Do you automate SharePoint, Teams, or Outlook?',
    answer: 'Yes. We automate across the full Microsoft 365 suite using the **Microsoft Graph API**, including:\n\n- SharePoint document management and approvals\n- Teams notifications, bots, and adaptive cards\n- Outlook email processing and routing\n- OneDrive file automation',
  },

  // ── OFFICE SUITE ──────────────────────────────────────────────────────────
  {
    keywords: ['office suite', 'office tools', 'office products', 'productivity tools', 'office automation'],
    question: 'What are your Office Suite products?',
    answer: 'Our Office Suite includes:\n\n- **DocCraft** — Convert Excel to PDF, PowerPoint, or Images automatically\n- **Sheets to Slides** — Auto-generate PowerPoint presentations from Excel data\n- **Image Compressor** — Batch compress images for reports\n- **Consolidation** — Merge multiple Excel/data files into one report\n- **File Splitter** — Split large Excel/CSV files into chunks\n- **Merge Master** — Intelligently merge PDF or Office documents\n- **File Comparison** — Compare two Excel/Word files and highlight differences\n- **Work Allocation** — Automate task allocation across teams',
  },
  {
    keywords: ['doccraft', 'excel to pdf', 'excel to powerpoint', 'excel to image', 'convert excel'],
    question: 'What is DocCraft?',
    answer: '**DocCraft** is an Office Suite tool that automatically converts Excel files into:\n\n- PDF reports\n- PowerPoint presentations\n- Images\n\nIt eliminates the manual effort of formatting and exporting, making report distribution fast and consistent.',
  },
  {
    keywords: ['sheets to slides', 'excel to slides', 'excel presentation', 'powerpoint from excel', 'generate slides'],
    question: 'What is Sheets to Slides?',
    answer: '**Sheets to Slides** automatically generates PowerPoint presentations directly from your Excel data.\n\nIt reads your data, applies your chosen template, and produces a fully formatted deck — ideal for recurring reports, dashboards, and board presentations.',
  },
  {
    keywords: ['consolidation', 'merge excel', 'combine files', 'consolidate data', 'merge data'],
    question: 'What is the Consolidation tool?',
    answer: 'The **Consolidation** tool merges multiple Excel spreadsheets or data files into a single consolidated report.\n\nIdeal for month-end reporting, multi-branch data collection, or aggregating data from multiple teams.',
  },
  {
    keywords: ['file splitter', 'split excel', 'split csv', 'split file', 'large file'],
    question: 'What is the File Splitter?',
    answer: 'The **File Splitter** breaks large Excel or CSV files into smaller, manageable chunks.\n\nUseful for distributing data to different teams, processing large exports in batches, or meeting file-size limits.',
  },
  {
    keywords: ['merge master', 'merge pdf', 'merge documents', 'combine pdf', 'combine documents'],
    question: 'What is Merge Master?',
    answer: '**Merge Master** intelligently merges PDF or Office documents into a single file.\n\nUseful for compiling reports, combining contracts, or assembling multi-section documents from different sources.',
  },
  {
    keywords: ['file comparison', 'compare excel', 'compare word', 'diff', 'differences', 'compare files'],
    question: 'What is the File Comparison tool?',
    answer: 'The **File Comparison** tool compares two Excel or Word files and highlights all differences.\n\nIdeal for audit trails, version control, contract review, and data validation workflows.',
  },
  {
    keywords: ['work allocation', 'task allocation', 'assign work', 'workload', 'team allocation'],
    question: 'What is the Work Allocation tool?',
    answer: 'The **Work Allocation** tool automates the distribution of tasks across team members based on capacity, skill, or rules.\n\nReduces manual scheduling effort and ensures balanced workloads across your team.',
  },
  {
    keywords: ['image compressor', 'compress image', 'image size', 'reduce image'],
    question: 'What is the Image Compressor?',
    answer: 'The **Image Compressor** batch-compresses images for use in reports, presentations, and emails.\n\nIt reduces file sizes without significant quality loss, speeding up file sharing and storage.',
  },
  {
    keywords: ['crm', 'crm agent', 'customer relationship', 'lead management'],
    question: 'Do you offer CRM solutions?',
    answer: 'Yes. We offer **CRM Agents** as part of the Office Suite — AI-powered CRM automation that handles:\n\n- Lead capture and scoring\n- Follow-up automation\n- Pipeline management\n- Customer data enrichment',
  },
  {
    keywords: ['chatbot', 'chat bot', 'customer chatbot', 'internal chatbot', 'bot'],
    question: 'Do you offer chatbots?',
    answer: 'Yes. We build **AI-powered Chatbots** for:\n\n- Customer support and FAQ handling\n- Internal HR or IT helpdesks\n- Lead qualification\n- Order tracking and status queries\n\nChatbots can be integrated into your website, Teams, or custom portals.',
  },
  {
    keywords: ['web app', 'mobile app', 'web application', 'mobile application', 'app development'],
    question: 'Can you build web or mobile apps?',
    answer: 'Yes. We deliver **Web and Mobile Apps with BI** — custom applications integrated with your data and business intelligence dashboards.\n\nThese are built as part of our Office Suite and are tailored to your specific workflows and reporting needs.',
  },
  {
    keywords: ['digital marketing', 'marketing agent', 'marketing automation', 'campaign'],
    question: 'Do you offer digital marketing automation?',
    answer: 'Yes. We offer a **Digital Marketing Agent** that automates:\n\n- Campaign scheduling and distribution\n- Lead capture from digital channels\n- Performance reporting\n- Multi-channel coordination',
  },
  {
    keywords: ['lead agent', 'lead scoring', 'lead nurturing', 'lead follow-up', 'leads'],
    question: 'What is the Lead Agent?',
    answer: 'The **Lead Agent** automates the full lead lifecycle:\n\n- Lead scoring based on behaviour and profile\n- Automated follow-up sequences\n- Lead routing to the right sales rep\n- Nurturing campaigns for cold leads',
  },

  // ── SCALABLE INDUSTRY PRODUCTS ────────────────────────────────────────────
  {
    keywords: ['industry products', 'scalable products', 'office ai bots', 'customer satisfaction', 'scalable'],
    question: 'What Scalable Industry Products do you have?',
    answer: 'We offer two scalable industry products:\n\n1. **Office AI Bots** — A desktop application suite of AI-powered office automation bots, designed for multi-user enterprise deployment\n2. **Customer Satisfaction Solutions** — AI-driven customer feedback collection, sentiment analysis, and satisfaction reporting tools',
  },
  {
    keywords: ['office ai bots', 'desktop app', 'desktop application', 'office bots', 'bots app'],
    question: 'What is Office AI Bots?',
    answer: '**Office AI Bots** is a Windows desktop application that bundles a suite of AI-powered office automation bots.\n\n- Runs entirely on your local machine — no data sent externally\n- Supports Windows 10 and Windows 11 (64-bit)\n- Designed for multi-seat enterprise deployment with central licence management\n- Supports Excel (.xlsx/.xlsm), Word (.docx), PowerPoint (.pptx), PDF, and CSV\n- 24/7 support and onboarding training included',
  },
  {
    keywords: ['customer satisfaction', 'csat', 'feedback', 'sentiment', 'survey', 'satisfaction'],
    question: 'What is the Customer Satisfaction solution?',
    answer: 'Our **Customer Satisfaction Solution** is an AI-driven platform that:\n\n- Collects customer feedback across channels\n- Runs sentiment analysis on responses\n- Generates satisfaction reports and trend dashboards\n- Flags at-risk customers for proactive follow-up',
  },
  {
    keywords: ['scale', 'scale across', 'multi-team', 'multi-tenant', 'departments', 'rollout', 'organisation'],
    question: 'How do products scale across the organisation?',
    answer: 'Our industry products are built with a **multi-tenant architecture**.\n\n- The same solution can be deployed across multiple teams or divisions\n- Minimal rework is needed for each team rollout\n- Central licence and access management\n- Consistent user experience at scale\n\nWe help you plan and execute the full organisational rollout.',
  },

  // ── DELIVERY PROCESS ──────────────────────────────────────────────────────
  {
    keywords: ['delivery process', 'how does it work', 'engagement', 'process', 'phases', 'how do you work', 'workflow'],
    question: 'How do engagements work?',
    answer: 'All projects follow our **3-phase delivery model**:\n\n**Phase 01 — Discovery Sprint (Weeks 0–2)**\nUnderstand your processes, map current workflows, identify automation opportunities. Output: Fixed-price quote.\n\n**Phase 02 — Solution Design (Weeks 2–4)**\nTechnical architecture, data flow, integration design, UX design. Output: Solution blueprint.\n\n**Phase 03 — Build & Deploy (Weeks 4–8)**\nAgile sprints, UAT in your environment, deployment and go-live. Output: Live solution.',
  },
  {
    keywords: ['discovery sprint', 'discovery', 'phase 1', 'first phase', 'initial phase'],
    question: 'What happens in the Discovery Sprint?',
    answer: '**Phase 01 — Discovery Sprint (Weeks 0–2):**\n\n- We understand your business processes and pain points\n- Map current manual workflows in detail\n- Identify automation opportunities and risks\n- Assess technical environment and integration needs\n\n**Output:** A scoped project brief and fixed-price quote. No surprises.',
  },
  {
    keywords: ['solution design', 'phase 2', 'design phase', 'architecture', 'blueprint'],
    question: 'What is the Solution Design phase?',
    answer: '**Phase 02 — Solution Design (Weeks 2–4):**\n\n- Detailed technical architecture\n- Data flow and integration mapping\n- ERP/API integration design\n- User experience design\n- Security and access control planning\n\n**Output:** A signed-off solution blueprint ready for build.',
  },
  {
    keywords: ['build', 'deploy', 'development', 'phase 3', 'build phase', 'go live', 'uat'],
    question: 'What happens in the Build & Deploy phase?',
    answer: '**Phase 03 — Build & Deploy (Weeks 4–8):**\n\n- Agile development sprints\n- Testing in your own environment\n- User Acceptance Testing (UAT) with your team\n- Deployment and go-live support\n\n**Output:** A live, working solution deployed in your environment.',
  },
  {
    keywords: ['timeline', 'how long', 'duration', 'time', 'weeks', 'delivery time'],
    question: 'What is the typical delivery timeline?',
    answer: 'Our standard delivery model is:\n\n- **Phase 01 (Discovery):** 0–2 weeks\n- **Phase 02 (Design):** 2–4 weeks\n- **Phase 03 (Build & Deploy):** 4–8 weeks\n\n**Average total:** 8 weeks from kickoff to go-live.\n\nTimeline may vary based on solution complexity and integration requirements.',
  },

  // ── PRICING ───────────────────────────────────────────────────────────────
  {
    keywords: ['pricing', 'cost', 'price', 'how much', 'quote', 'fixed price', 'fee', 'charge'],
    question: 'How is pricing structured?',
    answer: 'We offer **fixed-price quotes** — no surprises.\n\nPricing is provided after the **Discovery Sprint** (Phase 01, 0–2 weeks), once we fully understand your requirements.\n\nThe Discovery Sprint scopes the work and gives you a clear, fixed price before any commitment to build.',
  },
  {
    keywords: ['pilot', 'trial', 'proof of concept', 'poc', 'demo', 'test first'],
    question: 'Is there a pilot or trial option?',
    answer: 'Yes. We typically start with a **scoped pilot** to validate value before full rollout.\n\nThe pilot is designed during the Discovery Sprint and gives you a working proof of concept. Full rollout only proceeds once you are satisfied with the results.',
  },
  {
    keywords: ['get started', 'start', 'begin', 'contact', 'get in touch', 'book', 'next steps', 'how to start'],
    question: 'How do I get started with Ambot365?',
    answer: 'Getting started is simple:\n\n1. **Book a Discovery Sprint** — Click "Get in Touch" on the website to schedule a free discovery session\n2. **Receive a fixed quote** — Get a clear, fixed-price proposal within 2 weeks\n3. **Start a pilot** — Validate the solution with a scoped pilot\n4. **Scale** — Roll out across your organisation\n\nThere is no commitment until you receive and approve the quote.',
  },

  // ── SECURITY & DATA ───────────────────────────────────────────────────────
  {
    keywords: ['security', 'secure', 'data security', 'safe', 'data safe', 'data protection', 'privacy'],
    question: 'How secure is the Ambot365 solution?',
    answer: 'Security is central to our design:\n\n- All agents run **on your own infrastructure** (on-premise or your private cloud)\n- Data **never leaves your network**\n- Compatible with enterprise security policies and compliance requirements\n- Full **audit trails** for all automated actions\n- **Role-based access control (RBAC)** supported\n- Office AI Bots runs as a local desktop app — no cloud data transmission',
  },
  {
    keywords: ['on premise', 'on-premise', 'infrastructure', 'cloud', 'private cloud', 'in-house', 'data stays'],
    question: 'Does data leave our network?',
    answer: 'No. All Ambot365 agents and solutions run **on your own infrastructure**.\n\nYour data never leaves your network. Whether deployed on-premise or in your private cloud, we ensure:\n\n- No external data transmission\n- Full compliance with your IT security policies\n- Audit trails for all agent actions',
  },
  {
    keywords: ['compliance', 'gdpr', 'audit', 'audit trail', 'regulatory', 'rbac', 'access control'],
    question: 'Are Ambot365 solutions compliance-ready?',
    answer: 'Yes. Our solutions are designed for enterprise compliance:\n\n- **Full audit trails** — every automated action is logged\n- **RBAC** — role-based access control for all users\n- **Data locality** — data stays in your network\n- Compatible with GDPR, SOX, and internal IT governance policies\n\nSpecific compliance requirements are addressed during the Discovery Sprint.',
  },
  {
    keywords: ['desktop app', 'office bots app', 'local app', 'offline', 'no internet', 'sends data'],
    question: 'Does the Office AI Bots desktop app send data externally?',
    answer: 'No. **Office AI Bots** runs entirely on your local machine.\n\n- No data is transmitted to the cloud or any external server\n- All processing happens locally\n- Fully offline-capable once installed\n- Supports Windows 10 and Windows 11 (64-bit)',
  },

  // ── SUPPORT & TRAINING ────────────────────────────────────────────────────
  {
    keywords: ['support', '24/7', 'help', 'assistance', 'after delivery', 'post go-live'],
    question: 'What support is provided after delivery?',
    answer: 'We provide **24/7 support** for all deployed solutions.\n\nThis includes:\n- Technical issue resolution\n- Performance monitoring\n- Enhancement requests\n- Regular health checks\n\nSupport terms are agreed upon during the engagement.',
  },
  {
    keywords: ['training', 'onboarding', 'user training', 'learn', 'how to use'],
    question: 'Is training provided?',
    answer: 'Yes. We provide **onboarding training** for all users and admin staff.\n\nTraining covers:\n- How to use the deployed solution day-to-day\n- Admin configuration and management\n- Exception handling and escalation procedures\n- Reporting and dashboards\n\n24/7 support is available post-training.',
  },
];
