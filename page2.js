const storyText = document.getElementById("story-text");
const choices = document.getElementById("choices");
const locationCard = document.getElementById("location-card");

const paragraphs = [
  "Angel: You done yet? Can we go now?",
  "You: ...",
  "Angel: Don't give me that look. You know as well as I do he'll message you any second now with a new excuse.",
  "You look down at your phone. No response yet — but deep in your gut, you already know how this ends.",
];

let paragraphIndex = 0;
let charIndex = 0;
let speed = 65;

function typeNextParagraph() {
  if (paragraphIndex < paragraphs.length) {
    let p = document.createElement("p");
    storyText.appendChild(p);

    function typeChar() {
      if (charIndex < paragraphs[paragraphIndex].length) {
        p.innerHTML += paragraphs[paragraphIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, speed);
      } else {
        charIndex = 0;
        paragraphIndex++;
        setTimeout(typeNextParagraph, 400);
      }
    }
    typeChar();
  } else {
    setTimeout(() => {
      choices.classList.add("visible");
    }, 500);
  }
}

window.addEventListener("load", () => {
  const music = document.getElementById("bg-music");

  // --- NEW UPDATE START ---
  // Look for the saved time from the previous page
  const savedTime = localStorage.getItem("musicTime");
  if (savedTime) {
    music.currentTime = parseFloat(savedTime);
  }
  // --- NEW UPDATE END ---

  music.volume = 0.6;
  music.play().catch(() => {
    console.log("Audio play blocked or failed");
  });

  setTimeout(() => {
    locationCard.classList.add("visible");
  }, 300);

  setTimeout(typeNextParagraph, 2000);
});

// Optional: Save time again if user clicks "Restart" to go back to index.html
document.addEventListener("click", (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href') === 'index.html') {
    const music = document.getElementById("bg-music");
    localStorage.setItem("musicTime", music.currentTime);
  }
});