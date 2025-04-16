const bgMusic = new Audio('assets/audio/bg-audio.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.3;

const musicBtn = document.getElementById('musicBtn');
let musicPlaying = false;

musicBtn.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    } else {
        bgMusic.play();
        musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
    }
    musicPlaying = !musicPlaying;
});

document.addEventListener('click', () => {
    if (!musicPlaying) {
        bgMusic.play();
        musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
        musicPlaying = true;
    }
}, { once: true });
