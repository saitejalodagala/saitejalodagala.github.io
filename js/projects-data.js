/**
 * projects-data.js
 * Comprehensive portfolio dataset for Sai Teja Lodagala
 * Systems & Control Engineering, IIT Bombay
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Sai Teja Lodagala",
    title: "M.Tech in Systems & Control Engineering, IIT Bombay",
    subtitle: "B.Tech in Electronics & Communication Engineering (ANITS)",
    bio: "Systems & Control engineering graduate student at IIT Bombay with strong expertise in Model Predictive Control (MPPI / MPC), Non-linear Dynamic Systems, Robotics, Deep Learning, Digital Signal Processing, and Autonomous Software Platforms. Experienced in bridging rigorous mathematical physics with high-performance production code.",
    location: "IIT Bombay, Mumbai, India",
    email: "saiteja9875@gmail.com",
    github: "https://github.com/saitejalodagala",
    linkedin: "https://www.linkedin.com/in/saitejalodagala/",
    avatar: "assets/profile.webp",
    statusBadge: "M.Tech Candidate @ IIT Bombay (2025–2027)",
    stats: [
      { label: "Institution", value: "IIT Bombay" },
      { label: "Specialization", value: "Systems & Control" },
      { label: "Public Repos", value: "12+ Projects" },
      { label: "Core Domains", value: "Control • Robotics • AI • DSP" }
    ]
  },

  education: [
    {
      degree: "M.Tech in Systems & Control Engineering",
      institution: "Indian Institute of Technology Bombay (IIT Bombay)",
      period: "2025 – 2027",
      status: "Post Graduation",
      highlights: [
        "Specialization in Systems & Control Engineering with research in Intelligent Audio Quality Optimization under Prof. Raj Anguluri.",
        "Focus on Model Predictive Control, Optimal Control, Machine Learning, Digital Signal Processing, and Non-linear Dynamics."
      ]
    },
    {
      degree: "B.Tech in Electronics & Communication Engineering (ECE)",
      institution: "Anil Neerukonda Institute of Technology and Sciences (ANITS), Andhra University",
      period: "2019 – 2023",
      status: "Graduation",
      highlights: [
        "Core training in Signals & Systems, Control Systems, Digital Communication, and Microprocessors.",
        "Capstone Project: Farm Monitoring & IoT Crop Health Anomaly Detection System using CNNs."
      ]
    }
  ],

  skills: {
    categories: [
      {
        name: "Systems & Control Theory",
        icon: "cpu",
        skills: ["Model Predictive Control (MPPI / MPC)", "Optimal Control (LQR / LQG)", "Pacejka Tire Dynamics", "Hybrid Zero Dynamics (HZD)", "ZMP Preview Control", "State Estimation / Kalman Filter", "Nonlinear Modeling", "Simulink & Simscape"]
      },
      {
        name: "Machine Learning & AI",
        icon: "brain",
        skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Physics-Informed ML", "Complex UNet", "NLP & Transformers", "Adversarial Robustness", "FastAPI"]
      },
      {
        name: "Languages & Tools",
        icon: "terminal",
        skills: ["Python", "MATLAB", "C / C++", "HTML / CSS", "JavaScript", "SQL", "Git", "Docker", "Kubernetes", "Linux", "CUDA"]
      }
    ]
  },

  extracurriculars: [
    {
      title: "1st Prize — Pool Institute Hostel General Championship",
      institution: "IIT Bombay",
      description: "Demonstrated exceptional strategic gameplay and consistent performance under pressure against top-tier collegiate participants."
    },
    {
      title: "2nd Place — Cricket Hostel 6 General Championship",
      institution: "IIT Bombay",
      description: "Actively contributed to the team's tactical success and fostered collaborative athletic excellence."
    }
  ],

  hobbies: [
    { name: "Playing Pool", icon: "disc" },
    { name: "Squash", icon: "activity" },
    { name: "Chess", icon: "shield" },
    { name: "Painting", icon: "palette" }
  ],

  projects: [
    // 1. Swar Studio (M.Tech Research at IIT Bombay - FIRST PROJECT)
    {
      id: "swar-studio",
      title: "Swar Studio (Intelligent Audio Quality Optimization Platform)",
      category: "mtech",
      guide: "Prof. Raj Anguluri",
      period: "Jan'26 – Present",
      type: "M.Tech Project & Seminar",
      badge: "⭐ M.Tech Research (IIT Bombay)",
      tagline: "Real-Time Neural Denoising, 4-Stem Separation & Hearing-Inspired Psychoacoustics",
      description: "An intelligent audio quality optimization and multi-stem mastering platform designed at IIT Bombay under the supervision of Prof. Raj Anguluri. Employs Complex Spectrogram UNet architectures, psychoacoustic masking, and cloud-native microservices.",
      github: "https://github.com/saitejalodagala/swar-studio",
      tags: ["Python", "PyTorch", "FastAPI", "Docker", "Kubernetes", "CUDA", "DSP"],
      bullets: [
        "Engineered a real-time neural audio denoising and 4-stem source separation platform utilizing Complex Spectrogram UNet architectures, achieving processing latency under 20 milliseconds.",
        "Implemented dynamic audio mastering protocols integrating hearing-inspired psychoacoustic ISO 226 contours for artifact-free and perfectly normalized broadcast-quality loudness.",
        "Architected high-throughput cloud-native REST and WebSocket API endpoints using FastAPI and Kubernetes, facilitating highly scalable live-stream audio processing."
      ],
      math: `
\\mathcal{L}_{\\text{audio}} = \\underbrace{\\| |S_{\\text{clean}}| - |\\hat{S}| \\|_1}_{\\text{Magnitude Loss}} + \\underbrace{\\| S_{\\text{clean}} - \\hat{S} \\|_1}_{\\text{Complex STFT Phase Loss}} + \\lambda \\cdot \\text{SI-SDR}(s, \\hat{s})
      `
    },

    // 2. Autonomous Vehicle ML-MPC & MPPI
    {
      id: "autonomous-vehicle-ml-mpc",
      title: "Autonomous Vehicle ML-MPC & MPPI Framework",
      category: "control",
      guide: "Self Project",
      period: "2025",
      type: "Control & Robotics",
      badge: "Robotics & Control",
      tagline: "Physics-Informed Deep Residual Dynamics & Batch-Vectorized MPPI Control with Pacejka Tire Physics",
      description: "A high-performance autonomous driving control suite combining 6-DOF planar bicycle dynamics, Pacejka 'Magic Formula' non-linear tire saturation, Runge-Kutta 4th order numerical integration, and GPU/CPU batch-vectorized Model Predictive Path Integral (MPPI) control evaluating 5,000 candidate trajectories per control cycle.",
      github: "https://github.com/saitejalodagala/autonomous-vehicle-ml-mpc",
      tags: ["Python", "PyTorch", "Optimal Control", "MPPI", "FastAPI", "Pacejka Dynamics"],
      bullets: [
        "Engineered a 6-DOF planar dynamic bicycle model integrating Pacejka Magic Formula tire curves with Runge-Kutta 4th Order (RK4) numerical integration.",
        "Implemented batch-vectorized MPPI controller in PyTorch evaluating 5,000 candidate trajectories per control cycle with non-convex obstacle repulsion fields.",
        "Designed Deep Residual MLPs with LayerNorm and GELU to dynamically compensate for unmodeled aerodynamic drag and surface friction variations."
      ],
      math: `
\\begin{aligned}
\\dot{v}_x &= \\frac{F_{x,f} \\cos\\delta - F_{y,f} \\sin\\delta + F_{x,r}}{m} + v_y r + f_{\\text{ML,res}}^{(x)} \\\\
\\dot{v}_y &= \\frac{F_{x,f} \\sin\\delta + F_{y,f} \\cos\\delta + F_{y,r}}{m} - v_x r + f_{\\text{ML,res}}^{(y)} \\\\
\\dot{r} &= \\frac{a (F_{x,f} \\sin\\delta + F_{y,f} \\cos\\delta) - b F_{y,r}}{I_z} + \\tau_{\\text{ML,res}}
\\end{aligned}
      `
    },

    // 3. Bipedal Locomotion Control
    {
      id: "bipedal-locomotion-control",
      title: "Bipedal Locomotion & Humanoid Control Suite",
      category: "control",
      guide: "Self Project",
      period: "2024",
      type: "Robotics & Control",
      badge: "Humanoid Robotics",
      tagline: "5-Link Planar Underactuated Biped (HZD) & 3D LIPM with ZMP Preview Control in Simscape",
      description: "A research-grade humanoid robotics simulation and control suite in MATLAB, Simulink, and Simscape Multibody. Features Euler-Lagrange continuous dynamics, discrete impact reset maps, feedback linearization (Hybrid Zero Dynamics), and 3D Linear Inverted Pendulum Model with ZMP preview control.",
      github: "https://github.com/saitejalodagala/bipedal-locomotion-control",
      tags: ["MATLAB", "Simulink", "Simscape", "Humanoid Robotics", "ZMP Control", "HZD"],
      bullets: [
        "Derived complete 5-link Lagrangian equations of motion with discrete heel-strike impact reset maps and Poincaré limit-cycle stability analysis.",
        "Implemented input-output feedback linearization enforcing virtual constraints (Hybrid Zero Dynamics) for stable, periodic underactuated planar walking.",
        "Developed 3D Linear Inverted Pendulum Model (LIPM) with discrete Riccati ZMP preview control and 12-DOF inverse kinematics in Simscape Multibody."
      ],
      math: `
M(q)\\ddot{q} + C(q, \\dot{q})\\dot{q} + G(q) = B u + J^{\\top}(q) F_{\\text{ext}}, \\quad p_{\\text{zmp}} = x_{\\text{CoM}} - \\frac{z_{\\text{CoM}}}{g} \\ddot{x}_{\\text{CoM}}
      `
    },

    // 4. Inverted Pendulum Control
    {
      id: "inverted_pendulum_control",
      title: "Inverted Pendulum Cart-Pole Control Suite",
      category: "control",
      guide: "Control Systems Project",
      period: "2024",
      type: "Control Systems",
      badge: "Optimal Control",
      tagline: "Nonlinear Lagrangian Modeling, Dual-Loop PID, LQR Optimal Control & LQG Kalman Filter",
      description: "An end-to-end modern control engineering project covering nonlinear dynamics, Taylor linearization, controllability/observability rank checks, LQR with feedforward precompensation, LQG state estimation, and 2D physics animation.",
      github: "https://github.com/saitejalodagala/inverted_pendulum_control",
      tags: ["MATLAB", "Simulink", "LQR", "LQG", "Kalman Filter", "Control Systems"],
      bullets: [
        "Derived first-principles nonlinear equations of motion using Euler-Lagrange mechanics and performed Taylor series Jacobian state-space linearization.",
        "Designed and tuned Dual-Loop Cascaded PID and Linear Quadratic Regulator (LQR) with feedforward tracking for cart regulation and pole stabilization.",
        "Implemented Linear Quadratic Gaussian (LQG) controller integrating a Kalman filter for optimal state estimation under measurement noise."
      ],
      math: `
\\mathbf{A}^\\top \\mathbf{P} + \\mathbf{P}\\mathbf{A} - \\mathbf{P}\\mathbf{B}\\mathbf{R}^{-1}\\mathbf{B}^\\top\\mathbf{P} + \\mathbf{Q} = \\mathbf{0}, \\quad \\mathbf{u}(t) = -\\mathbf{K}\\hat{\\mathbf{x}}(t)
      `
    },

    // 5. V2V Communication & Connected Vehicles
    {
      id: "v2v-communication",
      title: "V2V Communication & Connected Vehicle Platooning",
      category: "control",
      guide: "Networked Control Systems",
      period: "2024",
      type: "Connected Vehicles",
      badge: "Networked Control",
      tagline: "Cooperative Adaptive Cruise Control (CACC), String Stability & Distributed MPC",
      description: "Networked Control Systems (NCS) and Connected Autonomous Vehicle (CAV) framework implementing CACC, L2 string stability analysis, Distributed Model Predictive Control (D-MPC), packet loss latency compensation, and False Data Injection (FDI) cyber-attack resilience.",
      github: "https://github.com/saitejalodagala/v2v-communication",
      tags: ["Python", "Connected Vehicles", "V2V", "CACC", "String Stability", "D-MPC"],
      bullets: [
        "Engineered Cooperative Adaptive Cruise Control (CACC) proving L2 string stability across all frequencies, enabling safe platooning at ultra-tight headways (h = 0.3s).",
        "Implemented Distributed MPC (D-MPC) with state extrapolation algorithms compensating for wireless network transmission latency and packet loss.",
        "Designed a Chi-Square residual anomaly detector to identify and isolate False Data Injection (FDI) cyber-attacks on vehicle telemetry."
      ],
      math: `
\\Gamma(j\\omega) = \\left| \\frac{E_i(j\\omega)}{E_{i-1}(j\\omega)} \\right| \\le 1 \\quad \\forall \\, \\omega \\ge 0 \\implies \\|e_i\\|_{\\mathcal{L}_2} \\le \\|e_{i-1}\\|_{\\mathcal{L}_2}
      `
    },

    // 6. BLDC Motor Speed Control
    {
      id: "bldc-simulink-speed-control",
      title: "BLDC Motor Speed Control with PWM & Hall Commutation",
      category: "control",
      guide: "Power Electronics Project",
      period: "2023",
      type: "Motor Drives",
      badge: "Power Electronics",
      tagline: "6-Step Hall Commutation, 20 kHz PWM Chopping & Closed-Loop Anti-Windup PI Control",
      description: "High-fidelity simulation and control framework for a 3-Phase Brushless DC (BLDC) motor in MATLAB & Simulink. Features trapezoidal back-EMF modeling, 120° Hall effect sector decoding, 3-Phase Inverter gating, and anti-windup speed regulation.",
      github: "https://github.com/saitejalodagala/bldc-simulink-speed-control",
      tags: ["MATLAB", "Simulink", "BLDC Motor", "Power Electronics", "PWM", "PI Controller"],
      bullets: [
        "Modeled 3-phase BLDC stator electrical dynamics and trapezoidal back-EMF with 120° electronic commutation and Hall sensor sector decoding.",
        "Implemented high-side 20 kHz PWM chopping for 3-phase Voltage Source Inverter (VSI) power stage.",
        "Designed a closed-loop PI speed controller equipped with dynamic anti-windup clamping to eliminate integrator saturation under step load disturbances."
      ],
      math: `
V_{\\text{line}} = 2 R_s i_{\\text{active}} + 2 (L_s - M) \\frac{d i_{\\text{active}}}{dt} + (e_+ - e_-), \\quad T_e = \\frac{e_a i_a + e_b i_b + e_c i_c}{\\omega_m}
      `
    },

    // 7. Omni Code
    {
      id: "omni-code",
      title: "Omni Code (AI Code Collaboration Platform)",
      category: "ai",
      guide: "Self Project",
      period: "2025 – Present",
      type: "Key Project",
      badge: "AI Developer Tooling",
      tagline: "Autonomous Engineering Workspace: Distributed Code Management × Living Specs × Cursor AI",
      description: "An autonomous, context-aware engineering workspace that deeply integrates distributed code management and interactive PR reviews with real-time generative LLM intelligence to massively accelerate developer workflows.",
      github: "https://github.com/saitejalodagala/omni-code",
      tags: ["Python", "Cursor AI", "Git", "LLMs", "HTML/CSS", "AST Diagnostics"],
      bullets: [
        "Engineered an autonomous engineering workspace integrating distributed code management and interactive PR reviews with real-time generative LLM intelligence to accelerate developer workflows.",
        "Architected a semantic natural language search engine and context-aware auto-documentation generator, ensuring repository architectures and living specifications remain consistently synchronized.",
        "Developed a one-click visual diff application mechanism leveraging continuous underlying AST diagnostics to instantly deploy LLM-suggested architectural modifications."
      ],
      math: `
\\text{Score}(\\mathbf{q}, \\mathbf{c}_i) = \\frac{\\mathbf{e}_q \\cdot \\mathbf{e}_{c_i}}{\\|\\mathbf{e}_q\\| \\|\\mathbf{e}_{c_i}\\|} + \\alpha \\cdot \\text{AST\\_Proximity}(q, c_i)
      `
    },

    // 8. Fraud Sentinel AI
    {
      id: "fraud-sentinel-ai",
      title: "Fraud Sentinel AI (Dual-Engine Fraud Detection System for Banking)",
      category: "ai",
      guide: "Self Project",
      period: "2025",
      type: "Key Project",
      badge: "FinTech Cybersecurity",
      tagline: "Cross-Channel Threat Fusion: NLP Smishing Detection × Behavioral Transaction Anomaly Scoring",
      description: "A financial cybersecurity platform combining NLP-driven SMS smishing/phishing detection with behavioral bank transaction anomaly scoring to thwart multi-stage social engineering cyberattacks.",
      github: "https://github.com/saitejalodagala/fraud-detection-system",
      tags: ["Python", "FastAPI", "Scikit-learn", "TF-IDF", "Isolation Forest", "Random Forest"],
      bullets: [
        "Designed a robust cross-channel threat fusion engine seamlessly correlating NLP-driven SMS smishing and phishing detection with behavioral bank transaction anomalies.",
        "Deployed a dual machine learning pipeline combining Isolation Forest and Random Forest algorithms, executing automated account quarantines based on real-time risk thresholds.",
        "Constructed an interactive Streamlit SOC dashboard continuously streaming live telemetry and behavioral baselines to visually simulate kill-chain events."
      ],
      math: `
\\mathcal{S}_{\\text{fused}}(t) = w_{\\text{tx}} \\mathcal{S}_{\\text{tx}} + w_{\\text{sms}} \\mathcal{S}_{\\text{sms}} e^{-\\lambda (t - t_{\\text{sms}})} + \\gamma (\\mathcal{S}_{\\text{tx}} \\mathcal{S}_{\\text{sms}})
      `
    },

    // 9. Adversarial FGSM
    {
      id: "adversarial-fgsm",
      title: "Adversarial Examples in Neural Networks (Reproducing FGSM)",
      category: "ai",
      guide: "Prof. Abir De",
      period: "Course Project",
      type: "Course Project",
      badge: "Deep Learning Research",
      tagline: "Empirical Reproduction of Goodfellow (ICLR 2015) FGSM, 8 Attack Vectors & Defense Zoo",
      description: "A production-grade research platform dedicated to the empirical study of neural networks, featuring eight adversarial attack vectors and four robust model defense mechanisms under Prof. Abir De.",
      github: "https://github.com/saitejalodagala/Adversarial-Examples-in-Neural-Networks-Reproducing-FGSM",
      tags: ["Python", "PyTorch", "FastAPI", "HTML/CSS", "JavaScript", "Adversarial ML"],
      bullets: [
        "Developed a production-grade research platform dedicated to the empirical study of neural networks, featuring eight sophisticated adversarial attack vectors and four model defenses.",
        "Built an interactive FastAPI web studio equipped with a dynamic real-time drawing canvas, detailed perturbation heatmaps, and responsive 2D loss landscape visualizers.",
        "Achieved an 81.25% robustness gain on the MNIST image dataset by systematically implementing adversarial training and randomized defensive Gaussian smoothing filters."
      ],
      math: `
\\mathbf{x}_{\\text{adv}} = \\mathbf{x} + \\epsilon \\cdot \\operatorname{sign}\\left( \\nabla_{\\mathbf{x}} \\mathcal{L}(\\boldsymbol{\\theta}, \\mathbf{x}, y) \\right)
      `
    },

    // 10. Farm Monitoring System
    {
      id: "farm-monitoring",
      title: "Farm Monitoring System (IoT & CNN Crop Health Analytics)",
      category: "ai",
      guide: "B.Tech Capstone Project",
      period: "2023",
      type: "B.Tech Project",
      badge: "IoT & Computer Vision",
      tagline: "Agricultural Anomaly Detection with Embedded Sensors & CNN Leaf Disease Classification",
      description: "Advanced agricultural anomaly detection system utilizing IoT sensor telemetry and Convolutional Neural Networks on visual leaf data to generate precision farming prescriptions.",
      github: "https://github.com/saitejalodagala",
      tags: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "OpenCV", "IoT"],
      bullets: [
        "Developed an advanced agricultural anomaly detection system utilizing embedded IoT sensors to continuously track environmental shifts in soil moisture and pH with real-time alerts.",
        "Classified complex crop health conditions by deploying Convolutional Neural Networks on visual leaf data, subsequently generating precise chemical fertilizer prescriptions."
      ],
      math: `
\\mathcal{L}_{\\text{CE}} = -\\sum_{c=1}^{M} y_{o,c} \\ln(p_{o,c})
      `
    },

    // 11. Twitter Sentiment Analysis
    {
      id: "twitter-sentiment",
      title: "Twitter Sentiment Analysis using NLP",
      category: "software",
      guide: "Self Project",
      period: "2024",
      type: "Mini Project",
      badge: "NLP & Machine Learning",
      tagline: "End-to-End NLP Pipeline with TF-IDF N-Grams, Calibrated Classifiers & Streamlit Dashboard",
      description: "End-to-end natural language processing pipeline featuring regex text normalization, emoji translation, TF-IDF vectorization, and interactive Streamlit analytics.",
      github: "https://github.com/saitejalodagala/twitter-sentiment-analysis",
      tags: ["Python", "Scikit-learn", "TF-IDF", "Logistic Regression", "Streamlit", "Pytest"],
      bullets: [
        "Engineered an end-to-end NLP pipeline with regex text normalization, automatic hashtag segmentation, and emoji translation to heavily optimize social media text for sentiment classification.",
        "Trained mathematically calibrated, L2-regularized Logistic Regression and Multinomial Naive Bayes models on sparse TF-IDF vectors, consistently achieving over 94% test accuracy.",
        "Deployed an interactive Streamlit web dashboard facilitating real-time inference, token-level sentiment highlights, and batch CSV processing with Plotly visualizations."
      ],
      math: `
\\text{TF-IDF}(t, d, D) = \\text{TF}(t, d) \\times \\ln\\left( \\frac{1 + |D|}{1 + |\\{d \\in D : t \\in d\\}|} \\right) + 1
      `
    },

    // 12. Tic-Tac-Toe
    {
      id: "tic-tac-toe",
      title: "Adversarial Minimax Game Engine (Tic-Tac-Toe)",
      category: "software",
      guide: "Self Project",
      period: "2024",
      type: "Mini Project",
      badge: "Game AI & Algorithms",
      tagline: "Unbeatable Adversarial Search with Alpha-Beta Pruning, Pygame GUI & Console Engine",
      description: "Artificial intelligence game engine using recursive Minimax adversarial search with Alpha-Beta pruning, accompanied by a Pygame GUI and comprehensive game-theoretic automated test suite.",
      github: "https://github.com/saitejalodagala/tic-tac-toe",
      tags: ["Python", "Pygame", "Minimax Algorithm", "Alpha-Beta Pruning", "Unit Testing"],
      bullets: [
        "Developed an unbeatable artificial intelligence engine utilizing recursive Minimax adversarial search with Alpha-Beta pruning to guarantee instantaneous optimal moves.",
        "Designed a versatile dual-interface architecture featuring a modern, responsive Pygame GUI alongside a lightweight, pure Python interactive terminal console.",
        "Built a comprehensively designed automated test suite specifically to validate complex board states and underlying game-theoretic optimality proofs."
      ],
      math: `
V(s) = \\max_{a \\in A(s)} \\left( \\min_{a' \\in A(s')} V(s'') \\right)
      `
    }
  ]
};
