$(document).ready(function() {
    const song = $("#song")[0];
    const controlIcon = $("#controlIcon");
    const forwardButton = $(".fa-forward");
    const backwardButton = $(".fa-backward");
    const songTitle = $("#songTitle");
    const artistName = $("#artistName");
    const progressDot = $("#progressDot");
    const progressLine = $("#progressLine");

    const songsList = [
        {
            title: "Redemption",
            name: "Besomorph & Coopex",
            source: "https://github.com/ecemgo/mini-samples-great-tricks/blob/main/song-list/Besomorph-Coopex-Redemption.mp3?raw=true",
            cover: "https://i.ytimg.com/vi/Z8mWqjfvg-A/maxresdefault.jpg",
        },
        {
            title: "What's the Problem?",
            name: "OSKI",
            source: "https://github.com/ecemgo/mini-samples-great-tricks/blob/main/song-list/OSKI-Whats-The-Problem.mp3?raw=true",
            cover: "https://linkstorage.linkfire.com/medialinks/images/fd2634bd-07c6-4656-b970-843038c78b51/artwork-440x440.jpg",
        },
        {
            title: "Control",
            name: "Unknown Brain x Rival",
            source: "https://github.com/ecemgo/mini-samples-great-tricks/blob/main/song-list/Unknown-BrainxRival-Control.mp3?raw=true",
            cover: "https://i.ytimg.com/vi/d455TYstD_w/maxresdefault.jpg",
        }
    ];

    let currentSongIndex = 0;

    function updateSongInfo() {
        songTitle.text(songsList[currentSongIndex].title);
        artistName.text(songsList[currentSongIndex].name);
        song.src = songsList[currentSongIndex].source;
    }

    function updateProgress() {
        const progressValue = (song.currentTime / song.duration) * 100;
        const lineWidth = progressLine.width();
        const dotPosition = (progressValue / 100) * lineWidth;
        progressDot.css('left', dotPosition + 'px');
    }

    controlIcon.on("click", function() {
        if (song.paused) {
            song.play();
            controlIcon.removeClass("fa-play").addClass("fa-pause");
        } else {
            song.pause();
            controlIcon.removeClass("fa-pause").addClass("fa-play");
        }
    });

    forwardButton.on("click", function() {
        currentSongIndex = (currentSongIndex + 1) % songsList.length;
        updateSongInfo();
        song.play();
        controlIcon.removeClass("fa-play").addClass("fa-pause");
    });

    backwardButton.on("click", function() {
        currentSongIndex = (currentSongIndex - 1 + songsList.length) % songsList.length;
        updateSongInfo();
        song.play();
        controlIcon.removeClass("fa-play").addClass("fa-pause");
    });

    song.addEventListener('timeupdate', updateProgress);

    progressDot.on('click', function(e) {
        const lineOffset = progressLine.offset().left;
        const lineWidth = progressLine.width();
        const clickPosition = e.pageX - lineOffset;
        const progressValue = (clickPosition / lineWidth) * 100;
        song.currentTime = (progressValue / 100) * song.duration;
        updateProgress();
    });

    updateSongInfo();
});

// $(document).ready(function() {
//     const progress = $("#progress");
//     const song = $("#song")[0];
//     const controlIcon = $("#controlIcon");
//     const forwardButton = $(".fa-forward");
//     const backwardButton = $(".fa-backward");
//     const rotatingImage = $("#rotatingImage")[0];
//     const songName = $(".music-player h2");
//     const artistName = $(".music-player p");

//     const songsList = [
//         {
//             title: "Redemption",
//             name: "Besmorph & Coopex",
//             source: "https://github.com/ecemgo/mini-samples-great-tricks/blob/main/song-list/Besomorph-Coopex-Redemption.mp3?raw=true",
//             cover: "https://i.ytimg.com/vi/Z8mWqjfvg-A/maxresdefault.jpg",
//         },
//         {
//             title: "What's the Problem?",
//             name: "OSKI",
//             source: "https://github.com/ecemgo/mini-samples-great-tricks/blob/main/song-list/OSKI-Whats-The-Problem.mp3?raw=true",
//             cover: "https://linkstorage.linkfire.com/medialinks/images/fd2634bd-07c6-4656-b970-843038c78b51/artwork-440x440.jpg",
//         },
//         {
//             title: "Control",
//             name: "Unknown Brain x Rival",
//             source: "https://github.com/ecemgo/mini-samples-great-tricks/blob/main/song-list/Unknown-BrainxRival-Control.mp3?raw=true",
//             cover: "https://i.ytimg.com/vi/d455TYstD_w/maxresdefault.jpg",
//         }
//     ];

//     let currentSongIndex = 0;

//     function updateSongInfo() {
//         songName.text(songsList[currentSongIndex].title);
//         artistName.text(songsList[currentSongIndex].name);
//         song.src = songsList[currentSongIndex].source;
//         rotatingImage.src = songsList[currentSongIndex].cover;
//         song.load();
//     }

//     updateSongInfo();

//     function playPause() {
//         if (song.paused) {
//             song.play();
//             controlIcon.addClass("fa-pause").removeClass("fa-play");
//             startRotation();
//         } else {
//             song.pause();
//             controlIcon.addClass("fa-play").removeClass("fa-pause");
//             pauseRotation();
//         }
//     }

//     $("#controlIcon").click(playPause);

//     let rotating = false;
//     let currentRotation = 0;
//     let rotationInterval;

//     function rotateImage() {
//         currentRotation += 1;
//         rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
//     }

//     function startRotation() {
//         if (!rotating) {
//             rotating = true;
//             rotationInterval = setInterval(rotateImage, 50);
//         }
//     }

//     function pauseRotation() {
//         rotating = false;
//         clearInterval(rotationInterval);
//     }

//     song.addEventListener("timeupdate", function() {
//         if (!song.paused) {
//             progress.val(song.currentTime);
//         }
//     });

//     progress.on("input", function() {
//         song.currentTime = progress.val();
//     });

//     song.addEventListener("ended", function() {
//         currentSongIndex = (currentSongIndex + 1) % songsList.length;
//         updateSongInfo();
//         playPause();
//     });

//     forwardButton.click(function() {
//         currentSongIndex = (currentSongIndex + 1) % songsList.length;
//         updateSongInfo();
//         if (!song.paused) playPause();
//     });

//     backwardButton.click(function() {
//         currentSongIndex = (currentSongIndex - 1 + songsList.length) % songsList.length;
//         updateSongInfo();
//         if (!song.paused) playPause();
//     });
// });
