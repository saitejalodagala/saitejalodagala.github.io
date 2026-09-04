# Sai Teja Lodagala — Portfolio Website

> **Systems & Control Engineering, Indian Institute of Technology Bombay (IIT Bombay)**  
> *Model Predictive Control (MPPI) • Robotics & Humanoid Control • Machine Learning • Audio DSP*

---

## 🌟 Profile Overview

Portfolio website for **Sai Teja Lodagala**, M.Tech Candidate at **IIT Bombay** (2025–2027) and B.Tech graduate in Electronics & Communication Engineering from **ANITS, Andhra University**.

### 🎓 Academic Background
- **M.Tech in Systems & Control Engineering** — Indian Institute of Technology Bombay (2025–2027)
- **B.Tech in Electronics & Communication Engineering** — ANITS, Andhra University (2019–2023)

---

## 🚀 Projects & Research Portfolio

### 🎮 Systems, Control & Robotics
1. **Autonomous Vehicle ML-MPC & MPPI Framework**  
   - 6-DOF dynamic bicycle model with Pacejka Magic Formula non-linear tire curves and RK4 numerical integration.  
   - Batch-vectorized MPPI controller in PyTorch evaluating 5,000 candidate trajectories per cycle on GPU/CPU.  
   - Physics-informed Deep Residual MLPs compensating for unmodeled aerodynamic drag and surface friction.

2. **Bipedal Locomotion & Humanoid Control Suite**  
   - Complete 5-link planar biped with continuous Euler-Lagrange equations, discrete heel-strike impact maps, and Hybrid Zero Dynamics (HZD).  
   - 3D Linear Inverted Pendulum Model (LIPM) locomotion with Zero Moment Point (ZMP) preview control and Riccati solver.  
   - High-fidelity Simscape Multibody 3D physical modeling with contact penalty mechanics.

3. **Inverted Pendulum Cart-Pole Control Suite**  
   - Nonlinear Lagrangian dynamics modeling and Taylor series Jacobian state-space linearization.  
   - Dual-Loop Cascaded PID and Linear Quadratic Regulator (LQR) with feedforward tracking for cart-pole balancing.  
   - Linear Quadratic Gaussian (LQG) controller integrating Kalman filter optimal state estimation.

4. **V2V Communication & Connected Vehicle Platooning**  
   - Cooperative Adaptive Cruise Control (CACC) achieving $\mathcal{L}_2$ string stability at ultra-tight time headways ($h = 0.3\,\text{s}$).  
   - Distributed Model Predictive Control (D-MPC) with state extrapolation compensating for transmission latency and packet loss.  
   - Chi-Square residual anomaly detector resilient against False Data Injection (FDI) cyber-attacks.

5. **BLDC Motor Speed Control with PWM & Hall Commutation**  
   - 3-Phase Brushless DC motor closed-loop speed regulation using 120° Hall effect sector decoding and 20 kHz PWM chopping.  
   - Dynamic anti-windup PI controller eliminating integrator saturation under step load disturbances.

### 🎧 Audio & Digital Signal Processing
6. **Swar Studio (Intelligent Audio Quality Optimization Platform)** | *Prof. Raj Anguluri*  
   - Real-time neural audio denoising and 4-stem source separation using Complex Spectrogram UNet (< 20 ms latency).  
   - Dynamic audio mastering protocols integrating psychoacoustic ISO 226 contours for artifact-free broadcast loudness.  
   - Cloud-native REST and WebSocket API endpoints using FastAPI and Kubernetes.

### 🤖 AI, Machine Learning & Autonomous Systems
7. **Omni Code (AI Code Collaboration Platform)**  
   - Autonomous engineering workspace integrating distributed code management and interactive PR reviews with generative LLM intelligence.  
   - Semantic natural language search engine and context-aware auto-documentation generator for living specifications.  
   - One-click visual diff application mechanism leveraging continuous AST diagnostics.

8. **Fraud Sentinel AI (Dual-Engine Fraud Detection for Banking)**  
   - Cross-channel threat fusion engine correlating NLP-driven SMS smishing detection with banking transaction anomalies.  
   - Dual ML pipeline combining Isolation Forest and Random Forest algorithms with automated account quarantines.  
   - Interactive Streamlit SOC dashboard continuously streaming live telemetry and behavioral baselines.

9. **Adversarial Examples in Neural Networks (FGSM)** | *Prof. Abir De*  
   - Production research platform benchmarking 8 attack vectors and 4 model defenses.  
   - Interactive FastAPI web studio with real-time drawing canvas and 2D loss landscape visualizers.  
   - 81.25% robustness gain on MNIST dataset via adversarial training and defensive Gaussian smoothing filters.

10. **Farm Monitoring System (IoT & CNN Crop Health Analytics)**  
    - Agricultural anomaly detection system with embedded IoT sensors tracking soil moisture and pH in real time.  
    - Convolutional Neural Networks on visual leaf data generating precision chemical fertilizer prescriptions.

11. **Twitter Sentiment Analysis using NLP**  
    - End-to-end NLP pipeline with regex text normalization, automatic hashtag segmentation, and emoji translation.  
    - Calibrated Logistic Regression and Naive Bayes models achieving over 94% test accuracy.

12. **Adversarial Minimax Game Engine (Tic-Tac-Toe)**  
    - Unbeatable AI utilizing recursive Minimax adversarial search with Alpha-Beta pruning.  
    - Dual-interface architecture featuring Pygame GUI alongside a lightweight interactive terminal console.

---

## 🛠️ Technical Skills Matrix

- **Systems & Control**: Model Predictive Control (MPPI / MPC), Optimal Control (LQR / LQG), Pacejka Tire Dynamics, Hybrid Zero Dynamics (HZD), ZMP Preview Control, Kalman Filter, Simulink & Simscape
- **ML & AI**: PyTorch, TensorFlow, Scikit-learn, Physics-Informed ML, Complex UNet, NLP, FastAPI, Pandas, NumPy, OpenCV
- **Languages & Tools**: Python, MATLAB, C/C++, HTML/CSS, JavaScript, SQL, Git, Docker, Kubernetes, Linux, CUDA

---

## 🏆 Extracurriculars & Hobbies

- **1st Prize** — Pool Institute Hostel General Championship, IIT Bombay
- **2nd Place** — Cricket Hostel 6 General Championship, IIT Bombay
- **Hobbies**: Playing Pool, Squash, Chess, Painting

---

## 💻 Running Locally

```bash
# Navigate to portfolio directory
cd saiteja-portfolio

# Start the local server
python serve.py 3000
```
Open **`http://localhost:3000`** in your browser, or double click **`index.html`** directly.

---

## 📬 Contact

- **Email**: [saiteja9875@gmail.com](mailto:saiteja9875@gmail.com)
- **LinkedIn**: [linkedin.com/in/saitejalodagala](https://www.linkedin.com/in/saitejalodagala/)
- **GitHub**: [github.com/saitejalodagala](https://github.com/saitejalodagala)
