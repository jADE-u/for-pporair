// ========================================
// ค่าหลักของเว็บ
// ========================================

const SECRET_PASSWORD = "010668";

const screens = document.querySelectorAll(".screen");
const progressHearts = document.querySelectorAll(".progress-heart");

let currentScreen = 0;


// ========================================
// เปลี่ยนหน้า
// ========================================

function showScreen(index) {
  screens.forEach((screen, i) => {
    const isActive = i === index;

    screen.hidden = !isActive;
    screen.classList.toggle("active", isActive);
  });

  currentScreen = index;

  progressHearts.forEach((heart, i) => {
    if (i <= index) {
      heart.textContent = "💜";
      heart.classList.add("active");
    } else {
      heart.textContent = "♡";
      heart.classList.remove("active");
    }
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ========================================
// เพลง
// ========================================

const loveSong = document.getElementById("loveSong");
const musicBtn = document.getElementById("musicBtn");

loveSong.volume = 0.45;

function updateMusicButton() {
  if (loveSong.paused) {
    musicBtn.textContent = "🎵";
    musicBtn.setAttribute("aria-label", "เปิดเพลง");
  } else {
    musicBtn.textContent = "⏸️";
    musicBtn.setAttribute("aria-label", "หยุดเพลง");
  }
}

async function playMusic() {
  try {
    await loveSong.play();
    updateMusicButton();
  } catch (error) {
    console.log("เบราว์เซอร์ยังไม่อนุญาตให้เปิดเพลงอัตโนมัติ");
  }
}

musicBtn.addEventListener("click", async () => {
  if (loveSong.paused) {
    await playMusic();
  } else {
    loveSong.pause();
    updateMusicButton();
  }
});


// ========================================
// หน้า 1 : รหัสลับ
// ========================================

const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("password");
const passwordMessage = document.getElementById("passwordMessage");

passwordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === SECRET_PASSWORD) {
    passwordMessage.textContent = "เก่งมากก จำได้ด้วยย 💜";
    passwordMessage.style.color = "#55b99a";

    createHeartBurst(
      window.innerWidth / 2,
      window.innerHeight / 2,
      25
    );

    await playMusic();

    setTimeout(() => {
      showScreen(1);
    }, 1000);

  } else {
    passwordMessage.textContent =
      "รหัสยังไม่ถูกน้าา ลองคิดดี ๆ 🤭";

    passwordMessage.style.color = "#9b78e8";

    passwordInput.value = "";
    passwordInput.focus();
  }
});


// ========================================
// หน้า 2 : เปิดซองจดหมาย
// ========================================

const openEnvelopeBtn =
  document.getElementById("openEnvelopeBtn");

openEnvelopeBtn.addEventListener("click", () => {

  const envelope =
    openEnvelopeBtn.querySelector(".envelope");

  envelope.classList.add("opening");

  createHeartBurst(
    window.innerWidth / 2,
    window.innerHeight / 2,
    35
  );

  setTimeout(() => {
    showScreen(2);

    envelope.classList.remove("opening");
  }, 750);

});

// ========================================
// หน้า 3 : Welcome
// ========================================

const startStoryBtn =
  document.getElementById("startStoryBtn");

startStoryBtn.addEventListener("click", () => {
  showScreen(3);
});


// ========================================
// หน้า 4 : Our Journey
// ========================================

const journeyTrack =
  document.getElementById("journeyTrack");

const journeyPrev =
  document.getElementById("journeyPrev");

const journeyNext =
  document.getElementById("journeyNext");

const finishJourneyBtn =
  document.getElementById("finishJourneyBtn");


// ตอนแรกยังไม่ให้ข้าม
finishJourneyBtn.disabled = true;
finishJourneyBtn.textContent =
  "เลื่อนดูให้ครบ 15 เดือนก่อน 💜";

finishJourneyBtn.style.opacity = "0.55";
finishJourneyBtn.style.cursor = "not-allowed";


function getJourneyScrollAmount() {
  const firstCard =
    journeyTrack.querySelector(".month-card");

  if (!firstCard) {
    return 300;
  }

  return firstCard.offsetWidth + 22;
}


journeyNext.addEventListener("click", () => {
  journeyTrack.scrollBy({
    left: getJourneyScrollAmount(),
    behavior: "smooth"
  });
});


journeyPrev.addEventListener("click", () => {
  journeyTrack.scrollBy({
    left: -getJourneyScrollAmount(),
    behavior: "smooth"
  });
});


