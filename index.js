let passcode = ""; // Variabel untuk menyimpan password yang dimasukkan
const maxLength = 4; // Panjang maksimal password

// Fungsi untuk menambahkan angka ke password
function enterPasscode(number) {
  if (passcode.length < maxLength) {
    passcode += number; // Tambahkan angka ke password
    updatePasscodeDisplay(); // Perbarui tampilan
  }
}

// Fungsi untuk menghapus password
function clearPasscode() {
  passcode = ""; // Reset password
  updatePasscodeDisplay(); // Perbarui tampilan
}

// Fungsi untuk mengirim password
function submitPasscode() {
  const correctPasscode = "0703"; // Ganti dengan password yang benar
  if (passcode === correctPasscode) {
    document.getElementById('passcode').style.display = 'none';
    document.getElementById('love').style.display = 'flex'; // Arahkan ke halaman berikutnya
    startTimer();
  } else {
    alert("Tet Tot Salah! Coba lagi :p");
    clearPasscode(); // Reset password
  }
}

// Fungsi untuk memperbarui tampilan password
function updatePasscodeDisplay() {
  const passcodeDisplay = document.querySelector(".passcode-input div");
  if (passcodeDisplay) {
    // Tampilkan tanda bintang sesuai panjang password
    passcodeDisplay.textContent = "♡".repeat(passcode.length) || "Enter Passcode";
  }
}

// Timer functionality
function startTimer() {
  // Set tanggal awal bersama (format: tahun, bulan (0-11), tanggal)
  const startDate = new Date(2021, 11, 17); // Ganti dengan tanggal Anda bersama
  
  function updateTimer() {
      const now = new Date();
      const difference = now - startDate;
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      document.getElementById('days').textContent = days;
      document.getElementById('hours').textContent = hours;
      document.getElementById('minutes').textContent = minutes;
      document.getElementById('seconds').textContent = seconds;
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
}

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  // Atur posisi hati secara acak
  heart.style.left = Math.random() * 100 + "vw"; // Posisi horizontal acak

  // Atur arah acak (rotasi)
  const randomRotation = Math.random() * 360; // Rotasi acak antara 0 hingga 360 derajat
  heart.style.transform = `rotate(${randomRotation}deg)`; // Terapkan rotasi acak

  // Atur durasi animasi dan opasitas
  heart.style.animationDuration = Math.random() * 5 + 3 + "s"; // Durasi animasi acak
  heart.style.opacity = Math.random(); // Opasitas acak
  heart.style.width = Math.random() * 20 + 10 + "px"; // Ukuran acak
  heart.style.height = heart.style.width; // Pastikan proporsi tetap

  document.body.appendChild(heart);

  // Hapus hati setelah animasi selesai
  setTimeout(() => {
    heart.remove();
  }, 8000); // Sesuaikan dengan durasi animasi
}

// Buat hati baru setiap 300ms
setInterval(createHeart, 300);

function displayLoveLetter() {
  document.getElementById('love-letter-display').style.display = 'flex';
  document.getElementById('love').style.display = 'none';
  document.body.style.overflow = 'visible'
}

function displayFlor() {
  document.getElementById('flor-display').style.display = 'flex';
  document.getElementById('love').style.display = 'none';
  document.body.style.overflow = 'visible'
}

function displayMusic() {
  document.getElementById('music-display').style.display = 'flex';
  document.getElementById('love').style.display = 'none';
  document.body.style.overflow = 'visible'
}

function exitDisplay () {
  document.getElementById('love-letter-display').style.display = 'none';
  document.getElementById('flor-display').style.display = 'none';
  document.getElementById('music-display').style.display = 'none';
  document.getElementById('love').style.display = 'flex';
  document.body.style.overflow = 'hiden'
}

// Ambil semua card album
const musicCards = document.querySelectorAll('.music-card');

let currentlyPlaying = null; // Variabel untuk melacak lagu yang sedang diputar

// Loop melalui setiap card album
musicCards.forEach((card) => {
  const playPauseBtn = card.querySelector('.play-pause-btn');
  const seekBar = card.querySelector('.seek-bar');
  const audio = card.querySelector('.audio');

  let isPlaying = false; // Variabel untuk melacak status pemutaran

  // Play/Pause functionality
  playPauseBtn.addEventListener('click', () => {
    // Jika ada lagu lain yang sedang diputar, hentikan lagu tersebut
    if (currentlyPlaying && currentlyPlaying !== audio) {
      currentlyPlaying.pause();
      currentlyPlaying.currentTime = 0; // Reset posisi lagu ke awal
      const otherPlayPauseBtn = currentlyPlaying.closest('.music-card').querySelector('.play-pause-btn');
      otherPlayPauseBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8 5.14v14l11-7z" />
        </svg>
      `; // Ganti ikon menjadi play

      // Reset slider dan nonaktifkan slider dari lagu yang sebelumnya diputar
      const otherSeekBar = currentlyPlaying.closest('.music-card').querySelector('.seek-bar');
      otherSeekBar.value = 0; // Reset slider ke awal
      otherSeekBar.disabled = true; // Nonaktifkan slider
    }

    if (audio.paused) {
      audio.play();
      playPauseBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
          <path fill="currentColor" d="M6 19h4V5H6zm8-14v14h4V5z" />
        </svg>
      `; // Ganti ikon menjadi pause
      isPlaying = true;
      currentlyPlaying = audio; // Set lagu yang sedang diputar
      seekBar.disabled = false; // Aktifkan slider
    } else {
      audio.pause();
      playPauseBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8 5.14v14l11-7z" />
        </svg>
      `; // Ganti ikon menjadi play
      isPlaying = false;
      currentlyPlaying = null; // Reset lagu yang sedang diputar
      seekBar.disabled = true; // Nonaktifkan slider
    }
  });

  // Update seek bar as audio plays
  audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    seekBar.value = progress;
  });

  // Seek functionality
  seekBar.addEventListener('input', () => {
    const seekTime = (seekBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;

    // Jika sebelumnya sedang diputar, lanjutkan pemutaran setelah menggeser
    if (isPlaying) {
      audio.play();
    }
  });

  // Ketika audio selesai diputar, reset ikon, slider, dan status
  audio.addEventListener('ended', () => {
    playPauseBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
        <path fill="currentColor" d="M8 5.14v14l11-7z" />
      </svg>
    `; // Ganti ikon menjadi play
    isPlaying = false;
    currentlyPlaying = null; // Reset lagu yang sedang diputar
    seekBar.value = 0; // Reset slider ke awal
    seekBar.disabled = true; // Nonaktifkan slider
  });

  // Nonaktifkan slider secara default
  seekBar.disabled = true;
});