
let songItemApi = ' http://localhost:3000/content';
let playlistApi = '  http://localhost:3000/data';

let duration_track = document.getElementById('duration_track');
let volume = document.querySelector('.volume');
let durStart = document.getElementById('durationStart');
let durEnd = document.getElementById('durationEnd');

const currentName = document.querySelector('.currentName');
const currentImg = document.querySelector('.currentImg');
const currentArtist = document.querySelector('.currentArtist');
const currentAudio = document.querySelector('.currentAudio');

const nav_song = document.querySelector('.nav-song');
const music_list = document.querySelector('.music-list');
const play = document.querySelector('.play');
const nextBtn = document.querySelector('.btn-forward');
const prevBtn = document.querySelector('.btn-backward');

const log_out = document.querySelector('.log-out');

function start() {
    getContent(renderContent);
    getPlaylist(renderPlaylist);
}
start();

function getContent(callback) {
    fetch(songItemApi)
        .then(res => res.json())
        .then(callback)
}

function renderContent(music) {
    let htmls = music.map((song) => {
        return `
                <div class="m-4" style="width: 200px;">
                    <div style="position: relative;">
                        <img src="${song.image}" class="rounded-3 img-fluid" style="object-fit: cover; width: 200px; height: 200px;">
                        <a href="#">
                            <div class="song-hover">
                            <i class="h1 bi bi-play" style="left: 50%; top: 50%; position: absolute; transform: translate(-50%, -50%);"></i>
                            </div>
                        </a>
                    </div>                    
                <div>
                    <div class="lead text-white">
                        ${song.title}
                    </div>
                    <small class="text-white">${song.artist}</small>
                    </div>
                </div>
        `
    })
    document.querySelector('.song-item-list').innerHTML = htmls.join('');
}

function getPlaylist(callback) {
    fetch(playlistApi)
        .then(res => res.json())
        .then(callback)
}

function renderPlaylist(music) {
    let htmlps = music.map((song) => {
        return `
                <div class="m-4" style="width: 200px;">
                    <div style="position: relative;">
                        <img src="${song.picture}" class="rounded img-fluid" style="object-fit: cover; width: 200px; height: 200px;">
                            <a href="#">
                                <div class="song-hover">
                                <a href = '${song.link}'><i class="h1 bi bi-play" style="left: 50%; top: 50%; position: absolute; transform: translate(-50%, -50%);"></i></a>
                                </div>
                            </a>
                    </div>                    
                    <div>
                        <div class="lead text-white">
                            ${song.title}
                        </div>
                        <small class="text-white">${song.creator.name}</small>
                    </div>
                </div>
        `
    })
    document.querySelector('.playlist-item-list').innerHTML = htmlps.join('');
}