// ต้องเลื่อนถึงเดือนสุดท้ายก่อน
journeyTrack.addEventListener("scroll", () => {
  const endPosition =
    journeyTrack.scrollWidth -
    journeyTrack.clientWidth;

  const currentPosition =
    journeyTrack.scrollLeft;

  if (currentPosition >= endPosition - 40) {
    finishJourneyBtn.disabled = false;

    finishJourneyBtn.textContent =
      "ไปต่อ 💜";

    finishJourneyBtn.style.opacity = "1";
    finishJourneyBtn.style.cursor = "pointer";
  }
});


finishJourneyBtn.addEventListener("click", () => {
  if (finishJourneyBtn.disabled) {
    return;
  }

  showScreen(4);
});


// ========================================
// กดรูปใน Our Journey แล้วขยาย
// ========================================

const monthCards =
  document.querySelectorAll(".month-card");

const photoModal =
  document.getElementById("photoModal");

const modalImage =
  document.getElementById("modalImage");

const modalMonth =
  document.getElementById("modalMonth");

const modalLocation =
  document.getElementById("modalLocation");

const modalText =
  document.getElementById("modalText");

const closePhotoModal =
  document.getElementById("closePhotoModal");


monthCards.forEach((card) => {
  const image =
    card.querySelector("img");

  image.addEventListener("click", () => {
    const month =
      card.querySelector(".month-name");

    const location =
      card.querySelector(".month-location");

    const text =
      card.querySelector(".month-text");

    modalImage.src = image.src;
    modalImage.alt = image.alt;

    modalMonth.textContent =
      month.textContent;

    modalLocation.textContent =
      location.textContent;

    modalText.textContent =
      text.textContent;

    photoModal.hidden = false;

    document.body.style.overflow = "hidden";
  });
});


function closeModal() {
  photoModal.hidden = true;

  document.body.style.overflow = "";
}


closePhotoModal.addEventListener(
  "click",
  closeModal
);


photoModal.addEventListener("click", (event) => {
  if (event.target === photoModal) {
    closeModal();
  }
});


document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    !photoModal.hidden
  ) {
    closeModal();
  }
});


// ========================================
// หน้า 5 : Love Counter
// เริ่มคบ 1 มิถุนายน 2025
// ========================================

const daysTogether =
  document.getElementById("daysTogether");

const hoursTogether =
  document.getElementById("hoursTogether");

const minutesTogether =
  document.getElementById("minutesTogether");

const secondsTogether =
  document.getElementById("secondsTogether");


// เดือนใน JavaScript เริ่มจาก 0
// June = 5
const relationshipStart =
  new Date(2025, 5, 1, 0, 0, 0);


function updateLoveCounter() {
  const now = new Date();

  let difference =
    now.getTime() -
    relationshipStart.getTime();

  if (difference < 0) {
    difference = 0;
  }

  const totalSeconds =
    Math.floor(difference / 1000);

  const days =
    Math.floor(
      totalSeconds / 86400
    );

  const hours =
    Math.floor(
      (totalSeconds % 86400) / 3600
    );

  const minutes =
    Math.floor(
      (totalSeconds % 3600) / 60
    );

  const seconds =
    totalSeconds % 60;

  daysTogether.textContent =
    days.toLocaleString("th-TH");

  hoursTogether.textContent =
    String(hours).padStart(2, "0");

  minutesTogether.textContent =
    String(minutes).padStart(2, "0");

  secondsTogether.textContent =
    String(seconds).padStart(2, "0");
}


updateLoveCounter();

setInterval(
  updateLoveCounter,
  1000
);


const counterNextBtn =
  document.getElementById("counterNextBtn");

counterNextBtn.addEventListener("click", () => {
  showScreen(5);
});


// ========================================
// หน้า 6 : Quiz
// ========================================

const quizForm =
  document.getElementById("quizForm");

const quizResult =
  document.getElementById("quizResult");


quizForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const q1 =
    quizForm.querySelector(
      'input[name="q1"]:checked'
    );

  const q2 =
    quizForm.querySelector(
      'input[name="q2"]:checked'
    );

  const q3 =
    quizForm.querySelector(
      'input[name="q3"]:checked'
    );


  if (!q1 || !q2 || !q3) {
    quizResult.textContent =
      "ตอบให้ครบทั้ง 3 ข้อก่อนน้าา 🤭💜";

    quizResult.style.color =
      "#9b78e8";

    return;
  }


  let score = 0;

  if (q1.value === "A") {
    score++;
  }

  if (q2.value === "C") {
    score++;
  }

  if (q3.value === "B") {
    score++;
  }


  if (score === 3) {
    quizResult.textContent =
      "3/3 เก่งมากกก จำเรื่องของเราได้หมดเลย 💜🌿";

    quizResult.style.color =
      "#55b99a";

    createHeartBurst(
      window.innerWidth / 2,
      window.innerHeight / 2,
      30
    );

    setTimeout(() => {
      showScreen(6);
    }, 1400);

  } else {
    quizResult.textContent =
      `ได้ ${score}/3 เองง ลองใหม่อีกทีนะ 🤭`;

    quizResult.style.color =
      "#9b78e8";
  }
});


// ========================================
// หน้า 7 : กล่องของขวัญ
// ========================================

const giftBtn =
  document.getElementById("giftBtn");

const giftMessage =
  document.getElementById("giftMessage");

const giftNextBtn =
  document.getElementById("giftNextBtn");


giftBtn.addEventListener("click", () => {

  giftBtn.classList.add("opened");
  giftBtn.disabled = true;

  const rect = giftBtn.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  createHeartBurst(
    centerX,
    centerY,
    30
  );

  const sparkleIcons = [
    "✨",
    "✦",
    "💜",
    "🌿"
  ];

  for (let i = 0; i < 25; i++) {

    const sparkle = document.createElement("span");

    sparkle.className = "gift-sparkle";

    sparkle.textContent =
      sparkleIcons[
        Math.floor(Math.random() * sparkleIcons.length)
      ];

    sparkle.style.left = centerX + "px";
    sparkle.style.top = centerY + "px";

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 180 + 80;

    sparkle.style.setProperty(
      "--sparkle-x",
      Math.cos(angle) * distance + "px"
    );

    sparkle.style.setProperty(
      "--sparkle-y",
      Math.sin(angle) * distance + "px"
    );

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 1400);
  }

  setTimeout(() => {

    giftBtn.hidden = true;
    giftMessage.hidden = false;

    giftMessage.classList.add(
      "gift-message-pop"
    );

  }, 750);

});



giftNextBtn.addEventListener("click", () => {
  showScreen(7);
});


// ========================================
// หน้า 8 : Love Letter
// ========================================

const letterNextBtn =
  document.getElementById("letterNextBtn");

letterNextBtn.addEventListener("click", () => {
  showScreen(8);
});


// ========================================
// หน้า 9 : Ending
// ========================================

const loveAnswerButtons =
  document.querySelectorAll(".love-answer");


loveAnswerButtons.forEach((button) => {
  button.addEventListener("click", () => {

    createHeartBurst(
      window.innerWidth / 2,
      window.innerHeight / 2,
      60
    );

    button.textContent =
      "รู้อยู่แล้วว่าเธอต้องเลือกอันนี้ 🤭💜";

    loveAnswerButtons.forEach(
      (otherButton) => {

        if (otherButton !== button) {
          otherButton.style.display = "none";
        }

      }
    );
  });
});


// ========================================
// หัวใจลอย
// ========================================

const heartContainer =
  document.getElementById("heartContainer");

const heartSymbols = [
  "💜",
  "🤍",
  "💚",
  "♡",
  "🌿"
];


const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


function createFloatingHeart() {
  if (prefersReducedMotion) {
    return;
  }

  const heart =
    document.createElement("span");

  heart.className =
    "floating-heart";

  heart.textContent =
    heartSymbols[
      Math.floor(
        Math.random() *
        heartSymbols.length
      )
    ];

  heart.style.left =
    Math.random() * 100 + "%";

  heart.style.fontSize =
    Math.random() * 18 +
    14 +
    "px";

  heart.style.animationDuration =
    Math.random() * 5 +
    7 +
    "s";

  heart.style.animationDelay =
    Math.random() * 0.5 +
    "s";

  heartContainer.appendChild(heart);


  setTimeout(() => {
    heart.remove();
  }, 13000);
}


if (!prefersReducedMotion) {
  setInterval(
    createFloatingHeart,
    700
  );
}


// ========================================
// หัวใจระเบิด
// ========================================

