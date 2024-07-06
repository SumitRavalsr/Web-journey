console.log('Initializing Js');
let currentsong=new Audio();


function secondsToMinutesSeconds(seconds){
    if(isNaN(seconds) || seconds<0)
        return "00:00";

    const minutes = Math.floor(seconds/60);
    const reaminingseconds= Math.floor(seconds%60);

    const formatedminutes = String(minutes).padStart(2, '0');
    const formatedseconds = String(reaminingseconds).padStart(2,'0');

    return `${formatedminutes}:${formatedseconds}`;

}
async function getSongs(){

    let a=await fetch("http://127.0.0.1:3000/songs/");
    let response=await a.text();    
    // console.log(response);   

    let div= document.createElement("div");
    div.innerHTML = response;
    let as =   div.getElementsByTagName("a");
    let songs=[];
    for(let index=0;index<as.length;index++){
        const element=as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;


    
}

const playmusic=(track,pause = false)=>{
    // let audio = new Audio("/songs/"+track);
    currentsong.src = "/songs/"+track;

    if(!pause){
        
        currentsong.play();
        play.src="pause.svg";
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00";
}

async function main(){    


    // Get the list of all songs
    let songs = await getSongs();
    // console.log(songs);
    playmusic(songs[0],true);


    // Show all the songs in the playlist
    let songUl = document.querySelector('.songlist').getElementsByTagName('ul')[0]
    for(const song of songs){
        // songUl.innerHTML=songUl.innerHTML + `<li> ${song.replaceAll("%20"," ")}</li>`;
        songUl.innerHTML=songUl.innerHTML + `<li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>Krishna</div>
                                
                            </div>
                            <div class="playnow">
                                <span>
                                    Play now
                                </span>
                                <img class ="invert" src="play.svg" alt="">
                            </div>
                        </li>`;
    }

    // Attach an event listner to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{

        console.log(e.querySelector(".info").firstElementChild.innerHTML);
        
        e.addEventListener("click",element=>{
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());

        })
        
    })

    // // Play the first song
    // var audio=new Audio(songs[0]);
    // // audio.play();
    
    // audio.addEventListener("loadeddata",()=>{
    //     console.log(audio.duration,audio.currentSrc,audio.currentTime);
    // })

    // attach an event listner to play,next and previous
    play.addEventListener("click",()=>{
        if(currentsong.paused){
            currentsong.play();
            play.src = "pause.svg"
        }
        else{
            currentsong.pause();
            play.src = "play.svg"
        }
    })

    // listen for time update event

    currentsong.addEventListener("timeupdate",()=>{
        // console.log(currentsong.currentTime,currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = ( currentsong.currentTime/ currentsong.duration) * 100 + '%';
    })

    // Add an eventlistner to sick bar

    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration*percent))/100;
    })
}           
main()     