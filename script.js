const timeEl = document.getElementById('time');
const ampmEl = document.getElementById('ampm');
const dateEl = document.getElementById('date');
const toggleFormatBtn = document.getElementById('toggleFormat');
const themeToggleBtn = document.getElementById('themeToggle');
const icon = document.getElementById('icon');

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

function clearThemes() {
  document.body.classList.remove('morning', 'night');
}
function generateStars() {
  const starsContainer = document.getElementById('stars');
  starsContainer.innerHTML = ''; // clear previous stars

  const count = 100;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${1 + Math.random() * 2}s`;
    starsContainer.appendChild(star);
  }
}

function setTimeBasedTheme() {
  const hour = new Date().getHours();
  clearThemes();

  if (hour >= 6 && hour < 18) {
    document.body.classList.add('morning');
    icon.textContent = '🌙';
  } else {
    document.body.classList.add('night');
    icon.textContent = '☀️';
  }
  generateStars();
}

function toggleThemeManually() {
  icon.classList.add('rotate');

  if (document.body.classList.contains('night')) {
    clearThemes();
    document.body.classList.add('morning');
    icon.textContent = '🌙';
    document.getElementById("themeToggle").style.backgroundColor = "#ff9e2c";
    document.getElementById("themeToggle").style.color = "#fff";
    document.getElementById("toggleFormat").style.backgroundColor = "#ff9e2c";
    document.getElementById("toggleFormat").style.color = "#fff";
  } else {
    clearThemes();
    document.body.classList.add('night');
    document.getElementById("themeToggle").style.backgroundColor = "#1e1e40";
    document.getElementById("themeToggle").style.color = "#fff";
    document.getElementById("toggleFormat").style.backgroundColor = "#1e1e40";
    document.getElementById("toggleFormat").style.backgroundColor = "#1e1e40";
    document.getElementById("toggleFormat").style.color = "#fff";
    icon.textContent = '☀️';
  }

  setTimeout(() => icon.classList.remove('rotate'), 500);
  generateStars();
}

toggleFormatBtn.addEventListener('click', () => {
  is24Hour = !is24Hour;
  toggleFormatBtn.textContent = is24Hour ? '12 Hour Clock' : '24 Hour Clock';
  updateClock();
});

themeToggleBtn.addEventListener('click', toggleThemeManually);

window.addEventListener('DOMContentLoaded', () => {
  setTimeBasedTheme();
  updateClock();
  setInterval(updateClock, 1000);
});
