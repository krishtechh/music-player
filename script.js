let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Born To Shine",
    artist: "Diljit Dosanjh",
    image: "https://images.genius.com/a7537e279c5ba48c7c78b4a9a5a069e2.1000x1000x1.jpg",
    path: "Born to shine - Diljit Dosanjh.mp3"
  },
  {
    name: "Aam Jahe Munde",
    artist: "Parmish Verma",
    image: "https://i.ytimg.com/vi/i63AQpzq9mE/hqdefault.jpg",
    path: "Aam Jahe Munde.mp3"
  },
  {
    name: "Admirin'n You",
    artist: "Karan Aujla",
    image: "https://i.ytimg.com/vi/pDdoOXxWFUg/maxresdefault.jpg",
    path: "audios\Admirin You - Karan Aujla Song.mp3",
  },
  {
    name: "Brown Munde",
    artist: "Ap Dhillion",
    image: "https://britasia.tv/wp-content/uploads/2020/09/Eh09An1VkAEohgB.jpg",
    path: "BROWN MUNDE.mp3"
  },
  {
    name: "Lemonade", 
    artist: "Diljit Dosanjh",
    image: "https://i.ytimg.com/vi/Sb9SsxBPBEU/maxresdefault.jpg",
    path: "Diljit Dosanjh Lemonade.mp3"
  },
  {
    name: "Gangsta",
    artist: "Karan Aujla",
    image: "https://c.saavncdn.com/575/Way-Ahead-Punjabi-2022-20220510204014-500x500.jpg",
    path: "Gangsta Hi Bande Aa _ Gangsta .mp3"
  },
  {
    name: "Goat",
    artist: "Sidhumoose Wala",
    image: "https://th.bing.com/th/id/OIP.TnIy-VzCQWPD2rs8kEA39AHaFs?rs=1&pid=ImgDetMain",
    path: "Goat-Downringtone.com.mp3"
  },
  {
    name: "Jee Ni Lagda",
    artist: "Karan aujla",
    image: "https://i.ytimg.com/vi/pDdoOXxWFUg/maxresdefault.jpg",
    path: "Jee Ni Lagda - Karan Aujla _ P.mp3"
  },
  {
    name: "Laembadgini",
    artist: "Diljit Dosanjh",
    image: "https://m.media-amazon.com/images/M/MV5BNGZmOTU0ZmItNjJhMy00NzVlLWE3NjgtZDE1MzdjNWZmMDI3XkEyXkFqcGdeQXVyNjc5MjAyMzM@._V1_.jpg",
    path: "Laembadgini.mp3"
  },
  {
    name: "White Brown Black",
    artist: "Karan Aujla",
    image: "https://i.ytimg.com/vi/Ex6rkU1HmWg/maxresdefault.jpg",
    path: "White Brown Black - Karan Aujl.mp3"
  },
  
  
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}