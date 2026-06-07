// ============================================================================
// CONFIGURATION
// ============================================================================
const RAG_BACKEND_URL = 'http://localhost:3000';

// AI Introduction script
const INTRO_SCRIPT = `Hi! I'm Sreekara Rao, a Data Engineer with over 6 years of experience building scalable data solutions across cloud and on-premises platforms.

I specialize in designing robust ETL pipelines and optimizing SQL workloads across Databricks, Snowflake, Azure, and AWS. Currently at Medzown as a Data Engineer, I focus on data quality, testing, and governance.

I hold a Master of Science from University of Michigan and four industry certifications including Databricks Certified Data Engineer Professional and AWS Certified Data Engineer Associate.

I'm passionate about turning complex business requirements into reliable, governed data products that drive efficiency and cost savings.`;

// Video intro captions with timing (in seconds)
const VIDEO_CAPTIONS = [
  { time: 0, text: "Hi! I'm Sreekara Rao" },
  { time: 2, text: "Data Engineer with 6+ years of experience" },
  { time: 5, text: "Building scalable data solutions across cloud & on-premises" },
  { time: 9, text: "Expert in: Databricks, Snowflake, Azure, AWS" },
  { time: 13, text: "Specializing in: ETL pipelines, SQL optimization, Data governance" },
  { time: 18, text: "Master of Science — University of Michigan" },
  { time: 22, text: "Certified: Databricks | AWS | Data Engineering" },
  { time: 26, text: "Turning complex requirements into reliable data products" }
];

// Chatbot knowledge base
const CHATBOT_RESPONSES = {
  databricks: "I have extensive Databricks experience. At Medzown, I build ETL pipelines in Databricks for large-scale analytics, create dbt models with data quality checks, and perform complex SQL tuning. I'm also Databricks Certified Data Engineer Professional.",
  snowflake: "I've worked extensively with Snowflake. At TCS, I led a Snowflake migration with SQL validation and anomaly detection. I designed Snowflake transformation layers with dbt and optimized queries for 40% faster performance.",
  experience: "I have 6+ years as a Data Engineer across multiple companies: Medzown (current), Taylor Farms, Tricubic Inc, TCS Hyderabad, and IBridge TechSoft. I started with SQL Server and SSAS, then moved to modern cloud platforms like Databricks and Snowflake.",
  skills: "My key skills include: Databricks, Snowflake, Azure, AWS, PySpark, Apache Spark, Airflow, dbt, Kafka, SQL, Python, Power BI, ETL Testing, Data Quality, CI/CD, and Data Migration.",
  projects: "I've led major projects including: Real-Time Data Pipeline (50k+ events/sec with Kafka & Spark), Snowflake Migration (200 tables with 100% accuracy), and dbt Transformation Framework (zero quality incidents).",
  education: "I have a Master of Science from University of Michigan, Dearborn (2022-2024). I also hold four industry certifications: Databricks Data Engineer Professional, AWS Data Engineer Associate, Databricks Generative AI Fundamentals, and Python Data Structures.",
  certifications: "I'm certified in: Databricks Certified Data Engineer Professional, AWS Certified Data Engineer Associate, Databricks Generative AI Fundamentals, and Python Data Structures.",
  python: "I have strong Python skills, particularly for data engineering. I use Python for PySpark transformations, data validation scripts, and pipeline development. It's one of my core technical languages.",
  spark: "I have hands-on experience with Apache Spark and PySpark. I've built real-time data pipelines processing 50k+ events/sec, optimized PySpark transformations, and authored comprehensive test cases for Spark jobs.",
  cloud: "I have expertise across multiple cloud platforms: Azure (Data Factory, Databricks), AWS (S3, IAM, Lambda), and on-premises systems. I've migrated workloads across platforms and optimized costs by 20-40%.",
  etl: "ETL is my core strength. I design and implement robust pipelines using various tools (Airflow, Azure Data Factory, Databricks) with strong emphasis on data quality, testing, and error handling.",
  default: "I'd be happy to tell you more! Feel free to ask about my experience, skills, projects, education, or certifications."
};

