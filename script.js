const timeEl = document.getElementById('time');
const ampmEl = document.getElementById('ampm');
const dateEl = document.getElementById('date');
const toggleFormatBtn = document.getElementById('toggleFormat');
const themeToggleBtn = document.getElementById('themeToggle');

let is24Hour = false;


function pad(value) {
  return value.toString().padStart(2, '0');
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  let ampm = 'AM';
  if (!is24Hour) {
    if (hours >= 12) {
      ampm = 'PM';
      if (hours > 12) hours -= 12;
    }
    if (hours === 0) hours = 12;
    ampmEl.style.display = 'inline';
    ampmEl.textContent = ampm;
  } else {
    ampmEl.style.display = 'none';
  }

  timeEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  dateEl.textContent = now.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}



function generateStars(count = 100) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    star.style.opacity = Math.random();
    document.body.appendChild(star);
  }
}


function setTimeBasedTheme() {
  const hour = new Date().getHours();
  clearThemes();

  if (hour >= 6 && hour < 12) {
    document.body.classList.add('morning');
  } else if (hour >= 12 && hour < 18) {
    document.body.classList.add('noon');
  } else {
    document.body.classList.add('night');
    generateStars();
  }
}


function toggleManualTheme() {
  const current = document.body.classList.contains('night') ? 'night' : 'morning';
  clearThemes();

  if (current === 'night') {
    document.body.classList.add('morning');
    localStorage.setItem('theme', 'morning');
  } else {
    document.body.classList.add('night');
    generateStars();
    localStorage.setItem('theme', 'night');
  }
}
function clearThemes() {
  document.body.classList.remove('morning', 'noon', 'night', 'dark');
  document.querySelectorAll('.star').forEach(star => star.remove());
}

function restoreTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'morning') {
    clearThemes();
    document.body.classList.add('morning');
  } else if (saved === 'night') {
    clearThemes();
    document.body.classList.add('night');
    generateStars();
  } else {
    setTimeBasedTheme();
  }
}

toggleFormatBtn.addEventListener('click', () => {
  is24Hour = !is24Hour;
  toggleFormatBtn.textContent = is24Hour ? 'Switch to 12 Hour Clock' : 'Switch to 24 Hour Clock';
  updateClock();
});

themeToggleBtn.addEventListener('click', toggleManualTheme);

window.addEventListener('DOMContentLoaded', () => {
  restoreTheme();
  updateClock();
  setInterval(updateClock, 1000);
  localStorage.removeItem('theme'); // ✨ force time-based theme every time
});
