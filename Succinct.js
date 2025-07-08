document.addEventListener("DOMContentLoaded", () => {
  // === Yazı yağmuru ===
  const bgCanvas = document.getElementById("backgroundTextCanvas");
  const bgCtx = bgCanvas.getContext("2d");
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;

  const words = ["Succinct", "$Prove"];
  const drops = Array(Math.floor(bgCanvas.width / 20)).fill(0);

  function drawBackgroundText() {
    bgCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
    bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgCtx.fillStyle = "#ff69b4";
    bgCtx.font = "16px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = words[Math.floor(Math.random() * words.length)];
      bgCtx.fillText(text, i * 20, drops[i] * 20);
      if (drops[i] * 20 > bgCanvas.height || Math.random() > 0.95) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    requestAnimationFrame(drawBackgroundText);
  }

  drawBackgroundText();

  // === Çark kodları ===
  const canvas = document.getElementById("wheelCanvas");
  const ctx = canvas.getContext("2d");
  const spinButton = document.getElementById("spinButton");
  const overlay = document.getElementById("overlay");
  const winnerImage = document.getElementById("winnerImage");

  const images = [
    "Advaith.jpg", "Chase.jpg", "chris.jpg", "Claudia Yin.jpg", "crashout.png",
    "CryptoMeii.jpg", "Ernesto Ramirez.jpg", "fakedev9999.jpg", "Justin T. Chen.jpg",
    "pix.jpg", "Plastique.jpg", "pusel.jpg", "Uma Roy.jpg"
  ];

  const numSegments = images.length;
  const anglePerSegment = (2 * Math.PI) / numSegments;
  let currentRotation = 0;

  function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numSegments; i++) {
      const startAngle = currentRotation + i * anglePerSegment;
      const endAngle = startAngle + anglePerSegment;

      ctx.beginPath();
      ctx.moveTo(250, 250);
      ctx.arc(250, 250, 240, startAngle, endAngle);
      ctx.fillStyle = `hsl(${(i * 360) / numSegments}, 100%, 60%)`;
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(250, 250);
      ctx.rotate(startAngle + anglePerSegment / 2);
      ctx.fillStyle = "#fff";
      ctx.font = "13px Arial";
      ctx.textAlign = "right";
      ctx.fillText(images[i].replace(/\.(jpg|png)/, ""), 230, 5);
      ctx.restore();
    }
  }

  function spinWheel() {
    const targetRotation = Math.random() * 360 + 1440;
    const duration = 6000; // daha yavaş
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const angle = (targetRotation * ease * Math.PI) / 180;
      currentRotation = angle;

      drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        const finalAngle = currentRotation % (2 * Math.PI);
        const index = Math.floor((numSegments - (finalAngle / anglePerSegment)) % numSegments);
        showWinner(images[index]);
      }
    }

    requestAnimationFrame(animate);
  }

  function showWinner(imageFile) {
    winnerImage.src = imageFile;
    overlay.classList.add("show");
    setTimeout(() => {
      overlay.classList.remove("show");
    }, 4000);
  }

  drawWheel();
  spinButton.addEventListener("click", spinWheel);
});
// Müzik başlatıcı: bazı tarayıcılar autoplay için etkileşim ister
document.addEventListener("click", () => {
  const music = document.getElementById("bgMusic");
  if (music && music.paused) {
    music.play().catch(err => console.log("Autoplay engellendi"));
  }
}, { once: true });
