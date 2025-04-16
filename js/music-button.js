const bgMusic = new Audio('assets/audio/bg-audio.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.3;

const musicBtn = document.getElementById('musicBtn');
let musicPlaying = false;

musicBtn.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🔇';
    } else {
        bgMusic.play();
        musicBtn.textContent = '🎵';
    }
    musicPlaying = !musicPlaying;
});

document.addEventListener('click', () => {
    if (!musicPlaying) {
        bgMusic.play();
        musicBtn.textContent = '🎵';
        musicPlaying = true;
    }
}, { once: true });
