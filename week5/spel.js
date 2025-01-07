// script.js
let startTime, timeoutId;

const startButton = document.getElementById('start-button');
const redBox = document.getElementById('red-box');
const greenBox = document.getElementById('green-box');
const message = document.getElementById('message');
const gameContainer = document.getElementById('game-container');

startButton.addEventListener('click', () => {
  // Hide the start button
  startButton.classList.add('hidden');

  // Show the red box and set message to "Wacht..."
  redBox.classList.remove('hidden');
  message.textContent = 'Wacht...';

  // Set a random timeout between 3 and 7 seconds
  const delay = Math.random() * (7 - 3) + 3;

  timeoutId = setTimeout(() => {
    // Hide the red box and show the green box
    redBox.classList.add('hidden');
    greenBox.classList.remove('hidden');

    // Update the message to "GO!"
    message.textContent = 'GO!';

    // Move the green box to a random position within the game container
    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;

    const greenBoxSize = 50; // Same as the width and height in CSS
    const randomX = Math.random() * (containerWidth - greenBoxSize);
    const randomY = Math.random() * (containerHeight - greenBoxSize);

    greenBox.style.left = `${randomX}px`;
    greenBox.style.top = `${randomY}px`;

    // Record the start time
    startTime = Date.now();
  }, delay * 1000);
});

greenBox.addEventListener('click', () => {
  // Calculate reaction time
  const reactionTime = (Date.now() - startTime) / 1000;

  // Show reaction time and reset message
  message.textContent = `Reactietijd: ${reactionTime.toFixed(2)} seconden`;

  // Reset the game
  greenBox.classList.add('hidden');
  startButton.classList.remove('hidden');
});
