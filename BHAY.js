const storyText = document.getElementById("story-text");
const choices = document.getElementById("choices");
const locationCard = document.getElementById("location-card");

const paragraphs = [
  "The café is cold — and so is your coffee. They're late. Again. Just like they always were.",
  "In the seat across from you, chin resting in his palm, is (Angel Name).",
  "Pink hair falling softly over light blue eyes, expression somewhere between bored and irritated. He's not even looking at you. Just tracing stars on the table since it was the only thing he could do. It was painfully obvious he wanted both of us to go home.",
  "He isn't your date. He's never been your date. He's just...there. The way he's always just been there. He never leaves. Never has. Likely never will. I came to this conclusion a long time ago.",
  "You've been waiting on your date for over thirty minutes now. (Angel Name) has been waiting with you, which he didn't have to do — he never has to. He does it anyway, that's just how he is. Or rather how he's always been.",
  "‎ ‎",
  "This was nothing new. (Angel Name) already told me this would happen. It always happened. But I'd always given my significant other the benefit of the doubt. I was a fool. And yes, I am painfully aware of that fact.",
];

let paragraphIndex = 0;
let charIndex = 0;
let speed = 25;

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

function startGame() {
  const music = document.getElementById("bg-music");
  music.volume = 0.6;
  music.play();

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game").style.display = "block";

  setTimeout(() => {
    locationCard.classList.add("visible");
  }, 300);

  setTimeout(typeNextParagraph, 2000);
}

// --- NEW UPDATE START ---
// This listens for when you click the "Next" link to go to page 2
document.addEventListener("click", (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href') === 'page2.html') {
    const music = document.getElementById("bg-music");
    // Save the current timestamp of the song
    localStorage.setItem("musicTime", music.currentTime);
  }
});
// --- NEW UPDATE END ---