// ============================================================================
// PAGE NAVIGATION
// ============================================================================
const TOTAL_PAGES = 5;
let currentPage = 1;

const pagesWrapper = document.getElementById('pagesWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageIndicator = document.getElementById('pageIndicator');

function init() {
  showPage(1);
  attachPageEventListeners();
  initializeVideoIntro();
  initializeChatWidget();
  initializeResumeDownload();
}

function showPage(pageNum) {
  if (pageNum < 1 || pageNum > TOTAL_PAGES) return;

  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  const selectedPage = pagesWrapper.querySelector(`[data-page="${pageNum}"]`);
  if (selectedPage) {
    selectedPage.classList.add('active');
  }

  currentPage = pageNum;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === TOTAL_PAGES;
  pageIndicator.textContent = `${currentPage} / ${TOTAL_PAGES}`;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextPage() {
  if (currentPage < TOTAL_PAGES) {
    showPage(currentPage + 1);
  }
}

function prevPage() {
  if (currentPage > 1) {
    showPage(currentPage - 1);
  }
}

// ============================================================================
// AI VIDEO INTRODUCTION
// ============================================================================
function initializeVideoIntro() {
  const playBtn = document.getElementById('playVideoBtn');
  if (!playBtn) return;

  let isPlaying = false;
  let startTime = 0;
  let animationFrameId = null;

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      cancelAnimationFrame(animationFrameId);
      playBtn.textContent = '▶ Play Introduction';
      playBtn.classList.remove('playing');
      clearCaptions();
      isPlaying = false;
    } else {
      startTime = performance.now();
      playVideoIntro(playBtn, () => {
        playBtn.textContent = '▶ Play Introduction';
        playBtn.classList.remove('playing');
        isPlaying = false;
      });
      playBtn.textContent = '⏸ Stop';
      playBtn.classList.add('playing');
      isPlaying = true;
    }
  });
}

function playVideoIntro(playBtn, onComplete) {
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(INTRO_SCRIPT);
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;

  const captionEl = document.getElementById('videoCaptions');
  let currentCaptionIndex = 0;

  utterance.onstart = () => {
    const startTime = performance.now();

    function updateCaptions() {
      const elapsed = (performance.now() - startTime) / 1000;

      // Update caption based on elapsed time
      while (
        currentCaptionIndex < VIDEO_CAPTIONS.length &&
        elapsed >= VIDEO_CAPTIONS[currentCaptionIndex].time
      ) {
        displayCaption(VIDEO_CAPTIONS[currentCaptionIndex].text);
        currentCaptionIndex++;
      }

      if (currentCaptionIndex < VIDEO_CAPTIONS.length) {
        requestAnimationFrame(updateCaptions);
      }
    }

    updateCaptions();
  };

  utterance.onend = () => {
    clearCaptions();
    onComplete();
  };

  speechSynthesis.speak(utterance);
}

function displayCaption(text) {
  const captionEl = document.getElementById('videoCaptions');
  captionEl.textContent = text;
  captionEl.classList.add('fade-in');

  setTimeout(() => {
    captionEl.classList.remove('fade-in');
  }, 400);
}

function clearCaptions() {
  const captionEl = document.getElementById('videoCaptions');
  captionEl.textContent = '';
  captionEl.classList.remove('fade-in');
}

// ============================================================================
// CHAT WIDGET
// ============================================================================
let chatHistory = [];

function initializeChatWidget() {
  const chatToggle = document.getElementById('chatToggle');
  const chatClose = document.getElementById('chatClose');
  const chatWidget = document.getElementById('chatWidget');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');

  if (!chatToggle) return;

  chatToggle.addEventListener('click', () => {
    chatWidget.classList.toggle('open');
    chatToggle.classList.toggle('hidden');
    if (chatWidget.classList.contains('open')) {
      chatInput.focus();
    }
  });

  chatClose.addEventListener('click', () => {
    chatWidget.classList.remove('open');
    chatToggle.classList.remove('hidden');
  });

  chatSend.addEventListener('click', sendChatMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  });
}

