// --- MOBILE MENU TOGGLE ---
const navLinks = document.getElementById("nav-links");
const menuIcon = document.getElementById("menu-icon");
let isMenuOpen = false;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    navLinks.classList.add("active");
    menuIcon.classList.remove("ph-list");
    menuIcon.classList.add("ph-x");
  } else {
    navLinks.classList.remove("active");
    menuIcon.classList.remove("ph-x");
    menuIcon.classList.add("ph-list");
  }
}

// --- 1. AUDIO AUTOPLAY & VISUALIZER ---
const audioBtn = document.getElementById("audio-btn");
const audio = document.getElementById("bg-music");
let isPlaying = false;

let audioContext, analyser, source, dataArray;

function setupAudioContext() {
  if (audioContext) return;
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioContext.createAnalyser();
  source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 64;
  dataArray = new Uint8Array(analyser.frequencyBinCount);
}

function updateUIPlaying() {
  audioBtn.classList.add("playing");
  // Switch icon to playing state (disc)
  audioBtn.querySelector("i").className = "ph ph-light ph-disc";
  audioBtn.querySelector("span").textContent = "Vibing...";
  isPlaying = true;
  setupAudioContext();
}

window.addEventListener("load", () => {
  audio.volume = 0.3;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise
      .then((_) => {
        updateUIPlaying();
      })
      .catch(() => {
        // Fallback: Wait for interaction
        document.addEventListener(
          "click",
          () => {
            if (!isPlaying) {
              audio.play();
              updateUIPlaying();
              if (audioContext && audioContext.state === "suspended")
                audioContext.resume();
            }
          },
          { once: true }
        );
      });
  }
});

audioBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (isPlaying) {
    audio.pause();
    audioBtn.classList.remove("playing");
    // Switch back to note icon
    audioBtn.querySelector("i").className = "ph ph-light ph-music-note";
    audioBtn.querySelector("span").textContent = "Lofi Mode";
  } else {
    audio.play();
    updateUIPlaying();
    if (audioContext && audioContext.state === "suspended")
      audioContext.resume();
  }
  isPlaying = !isPlaying;
});

// --- 2. MUSIC-REACTIVE PARTICLES (JITTER + SCALE + SPEED) ---
const canvas = document.getElementById("network-canvas");
const ctx = canvas.getContext("2d");
let particlesArray;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

class Particle {
  constructor(x, y, dx, dy, size) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.baseSize = size;
    this.size = size;
  }
  draw(scale) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * scale, 0, Math.PI * 2);
    ctx.fillStyle = "#006239";
    ctx.fill();
  }
  update(frequencyData) {
    if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
    if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

    let speedScale = 1;
    let sizeScale = 1.5;
    let jitterX = 0;
    let jitterY = 0;

    if (frequencyData) {
      const average =
        frequencyData.reduce((a, b) => a + b) / frequencyData.length;
      const intensity = average / 255;

      // Speed Up on Beat
      speedScale = 1 + intensity * 8;

      // Shrink on Beat (Small when loud)
      sizeScale = 1.5 - intensity;

      // JITTER LOGIC: Shake particles when beat hits
      if (intensity > 0.2) {
        const jitterAmount = intensity * 8;
        jitterX = (Math.random() - 0.5) * jitterAmount;
        jitterY = (Math.random() - 0.5) * jitterAmount;
      }
    }

    this.x += this.dx * speedScale + jitterX;
    this.y += this.dy * speedScale + jitterY;

    this.draw(sizeScale);
  }
}

function init() {
  particlesArray = [];
  const count = (canvas.width * canvas.height) / 15000;
  for (let i = 0; i < count; i++) {
    let size = Math.random() * 2 + 1;
    let x = Math.random() * (innerWidth - size * 2) + size;
    let y = Math.random() * (innerHeight - size * 2) + size;
    let dx = Math.random() * 0.4 - 0.2;
    let dy = Math.random() * 0.4 - 0.2;
    particlesArray.push(new Particle(x, y, dx, dy, size));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  if (analyser && isPlaying) {
    analyser.getByteFrequencyData(dataArray);
  } else {
    dataArray = null;
  }

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update(dataArray);
  }
}
window.addEventListener("resize", () => {
  resizeCanvas();
  init();
});
init();
animate();

// --- 3. TYPING ANIMATION ---
const textElement = document.getElementById("typing-text");
const phrases = ["Data Pipelines", "Scalable Systems", "Cloud Architecture"];
let phraseIdx = 0,
  charIdx = 0,
  isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIdx];
  if (isDeleting) {
    textElement.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
  } else {
    textElement.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
  }
  if (!isDeleting && charIdx === currentPhrase.length) {
    isDeleting = true;
    setTimeout(type, 2000);
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}
type();

// --- 4. CUBICAL SKILLS ENGINE ---
document.querySelectorAll(".skill-item").forEach((item) => {
  const track = item.querySelector(".cube-track");
  const level = parseInt(item.getAttribute("data-level"));
  for (let i = 1; i <= 10; i++) {
    const cube = document.createElement("div");
    cube.classList.add("cube");
    if (i <= level) cube.classList.add("should-fill");
    track.appendChild(cube);
  }
});
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cubes = entry.target.querySelectorAll(".cube.should-fill");
        cubes.forEach((cube, index) => {
          setTimeout(() => {
            cube.classList.add("active");
            setTimeout(() => cube.classList.add("settled"), 300);
          }, index * 100);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document
  .querySelectorAll(".skill-item")
  .forEach((el) => skillObserver.observe(el));

// --- 5. TABS ---
window.openTab = function (evt, tabName) {
  const tabContent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].classList.remove("active");
  }
  const tabBtn = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabBtn.length; i++) {
    tabBtn[i].classList.remove("active");
  }
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
};

// --- 6. TILT ---
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const rotateX =
      ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -5;
    const rotateY =
      ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
  });
});

// --- 7. FADE ---
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".fade-up").forEach((el) => fadeObserver.observe(el));

// --- 8. EMAIL ---
function sendMailObfuscated(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const recipient = atob("a2FtYXRlYWxpZjFAZ21haWwuY29t");
  window.location.href = `mailto:${recipient}?subject=Portfolio Inquiry from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
}
