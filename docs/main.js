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
    name: "Demons - Imagine Dragons",
    artist: "When the days are cold and the cards all fold\n" +
        "And the saints we see are all made of gold\n" +
        "When your dreams all fail and the ones we hail\n" +
        "Are the worst of all, and the blood's run stale\n" +
        "I wanna hide the truth, I wanna shelter you\n" +
        "But with the beast inside, there's nowhere we can hide\n" +
        "No matter what we breed, we still are made of greed\n" +
        "This is my kingdom come, this is my kingdom come\n" +
        "When you feel my heat, look into my eyes\n" +
        "It's where my demons hide, it's where my demons hide\n" +
        "Don't get too close; it's dark inside\n" +
        "It's where my demons hide, it's where my demons hide\n" +
        "At the curtain's call it's the last of all\n" +
        "When the lights fade out, all the sinners crawl\n" +
        "So they dug your grave and the masquerade\n" +
        "Will come calling out at the mess you've made\n" +
        "Don't wanna let…",
    
    image: "https://images.unsplash.com/photo-1607629121274-29b21cec9068?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRlbW9ucyUyMGRhcmtuZXNzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    path: "songs/demons.mp3"
  },
  {
    name: "Heart Attack - Demi Lovato",
    artist: "Putting my defenses up\n" +
    "'Cause I don't wanna fall in love\n" +
    "If I ever did that, I think I'd have a heart attack\n" +
    "Never put my love out on the line\n" +
    "Never said yes to the right guy\n" +
    "Never had trouble getting what I want\n" +
    "But when it comes to you, I'm never good enough\n" +
    "When I don't care, I can play 'em like a Ken doll\n" +
    "Won't wash my hair, then make 'em bounce like a basketball\n" +
    "But you make me wanna act like a girl\n" +
    "Paint my nails and wear high heels\n" +
    "Yes, you make me so nervous that I just can't hold your hand\n" +
    "You make me glow\n" +
    "But I cover up, won't let it show\n" +
    "So I'm putting my defenses up\n" +
    "'Cause I don't wanna fall in love\n" +
    "If I ever did that, I think I'd have a heart attack\n" +
    "I think I'd have a heart attack\n" +
    "I think I'd have a heart attack\n" +
    "Never break a sweat for the other…",
    image: "https://images.pexels.com/photos/4201659/pexels-photo-4201659.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "songs/heart attack.mp3"
  },
  {
    name: "Closer - The Chainsmokers",
    artist: "Hey, I was doing just fine before I met you\n" +
    "I drink too much, and that's an issue, but I'm okay\n" +
    "Hey, you tell your friends it was nice to meet them\n" +
    "But I hope I never see them again\n" +
    "I know it breaks your heart\n" +
    "Moved to the city in a broke-down car, and\n" +
    "Four years, no calls\n" +
    "Now you're looking pretty in a hotel bar, and\n" +
    "I-I-I can't stop\n" +
    "No, I-I-I can't stop\n" +
    "So, baby, pull me closer\n" +
    "In the back seat of your Rover\n" +
    "That I know you can't afford\n" +
    "Bite that tattoo on your shoulder\n" +
    "Pull the sheets right off the corner\n" +
    "Of that mattress that you stole\n" +
    "From your roommate back in Boulder\n" +
    "We ain't ever getting older\n" +
    "We ain't ever getting older\n" +
    "We ain't ever getting older\n" +
    "You look as good as the day I met you\n" +
    "I forget just why I left you, I was insane\n" +
    "Stay and play that…",
    image: "https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "songs/closer.mp3",
  },

  {
    name: "Clarity - Zedd",
    artist: "High dive into frozen waves where the past comes back to life\n" +
    "Fight fear for the selfish pain, it was worth it every time\n" +
    "Hold still right before we crash 'cause we both know how this ends\n" +
    "A clock ticks 'til it breaks your glass and I drown in you again\n" +
    "'Cause you are the piece of me I wish I didn't need\n" +
    "Chasing relentlessly, still fight and I don't know why\n" +
    "If our love is tragedy, why are you my remedy?\n" +
    "If our love's insanity, why are you my clarity?\n" +
    "If our love is tragedy, why are you my remedy?\n" +
    "If our love's insanity, why are you my clarity?\n" +
    "Walk on through a red parade and refuse to make amends\n" +
    "It cuts deep through our ground and makes us forget all common sense\n" +
    "Don't speak as I try to leave 'cause we both know what we'll choose\n" +
    "If you pull, then…",
    image: "https://images.pexels.com/photos/2902536/pexels-photo-2902536.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500 ",
    lyric: "hello",
    path: "songs/clarity.mp3",
  },

  {
    name: "Drunk Groove - Maruv",
    artist: "You, you drive slow\n" +
    "You drive slow\n" +
    "You make me feel so crazy\n" +
    "I don't wanna know\n" +
    "Don't wanna know\n" +
    "Your name, you look amazing\n" +
    "Just one shot and go\n" +
    "Two shots and go\n" +
    "For me this world is hazy\n" +
    "I don't wanna talk\n" +
    "Don't wanna talk\n" +
    "Just let me fuck you baby\n" +
    "Show me what you've got\n" +
    "Show me, show me what you've got, got\n" +
    "Show me what you've got\n" +
    "Show me, show me what you've got, got\n" +
    "Show me what you've got\n" +
    "Show me, show me what you've got, got\n" +
    "Show me what you've got\n" +
    "Show me, show me what you've got, got\n" +
    "Show me what you've got\n" +
    "Show me, show me what you've got, got\n" +
    "Show me what you've got\n" +
    "Show me, show me what you've got, got\n" +
    "Show me what you've got\n" +
    "Show me, show me what you've got, got\n" +
    "Show me what you've got\n" +
    "Show me, show me what you've got\n" +
    "I don't wanna know\n" +
    "Don't wanna know…",
    image: "https://images.unsplash.com/photo-1611244806964-91d204d4a2a7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhY2glMjBwYXJ0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    path: "songs/groove.mp3",
  },

  {
    name: "Freedom - Kygo",
    artist: "(Freedom-dom, freedom, freedom, freedom-dom\n" +
    "I've been looking for\n" +
    "Freedom-dom, freedom, freedom, freedom-dom\n" +
    "I've been looking for)\n" +
    "I was living a lie, living a lie\n" +
    "This is my confession\n" +
    "I was living a lie before we met\n" +
    "There were so many nights, so many nights\n" +
    "Full of dark temptation\n" +
    "There were so many nights that I regret\n" +
    "You give me something that I can hold on to\n" +
    "A little light when I'm down on my knees\n" +
    "I was so lost in myself when I found you\n" +
    "But in that moment you made me believe\n" +
    "You give me freedom, freedom\n" +
    "Freedom I've been looking for\n" +
    "Freedom, freedom is you\n" +
    "You give me freedom, freedom\n" +
    "Freedom I've been looking for\n" +
    "Freedom, freedom is you\n" +
    "You give me freedom-dom\n" +
    "Freedom, freedom\n" +
    "You give me freedom-dom\n" +
    "I've been looking for\n" +
    "You give me freedom-dom…",
    image: "https://images.pexels.com/photos/327509/pexels-photo-327509.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "songs/freedom.mp3",
  },

  {
    name: "Just Hold On - Steve Aoki",
    artist: "Wish that you could build a time machine\n" +
    "So you could see\n" +
    "The things no one can see\n" +
    "Feels like you're standing on the edge\n" +
    "Looking at the stars\n" +
    "And wishing you were them\n" +
    "‪What do you do when a chapter ends?‬\n" +
    "‪Do you close the book and never read it again?‬\n" +
    "‪Where do you go when your story's done?‬\n" +
    "‪You can be who you were or who you'll become\n" +
    "Oh-oh-oh, oh-oh-oh oh, if it all goes wrong\n" +
    "Oh-oh-oh, oh-oh-oh oh, darling just hold on\n" +
    "‪The sun goes down and it comes back up\n" +
    "‪The world it turns no matter what\n" +
    "Oh-oh-oh, oh-oh-oh oh, if it all goes wrong\n" +
    "Darling, just hold on\n" +
    "Oh-oh-oh, oh-oh-oh oh, darling, just hold on\n" +
    "Oh-oh-oh, oh-oh-oh oh\n" +
    "It's not over 'til it's all been said\n" +
    "‪It's not over 'til your dying breath\n" +
    "‪So what do you want them to say when you're…",
    image: "https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "songs/just.mp3",
  },

  {
    name: "Back To Life - Hailee Steinfeld",
    artist: "Our love's enough\n" +
    "Transcending us through space and time\n" +
    "It's holding up\n" +
    "It keeps you and me intertwined\n" +
    "What's a pipe dream if you ain't trying to do it?\n" +
    "What's a heartbreak if you ain't crying all through it?\n" +
    "What's a sunset if you ain't riding into it?\n" +
    "Let's drive into it\n" +
    "What's a pipe dream if you ain't trying to do it?\n" +
    "What's a heartbreak if you ain't crying all through it?\n" +
    "What's a sunset if you ain't riding into it?\n" +
    "Let's drive into it\n" +
    "'Cause I'm bringing you back to life (back)\n" +
    "And I know that you're gone\n" +
    "But I swear that you're here\n" +
    "It's a feeling that won't disappear\n" +
    "And you're bringing me back to life (back)\n" +
    "I was looking for something that I couldn't find\n" +
    "It's a feeling you give me inside\n" +
    "Oh, oh, oh, oh\n" +
    "Oh, oh, oh, oh\n" +
    "'Cause I'm bringing you back to…",
    image: "https://images.pexels.com/photos/148523/pexels-photo-148523.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "songs/back.mp3",
  },

  {
    name: "Here With Me - Marshmello",
    artist: "Can I tell you something just between you and me?\n" +
    "When I hear your voice, I know I'm finally free\n" +
    "Every single word is perfect as it can be\n" +
    "And I need you here with me\n" +
    "When you lift me up, I know that I'll never fall\n" +
    "I can speak to you by saying nothing at all\n" +
    "Every single time, I find it harder to breathe\n" +
    "'Cause I need you here with me\n" +
    "Every day\n" +
    "You're saying the words that I want you to say\n" +
    "There's a pain in my heart and it won't go away\n" +
    "Now I know I'm falling in deep\n" +
    "'Cause I need you here with me\n" +
    "Every day\n" +
    "You're saying the words that I want you to say\n" +
    "There's a pain in my heart and it won't go away\n" +
    "Now I know I'm falling in deep\n" +
    "'Cause I need you here with me\n" +
    "I think I see your face in every place that I go\n" +
    "I try to hide it, but I know that it's gonna…",
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