function createHeartBurst(
  centerX,
  centerY,
  amount = 25
) {

  if (prefersReducedMotion) {
    return;
  }

  for (let i = 0; i < amount; i++) {

    const heart =
      document.createElement("span");

    heart.className =
      "burst-heart";

    heart.textContent =
      Math.random() > 0.45
        ? "💜"
        : "💚";

    heart.style.left =
      centerX + "px";

    heart.style.top =
      centerY + "px";


    const angle =
      Math.random() *
      Math.PI *
      2;

    const distance =
      Math.random() *
      260 +
      80;


    const x =
      Math.cos(angle) *
      distance;

    const y =
      Math.sin(angle) *
      distance;


    heart.style.setProperty(
      "--x",
      `${x}px`
    );

    heart.style.setProperty(
      "--y",
      `${y}px`
    );


    heart.style.fontSize =
      Math.random() *
      22 +
      18 +
      "px";


    document.body.appendChild(heart);


    setTimeout(() => {
      heart.remove();
    }, 1600);
  }
}


// ========================================
// เริ่มหน้าแรก
// ========================================

showScreen(0);
updateMusicButton();
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePassword.textContent = "🙈";
  } else {
    passwordField.type = "password";
    togglePassword.textContent = "👀";
  }
});
const codeBoxes = document.querySelectorAll(".code-box");
const hiddenPassword = document.getElementById("password");

function updateHiddenPassword() {
  hiddenPassword.value = Array.from(codeBoxes)
    .map(box => box.value)
    .join("");
}

codeBoxes.forEach((box, index) => {

  box.addEventListener("input", () => {
    box.value = box.value.replace(/\D/g, "");

    if (box.value && index < codeBoxes.length - 1) {
      codeBoxes[index + 1].focus();
    }

    updateHiddenPassword();
  });

  box.addEventListener("keydown", (event) => {
    if (
      event.key === "Backspace" &&
      box.value === "" &&
      index > 0
    ) {
      codeBoxes[index - 1].focus();
    }
  });

});
// ========================================
// Quiz แบบทีละข้อ 💜🌿
// ========================================

const quizSteps = document.querySelectorAll(".quiz-step");

quizSteps.forEach((step, stepIndex) => {

  const correctAnswer = step.dataset.answer;
  const options = step.querySelectorAll(".quiz-option");

  options.forEach((option) => {

    option.addEventListener("click", () => {

      const selectedAnswer = option.dataset.value;

      // ตอบถูก
      if (selectedAnswer === correctAnswer) {

        option.classList.add("correct");
        option.innerHTML += " ✓";

        // กันกดซ้ำ
        options.forEach(btn => {
          btn.disabled = true;
        });

        createHeartBurst(
          window.innerWidth / 2,
          window.innerHeight / 2,
          15
        );

        // ถ้ายังไม่ใช่ข้อสุดท้าย
        if (stepIndex < quizSteps.length - 1) {

          setTimeout(() => {

            step.hidden = true;

            quizSteps[stepIndex + 1].hidden = false;

          }, 700);

        }

        // ถ้าเป็นข้อสุดท้าย
        else {

          setTimeout(() => {

            quizResult.textContent =
              "3/3 เก่งมากก จำเรื่องของเราได้หมดเลย 💜🌿";

            quizResult.style.color = "#55b99a";

            createHeartBurst(
              window.innerWidth / 2,
              window.innerHeight / 2,
              35
            );

            setTimeout(() => {
              showScreen(6);
            }, 1200);

          }, 600);

        }

      }

      // ตอบผิด
      else {

        option.classList.remove("wrong");

        void option.offsetWidth;

        option.classList.add("wrong");

        quizResult.textContent =
          "อันนี้ไม่ใช่น้าา คิดดี ๆ 🤭";

        quizResult.style.color = "#9b78e8";

        setTimeout(() => {
          quizResult.textContent = "";
        }, 1200);

      }

    });

  });

});
const endingVideo = document.querySelector(".ending-video");
const endingMessage = document.getElementById("endingMessage");

let endingShown = false;

if (endingVideo && endingMessage) {

  endingVideo.addEventListener("timeupdate", () => {

    // ใกล้จบคลิปรอบแรก
    if (
      !endingShown &&
      endingVideo.duration &&
      endingVideo.currentTime >= endingVideo.duration - 0.5
    ) {

      endingShown = true;

      endingMessage.hidden = false;

      setTimeout(() => {

        endingMessage.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }, 500);

    }

  });

}