const app = {

    isPlaying: false,
    currentIndex: 0,

    songs : [
        {   
            id: 1,
            img: 'img/ai_higuchi.jfif',
            name: 'Akuma No Ko',
            artist: 'Ai Higuchi',
            music: 'music/Akuma_no_ko.mp3'
        },
        {
            id: 2,
            img: 'img/fujii-kaze.jfif',
            name: 'Shinunoga E-Wa',
            artist: 'Fujii Kaze',
            music: 'music/Shinunoga_E_Wa.mp3'
        },
        {
            id: 3,
            img: 'img/kevin-bacon.jpg',
            name: 'Footloose',
            artist: 'Kenny Loggins',
            music: 'music/Footloose.mp3'
        },
        {
            id: 4,
            img: 'img/Nelly.jpg',
            name: 'Dilemma',
            artist: 'Nelly',
            music: 'music/Dilemma.mp3'
        },
        {
            id: 5,
            img: 'img/pano.jpg',
            name: 'Pano',
            artist: 'Zack Tabudlo',
            music: 'music/Pano.mp3'
        },
        {
            id: 6,
            img: 'img/stephen-sanchez.jpg',
            name: 'Until I Found You',
            artist: 'Stephen Sanchez',
            music: 'music/Until_I_Found_You.mp3'
        }
    ],

    render : function()  {
        let htmls = this.songs.map((song, index) => {
            return `
            <div class="song-small song ${index === this.currentIndex ? 'activeSong' : ''} m-1 ms-4 col-md-4 row align-items-center" data-index= ${index}>
                <div class="col-1 h4">${song.id}</div>
                    <div class="col d-flex">
                        <img class="rounded-circle m-1" id = "pic${index}" src="${song.img}" style="width: 50px; height: 50px; object-fit: cover;">
                        <div class="ms-1 pt-1  ">
                        <div id = "name">${song.name}</div>
                        <small id = "artist">${song.artist}</small>
                        </div>
                </div>
                <div class="col-3 pb-1 d-flex align-items-center">
                    <button class ="btn_play_1 audio-button">
                        <audio id="audio${index}" src="${song.music}"></audio>
                    </button>
                </div>
            </div>
            `;
        })
        document.querySelector('.music-list').innerHTML = htmls.join('');
        document.querySelector('.music-list-trend').innerHTML = htmls.join('');
        document.querySelector('.music-list-new').innerHTML = htmls.join('');
    },

    defineProperties: function() {
        Object.defineProperty(this, "currentSong", {
            get: function() {
                return this.songs[this.currentIndex]
            }
        }); 
    },
    
    handleEvents: function() {
        const _this = this;

        play.onclick = function() {
            if (_this.isPlaying == false) {
                currentAudio.play()
            } else {
                currentAudio.pause()
            }
        }

        currentAudio.onplay = function() {
            _this.isPlaying = true;
            nav_song.classList.add('playing');
        }

        currentAudio.onpause = function() {
            _this.isPlaying = false;
            nav_song.classList.remove('playing');
        }

        currentAudio.ontimeupdate = function() {

            let audioCurrent = currentAudio.currentTime;
    
            let min1 = Math.floor(audioCurrent / 60);
            let sec1 = Math.floor(audioCurrent % 60).toString().padStart(2, '0');
            
            durStart.innerText = `${min1}:${sec1}`;
        
            let audioDuration = currentAudio.duration;

            let min = Math.floor(audioDuration / 60);
            let sec = Math.floor(audioDuration % 60).toString().padStart(2, '0');
    
            durEnd.innerText = `${min}:${sec}`;

            if (currentAudio.duration) {
                const progress = Math.floor(currentAudio.currentTime / currentAudio.duration * 100);
                duration_track.value = progress; 
            }
        }

        duration_track.onchange = function(e) {
            const seekTime = currentAudio.duration * (e.target.value) / 100;
            currentAudio.currentTime = seekTime;
        }

        volume.onchange = function(e) {
            currentAudio.muted = false;
            const vol = (e.target.value);
            currentAudio.volume = vol / 100;

            if (vol == 0) {
                currentAudio.muted = true;
            }
        }

        nextBtn.onclick = function() {
            _this.nextSong();
            currentAudio.play();
            _this.render();
        }

        prevBtn.onclick = function() {
            _this.prevSong();
            currentAudio.play();
            _this.render();
        }

        currentAudio.onended = function() {
            nextBtn.click();
        }

        music_list.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.activeSong)');              
            if (songNode){  
                _this.currentIndex = Number(songNode.dataset.index)
                _this.loadCurrentSong();
                _this.render();
                currentAudio.play(); 
            }
        }
    },

    loadCurrentSong: function() {
        currentName.textContent = this.currentSong.name;
        currentArtist.textContent = this.currentSong.artist;
        currentImg.src = this.currentSong.img;
        currentAudio.src = this.currentSong.music;
    },

    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    started : function() {
        this.defineProperties();
        this.render();
        this.handleEvents(); 
        this.loadCurrentSong();
    }
}
app.started();

log_out.addEventListener('click', () => {
    window.location.assign('./login.html');
})