function sendChatMessage() {
  const chatInput = document.getElementById('chatInput');
  const message = chatInput.value.trim();

  if (!message) return;

  addChatMessage(message, 'user');
  chatInput.value = '';

  // Show loading briefly
  addLoadingMessage();

  setTimeout(() => {
    removeLoadingMessage();
    respondToMessage(message);
  }, 800);
}

function respondToMessage(message) {
  const lowerMessage = message.toLowerCase();
  let response = CHATBOT_RESPONSES.default;

  // Match keywords in message
  for (const [key, value] of Object.entries(CHATBOT_RESPONSES)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      response = value;
      break;
    }
  }

  addChatMessage(response, 'bot');
  chatHistory.push({ role: 'user', content: message });
  chatHistory.push({ role: 'assistant', content: response });
}

function addChatMessage(text, role) {
  const chatMessages = document.getElementById('chatMessages');
  const msgEl = document.createElement('div');
  msgEl.className = `chat-msg ${role}`;

  const avatarEl = document.createElement('div');
  avatarEl.className = 'msg-avatar';
  avatarEl.textContent = role === 'bot' ? 'AI' : 'You';

  const textEl = document.createElement('div');
  textEl.className = 'msg-text';
  textEl.textContent = text;

  msgEl.appendChild(avatarEl);
  msgEl.appendChild(textEl);
  chatMessages.appendChild(msgEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addLoadingMessage() {
  const chatMessages = document.getElementById('chatMessages');
  const msgEl = document.createElement('div');
  msgEl.className = 'chat-msg bot';
  msgEl.id = 'loading-msg';

  const avatarEl = document.createElement('div');
  avatarEl.className = 'msg-avatar';
  avatarEl.textContent = 'AI';

  const textEl = document.createElement('div');
  textEl.className = 'msg-text chat-loading';
  textEl.innerHTML = '<span></span><span></span><span></span>';

  msgEl.appendChild(avatarEl);
  msgEl.appendChild(textEl);
  chatMessages.appendChild(msgEl);
}

function removeLoadingMessage() {
  const loadingMsg = document.getElementById('loading-msg');
  if (loadingMsg) loadingMsg.remove();
}

// ============================================================================
// RESUME DOWNLOAD
// ============================================================================
function downloadResume() {
  const resumeContent = `
SREEKARA RAO KARANAM
Data Engineer | Databricks • Snowflake • Azure • AWS
karanamsreekara273@gmail.com | Chandler, Arizona
LinkedIn • GitHub • Portfolio: http://localhost:8000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFESSIONAL SUMMARY

Data Engineer with 6+ years of experience building scalable data solutions across
cloud and on-premises platforms. Expert in designing robust ETL pipelines,
optimizing SQL workloads, and implementing data governance frameworks. Proven
track record delivering enterprise-scale data warehouses and analytics platforms
serving 100M+ records with 99.9% accuracy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROFESSIONAL EXPERIENCE

DATA ENGINEER | Medzown (Nov 2025 – Present)
Building scalable ETL pipelines and data warehouses for healthcare analytics.
• Designed and implemented robust ETL pipelines in Databricks processing 50M+ records daily
• Created dbt models with automated data-quality checks and 100% test coverage
• Tuned complex SQL queries reducing execution time by 40%; optimized Spark jobs for cost efficiency
• Managed AWS S3 bucket configurations, IAM policies, and data lifecycle management
• Curated dimensional and fact tables for Power BI dashboards serving 50+ business users

CLOUD + AI CONSULTANT | Taylor Farms (Dec 2024 – Oct 2025)
Led modernization of legacy analytics platform from on-premise SSRS to cloud-based Databricks/Power BI.
• Built Databricks SQL reporting views implementing complex shift scheduling and worker productivity metrics
• Reverse-engineered 200+ SSRS SQL reports; translated business logic to modern SQL
• Published 30+ analytical reports to Power BI Report Builder; trained 25+ end-users
• Developed production KPI dashboards tracking harvest volumes and labor metrics
• Implemented validation rules ensuring 99.9% data accuracy across supply-chain metrics

DATA ENGINEER | Tricubic Inc (Jul 2024 – Dec 2024)
Architected hybrid ETL infrastructure supporting real-time and batch processing across cloud/on-prem.
• Designed orchestration layer using Azure Data Factory and Apache Airflow supporting 50+ daily pipelines
• Implemented Kafka-based streaming pipeline ingesting 100k+ events/second with sub-second latency
• Optimized PySpark transformations achieving 60% reduction in execution time
• Authored comprehensive unit tests for ETL jobs with 85% code coverage
• Implemented backward-compatible schema changes handling breaking changes without disruption

ASSISTANT SYSTEM ENGINEER | Tata Consultancy Services (May 2021 – Aug 2022)
Executed enterprise-scale data warehouse migration to Snowflake platform.
• Led Snowflake migration of 200+ tables with 10B+ records ensuring 100% data integrity
• Built SQL-based anomaly detection logic identifying discrepancies between source and target
• Designed Apache Airflow DAGs managing 30+ data flows with error handling and retry mechanisms
• Implemented Salesforce CRM to Snowflake pipelines for real-time analytics
• Created technical documentation and trained 15+ team members on Snowflake platform

SOFTWARE ENGINEER | IBridge TechSoft (Jan 2020 – Apr 2021)
Built enterprise data warehouse solutions using Microsoft SQL Server BI stack.
• Designed and optimized 100+ stored procedures supporting real-time reporting with sub-second response
• Built SSIS packages performing complex data transformations; reduced runtime by 35%
• Developed 50+ SSRS reports and dashboards with drill-through and parameterized features
• Designed SSAS OLAP cubes and tabular models enabling multidimensional analysis
• Implemented star schema dimensional modeling supporting 100M+ fact rows

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TECHNICAL SKILLS

Data Platforms: Databricks, Snowflake, Azure Data Lake, AWS S3, SQL Server
Programming: Python, PySpark, SQL, Spark, Scala (basic)
ETL & Orchestration: Apache Airflow, Azure Data Factory, SSIS, dbt
Cloud Services: AWS (S3, IAM, Lambda), Azure (Data Factory, Databricks)
BI & Visualization: Power BI, Tableau, SSRS, Power BI Report Builder
Data Quality: Great Expectations, dbt Tests, Custom Validation Frameworks
Version Control: Git, GitHub, GitLab
Methodologies: Agile/Scrum, Data Governance, Schema Design, Performance Tuning

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EDUCATION

Master of Science in Data Science | University of Michigan, Dearborn (2022-2024)
Bachelor's Degree in Computer Science | [University Name]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CERTIFICATIONS & CREDENTIALS

✓ Databricks Certified Data Engineer Professional
✓ AWS Certified Data Engineer Associate
✓ Databricks Generative AI Fundamentals
✓ Python Data Structures and Algorithms

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KEY ACHIEVEMENTS

• Designed and deployed ETL pipelines processing 100M+ records daily with 99.9% accuracy
• Optimized Spark jobs reducing execution time by 60% and infrastructure costs by 40%
• Led successful enterprise data migrations (200+ tables, 10B+ records) with zero data loss
• Implemented real-time streaming pipelines handling 100k+ events/second with sub-second latency
• Built comprehensive data quality frameworks reducing production issues by 95%
• Mentored 15+ team members on modern data engineering best practices and tools

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated: ${new Date().toLocaleDateString()}
Portfolio: http://localhost:8000
`;

  const element = document.createElement('a');
  const file = new Blob([resumeContent], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = 'Sreekara_Rao_Data_Engineer_Resume.txt';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function initializeResumeDownload() {
  const downloadBtn = document.getElementById('downloadResumeBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadResume);
  }
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================
function attachPageEventListeners() {
  prevBtn.addEventListener('click', prevPage);
  nextBtn.addEventListener('click', nextPage);

  const page1NextBtn = document.getElementById('page1NextBtn');
  if (page1NextBtn) {
    page1NextBtn.addEventListener('click', nextPage);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextPage();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevPage();
    }
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', init);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
