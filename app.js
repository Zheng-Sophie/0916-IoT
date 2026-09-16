// Personal Dashboard App Engine

document.addEventListener('DOMContentLoaded', () => {
  // State variables
  let is24HourFormat = true;
  let currentTheme = localStorage.getItem('theme') || 'dark';

  // Element references
  const clockHours = document.getElementById('clock-hours');
  const clockMinutes = document.getElementById('clock-minutes');
  const clockSeconds = document.getElementById('clock-seconds');
  const clockAmPm = document.getElementById('clock-ampm');
  const dateDay = document.getElementById('date-day');
  const dateFull = document.getElementById('date-full');
  const timezoneName = document.getElementById('timezone-name');
  const greetingText = document.getElementById('greeting-text');

  // Analog Hands
  const analogHour = document.getElementById('analog-hour');
  const analogMinute = document.getElementById('analog-minute');
  const analogSecond = document.getElementById('analog-second');

  // Controls & Modals
  const formatToggleBtn = document.getElementById('format-toggle');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const displayName = document.getElementById('display-name');
  const editNameBtn = document.getElementById('edit-name-btn');
  const userTagline = document.getElementById('user-tagline');
  const userBio = document.getElementById('user-bio');
  const userAvatar = document.getElementById('user-avatar');
  const changeAvatarBtn = document.getElementById('change-avatar-btn');

  const nameModal = document.getElementById('name-modal');
  const nameInput = document.getElementById('name-input');
  const saveNameBtn = document.getElementById('save-name-btn');
  const cancelNameBtn = document.getElementById('cancel-name-btn');
  const worldClockContainer = document.getElementById('world-clock-list');

  // Avatar Options
  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
  ];
  let avatarIndex = 0;

  // Initialize Theme
  document.body.setAttribute('data-theme', currentTheme);
  updateThemeIcon();

  // Load Saved Profile Data
  loadSavedProfile();

  // Timezone Detection
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offsetMin = new Date().getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offsetMin / 60));
    const offsetSign = offsetMin <= 0 ? '+' : '-';
    timezoneName.textContent = `${tz} (GMT${offsetSign}${offsetHours})`;
  } catch (e) {
    timezoneName.textContent = 'Local Time Zone';
  }

  // Live Clock Ticker
  function updateClock() {
    const now = new Date();

    // Digital Time calculation
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Dynamic Greeting based on time of day
    if (hours >= 5 && hours < 12) {
      greetingText.textContent = 'Good Morning,';
    } else if (hours >= 12 && hours < 17) {
      greetingText.textContent = 'Good Afternoon,';
    } else if (hours >= 17 && hours < 22) {
      greetingText.textContent = 'Good Evening,';
    } else {
      greetingText.textContent = 'Good Night,';
    }

    // Format Digital Clock
    let ampm = '';
    if (!is24HourFormat) {
      ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 becomes 12
      clockAmPm.style.display = 'inline-block';
      clockAmPm.textContent = ampm;
    } else {
      clockAmPm.style.display = 'none';
    }

    clockHours.textContent = String(hours).padStart(2, '0');
    clockMinutes.textContent = String(minutes).padStart(2, '0');
    clockSeconds.textContent = String(seconds).padStart(2, '0');

    // Date formatting
    const optionsDay = { weekday: 'long' };
    const optionsFull = { month: 'long', day: 'numeric', year: 'numeric' };
    dateDay.textContent = now.toLocaleDateString('en-US', optionsDay);
    dateFull.textContent = now.toLocaleDateString('en-US', optionsFull);

    // Analog Clock Rotations
    const secDeg = (seconds / 60) * 360;
    const minDeg = ((minutes + seconds / 60) / 60) * 360;
    const hourDeg = (((now.getHours() % 12) + minutes / 60) / 12) * 360;

    analogSecond.style.transform = `rotate(${secDeg}deg)`;
    analogMinute.style.transform = `rotate(${minDeg}deg)`;
    analogHour.style.transform = `rotate(${hourDeg}deg)`;

    // Update World Clocks
    updateWorldClocks(now);
  }

  // World Clocks Configuration
  const worldCities = [
    { name: 'Tokyo', zone: 'Asia/Tokyo', sub: 'Japan' },
    { name: 'London', zone: 'Europe/London', sub: 'UK' },
    { name: 'New York', zone: 'America/New_York', sub: 'USA East' },
    { name: 'San Francisco', zone: 'America/Los_Angeles', sub: 'USA West' },
    { name: 'Sydney', zone: 'Australia/Sydney', sub: 'Australia' }
  ];

  function updateWorldClocks(now) {
    worldClockContainer.innerHTML = '';
    worldCities.forEach(city => {
      try {
        const cityTimeStr = now.toLocaleTimeString('en-US', {
          timeZone: city.zone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: !is24HourFormat
        });
        const cityDayStr = now.toLocaleDateString('en-US', {
          timeZone: city.zone,
          weekday: 'short'
        });

        const item = document.createElement('div');
        item.className = 'world-clock-item';
        item.innerHTML = `
          <div class="city-info">
            <span class="city-name">${city.name}</span>
            <span class="city-sub">${city.sub}</span>
          </div>
          <div class="city-time-box">
            <div class="city-time">${cityTimeStr}</div>
            <div class="city-day">${cityDayStr}</div>
          </div>
        `;
        worldClockContainer.appendChild(item);
      } catch (e) {
        // Fallback if timezone not supported
      }
    });
  }

  // Format Toggle
  formatToggleBtn.addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    formatToggleBtn.querySelector('.btn-text').textContent = is24HourFormat ? '24H' : '12H';
    updateClock();
  });

  // Theme Toggle
  themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
  });

  function updateThemeIcon() {
    themeToggleBtn.innerHTML = currentTheme === 'dark'
      ? '<i class="fa-solid fa-moon"></i>'
      : '<i class="fa-solid fa-sun"></i>';
  }

  // Name Editing Modal Logic
  function openNameModal() {
    nameInput.value = displayName.textContent;
    nameModal.classList.add('active');
    nameInput.focus();
  }

  function closeNameModal() {
    nameModal.classList.remove('active');
  }

  function saveName() {
    const val = nameInput.value.trim();
    if (val) {
      displayName.textContent = val;
      localStorage.setItem('user_name', val);
    }
    closeNameModal();
  }

  displayName.addEventListener('click', openNameModal);
  editNameBtn.addEventListener('click', openNameModal);
  saveNameBtn.addEventListener('click', saveName);
  cancelNameBtn.addEventListener('click', closeNameModal);

  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveName();
    if (e.key === 'Escape') closeNameModal();
  });

  // Save editable fields automatically
  userTagline.addEventListener('blur', () => {
    localStorage.setItem('user_tagline', userTagline.textContent);
  });

  userBio.addEventListener('blur', () => {
    localStorage.setItem('user_bio', userBio.textContent);
  });

  // Avatar Switcher
  changeAvatarBtn.addEventListener('click', () => {
    avatarIndex = (avatarIndex + 1) % avatarPresets.length;
    userAvatar.src = avatarPresets[avatarIndex];
    localStorage.setItem('user_avatar', userPresets[avatarIndex]);
  });

  // Load Saved Profile Data
  function loadSavedProfile() {
    const savedName = localStorage.getItem('user_name');
    if (savedName && savedName !== 'Alex Morgan') {
      displayName.textContent = savedName;
    } else {
      displayName.textContent = 'Agnes';
      localStorage.setItem('user_name', 'Agnes');
    }

    const savedTagline = localStorage.getItem('user_tagline');
    if (savedTagline) userTagline.textContent = savedTagline;

    const savedBio = localStorage.getItem('user_bio');
    if (savedBio) userBio.textContent = savedBio;

    const savedAvatar = localStorage.getItem('user_avatar');
    if (savedAvatar) userAvatar.src = savedAvatar;
  }

  // Start Clock Loop
  updateClock();
  setInterval(updateClock, 1000);
});
