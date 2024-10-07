const profilePic = document.getElementById("profile-image");
const profilePicContainer = document.getElementById("profile-pic");
const body = document.getElementById("body");
const nameText = document.getElementById("name");
const statusText = document.getElementById("status");
const backgroundTextContainer = document.getElementById("background-text");

const glitchImage = "https://s3.us-west-1.amazonaws.com/ai-character/uploaded/c/image/1728301444541_d87136a7.webp";
const originalImage = profilePic.src;
const phrases = ["Him?", "Who?", "Ah.", "Mhm."];

function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPosition() {
  const x = Math.floor(Math.random() * (window.innerWidth - 200)); // Adjust width for text
  const y = Math.floor(Math.random() * (window.innerHeight - 100)); // Adjust height for text
  return { x, y };
}

function showBackgroundText() {
  // Clear any existing text
  backgroundTextContainer.innerHTML = '';

  const { x, y } = randomPosition();
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  
  const textElement = document.createElement("div");
  textElement.textContent = phrase;
  textElement.style.left = `${x}px`;
  textElement.style.top = `${y}px`;
  textElement.classList.add("background-text");
  
  // Show the text
  backgroundTextContainer.appendChild(textElement);
  textElement.style.opacity = '1';

  // Fade out effect
  setTimeout(() => {
    textElement.style.opacity = '0';
    setTimeout(() => {
      backgroundTextContainer.removeChild(textElement);
    }, 300); // Allow time for fading out before removing
  }, 1000); // Keep the text visible for 1 second
}

function glitchEffect() {
  // Define the rapid glitch phases
  const glitchSequence = [
    { image: originalImage, name: "Mark Gio" },
    { image: glitchImage, name: "William" },
    { image: originalImage, name: "Mark Gio" },
    { image: glitchImage, name: "William" },
    { image: originalImage, name: "Mark Gio" },
    { image: glitchImage, name: "William" }
  ];
  
  let phase = 0;

  const glitchInterval = setInterval(() => {
    const currentPhase = glitchSequence[phase];

    // Set the image and text
    profilePic.src = currentPhase.image;
    nameText.textContent = currentPhase.name;

    // Add glitch classes
    profilePicContainer.classList.toggle('glitchy');
    body.classList.toggle('glitch-bg');
    nameText.classList.toggle('glitch-name');
    statusText.classList.toggle('glitch-text');

    // Show background text when glitching starts
    showBackgroundText();

    // Randomize the glitch timing
    let randomDuration = getRandomInterval(50, 150); // Random between 50ms to 150ms
    setTimeout(() => {
      // Remove glitch classes after a short time
      profilePicContainer.classList.remove('glitchy');
      body.classList.remove('glitch-bg');
      nameText.classList.remove('glitch-name');
      statusText.classList.remove('glitch-text');
    }, randomDuration);

    phase++;

    if (phase === glitchSequence.length) {
      clearInterval(glitchInterval);
      
      // Finish the glitch with the alternate state, then revert
      profilePic.src = glitchImage;
      body.classList.add('glitch-bg');
      nameText.classList.add('glitch-name');
      statusText.classList.add('glitch-text');
      nameText.textContent = "William";

      // Show background text during the last glitch
      showBackgroundText();

      setTimeout(() => {
        profilePic.src = originalImage;
        body.classList.remove('glitch-bg');
        nameText.classList.remove('glitch-name');
        statusText.classList.remove('glitch-text');
        nameText.textContent = "Mark Gio";
      }, 500); // Hold the final glitch state before reverting
    }
  }, 100); // Short interval for glitch timing
}

// Trigger glitch every random interval
setInterval(glitchEffect, getRandomInterval(4000, 6000));
