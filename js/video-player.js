// Skilled Sapiens - Video Player Module

// Video Player State
let videoPlayer = {
    currentCourse: null,
    currentLesson: null,
    isPlaying: false,
    volume: 1,
    playbackRate: 1,
    quality: 'auto'
};

// Initialize Video Player
function initVideoPlayer() {
    const video = document.getElementById('mainVideo');

    if (!video) return;

    video.addEventListener('play', () => {
        videoPlayer.isPlaying = true;
    });

    video.addEventListener('pause', () => {
        videoPlayer.isPlaying = false;
    });

    video.addEventListener('timeupdate', () => {
        updateVideoProgress(video);
    });

    video.addEventListener('ended', () => {
        onVideoEnded();
    });

    // Add custom controls
    addCustomControls();
}

// Update Video Progress
function updateVideoProgress(video) {
    const progress = (video.currentTime / video.duration) * 100;
    const progressFill = document.querySelector('.video-progress-fill');

    if (progressFill) {
        const circumference = 2 * Math.PI * 60;
        const offset = circumference - (progress / 100) * circumference;
        progressFill.style.strokeDashoffset = offset;
    }
}

// On Video Ended
function onVideoEnded() {
    // Auto mark as complete
    if (window.currentCourseId && window.currentLessonId) {
        setTimeout(() => {
            markComplete();
        }, 1000);
    }
}

// Add Custom Controls
function addCustomControls() {
    const video = document.getElementById('mainVideo');
    const wrapper = document.getElementById('videoWrapper');

    if (!video || !wrapper) return;

    // Add fullscreen button
    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.className = 'fullscreen-btn';
    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullscreenBtn.onclick = toggleFullscreen;
    wrapper.appendChild(fullscreenBtn);
}

// Toggle Fullscreen
function toggleFullscreen() {
    const container = document.querySelector('.video-player-container');

    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            showToast('Error attempting to enable fullscreen', 'error');
        });
    } else {
        document.exitFullscreen();
    }
}

// Set Playback Speed
function setPlaybackSpeed(speed) {
    const video = document.getElementById('mainVideo');
    if (video) {
        video.playbackRate = speed;
        videoPlayer.playbackRate = speed;
    }
}

// Set Volume
function setVolume(level) {
    const video = document.getElementById('mainVideo');
    if (video) {
        video.volume = level;
        videoPlayer.volume = level;
    }
}

// Seek Video
function seekVideo(percentage) {
    const video = document.getElementById('mainVideo');
    if (video) {
        video.currentTime = (percentage / 100) * video.duration;
    }
}

// Toggle Picture in Picture
async function togglePiP() {
    const video = document.getElementById('mainVideo');

    if (!video) return;

    try {
        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
        } else {
            await video.requestPictureInPicture();
        }
    } catch (error) {
        showToast('PiP not supported in this browser', 'error');
    }
}

// Skip Forward/Backward
function skipVideo(seconds) {
    const video = document.getElementById('mainVideo');
    if (video) {
        video.currentTime += seconds;
    }
}

// Video Player Keyboard Shortcuts
document.addEventListener('keydown', function (e) {
    // Only handle if video player is active
    if (!document.getElementById('videoPlayerPage').classList.contains('active')) return;

    const video = document.getElementById('mainVideo');
    if (!video) return;

    switch (e.key) {
        case ' ':
        case 'k':
            e.preventDefault();
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            break;
        case 'ArrowLeft':
        case 'j':
            e.preventDefault();
            skipVideo(-10);
            break;
        case 'ArrowRight':
        case 'l':
            e.preventDefault();
            skipVideo(10);
            break;
        case 'ArrowUp':
            e.preventDefault();
            setVolume(Math.min(1, videoPlayer.volume + 0.1));
            break;
        case 'ArrowDown':
            e.preventDefault();
            setVolume(Math.max(0, videoPlayer.volume - 0.1));
            break;
        case 'm':
            e.preventDefault();
            video.muted = !video.muted;
            break;
        case 'f':
            e.preventDefault();
            toggleFullscreen();
            break;
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initVideoPlayer);
