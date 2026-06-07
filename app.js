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
  initializePageNavigation();
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
  // Download the actual PDF resume bundled with the site
  const element = document.createElement('a');
  element.href = 'Sreekara_Rao_Karanam_Resume.pdf';
  element.download = 'Sreekara_Rao_Karanam_Resume.pdf';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function initializeResumeDownload() {
  const downloadBtn = document.getElementById('downloadResumeBtn');
  const downloadBtnHome = document.getElementById('downloadResumeBtnHome');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadResume);
  }
  if (downloadBtnHome) {
    downloadBtnHome.addEventListener('click', downloadResume);
  }
}

function initializePageNavigation() {
  const pageNavBtns = document.querySelectorAll('.page-nav-btn');
  pageNavBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pageNum = parseInt(e.target.dataset.page);
      showPage(pageNum);
    });
  });
}

function initializeHomeActions() {
  const quickChatBtn = document.getElementById('quickChatBtn');
  if (quickChatBtn) {
    quickChatBtn.addEventListener('click', () => {
      const chatToggle = document.getElementById('chatToggle');
      if (chatToggle) {
        chatToggle.click();
      }
    });
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
