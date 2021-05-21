let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let track_lyric = document.querySelector(".track-lyric")

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
    name: "Demons",
    artist: "Imagine Dragons",
    lyric:"https://www.azlyrics.com/lyrics/imaginedragons/demons.html",
    image: "https://images.unsplash.com/photo-1607629121274-29b21cec9068?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRlbW9ucyUyMGRhcmtuZXNzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    path: "songs/demons.mp3"
  },
  {
    name: "Heart Attack",
    artist: "Demi Lovato",
    image: "https://images.pexels.com/photos/4201659/pexels-photo-4201659.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "songs/heart attack.mp3"
  },
  {
    name: "Closer",
    artist: "Chainsmokers",
    image: "https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "songs/closer.mp3",
  },

  {
    name: "Clarity",
    artist: "Zedd",
    image: "https://images.pexels.com/photos/2902536/pexels-photo-2902536.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500 ",
    lyric: "hello",
    path: "songs/clarity.mp3",
  },

  {
    name: "Drunk Groove",
    artist: "Maruv",
    image: "https://images.unsplash.com/photo-1611244806964-91d204d4a2a7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhY2glMjBwYXJ0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    path: "songs/groove.mp3",
  },

  {
    name: "Freedom",
    artist: "Kygo",
    image: "https://images.pexels.com/photos/327509/pexels-photo-327509.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "songs/freedom.mp3",
  },

  {
    name: "Just Hold On",
    artist: "Steve Aoki",
    image: "https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "songs/just.mp3",
  },

  {
    name: "Back To Life",
    artist: "Hailee Steinfeld",
    image: "https://images.pexels.com/photos/148523/pexels-photo-148523.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "songs/back.mp3",
  },

  {
    name: "Here With Me",
    artist: "Marshmello",
    image: "https://images.pexels.com/photos/459301/pexels-photo-459301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "songs/freedom.mp3",
  },



];




//background animation

function openNav() {    document.getElementById("mySidenav").style.width = "100px";  document.getElementById("main").style.marginLeft = "140px";
}
function closeNav() {    document.getElementById("mySidenav").style.width = "0";    document.getElementById("main").style.marginLeft= "0";
}

function showLyric(track_index){

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
  
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function showLyric() {
  document.getElementById("lyricmodal").showModal();
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
  playpause_btn.innerHTML = '<i class="fa fa-pause fa-3x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play fa-3x"></i>';;
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

