
const gitem = document.getElementsByClassName("gitem");
gitem[0].setAttribute("style", "background-color: #d9e7f3;")
gitem[3].setAttribute("style", "background-color: #d9e7f3;")
gitem[4].setAttribute("style", "background-color: #d9e7f3;")

gitem[1].setAttribute("style", "background-color: #fffaf1;")
gitem[2].setAttribute("style", "background-color: #fffaf1;")
gitem[5].setAttribute("style", "background-color: #fffaf1;")

const toPlaylist = document.getElementsByClassName("toPlaylist");

for (let i = 0; i < toPlaylist.length; i++) {
    toPlaylist[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>'

}

const playbuttonS = document.getElementsByClassName("playbuttonS");

for (let i = 0; i < toPlaylist.length; i++) {
    playbuttonS[i].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>'
}
///////////////////////////////////////////////
// Making api request
const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ce6cfe8ea2msh3947f12a299022fp1f0672jsnca5a25db5f50',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
};
async function makeRequest() {
    let req = await fetch(url, options);
    let res = await req.json();

    res.data.forEach(item => {
        let div = document.createElement("div");
        div.className = "song";
        div.id = item.title;
        div.innerHTML = `
        <div class="art">
        <div class="picture" style="background:url(${item.album.cover})"></div>
        <h3>${item.title}</h3>
        <h4>${item.artist.name}</h4>
      </div>
        `
        document.querySelector(".tmain").append(div)
    })
    let currentIndex;
    // Showing song when clicked
    document.querySelectorAll(".song").forEach(item => {
        item.onclick = () => {
            res.data.forEach(data => {
                if (data.title == item.id) {
                    currentIndex = res.data.indexOf(data);
                    document.querySelector(".nowPlaying .picture").style = `background:url(${data.album.cover}) no-repeat`
                    document.querySelector(".nowPlaying h1").innerHTML = data.title;
                    document.querySelector(".nowPlaying h3").innerHTML = data.artist.name;
                    document.querySelector("audio").src = data.preview;
                    document.querySelector("audio").play()
                    document.querySelector(".Play i").classList.replace("fa-play", "fa-pause");
                }
            })
        }
    })
    // Playing Song When Play ICOn is Clicked
    document.querySelector(".Play").onclick = () => {
        if (document.querySelector(".Play i").classList.contains("fa-play")) {
            document.querySelector("audio").play()
            document.querySelector(".Play i").classList.replace("fa-play", "fa-pause");
        } else {
            document.querySelector("audio").pause()
            document.querySelector(".Play i").classList.replace("fa-pause", "fa-play");
        }

    }
    document.querySelector(".next").onclick = () => {
        currentIndex += 1;
        if (currentIndex == res.data.length) {
            currentIndex = 0;
        }
        document.querySelector(".nowPlaying .picture").style = `background:url(${res.data[currentIndex].album.cover}) no-repeat`
        document.querySelector(".nowPlaying h1").innerHTML = res.data[currentIndex].title;
        document.querySelector(".nowPlaying h3").innerHTML = res.data[currentIndex].artist.name;
        document.querySelector("audio").src = res.data[currentIndex].preview;
        document.querySelector("audio").play()

    }

    document.querySelector(".prev").onclick = () => {
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = res.data.length - 1;
        }
        document.querySelector(".nowPlaying .picture").style = `background:url(${res.data[currentIndex].album.cover}) no-repeat`
        document.querySelector(".nowPlaying h1").innerHTML = res.data[currentIndex].title;
        document.querySelector(".nowPlaying h3").innerHTML = res.data[currentIndex].artist.name;
        document.querySelector("audio").src = res.data[currentIndex].preview;
        document.querySelector("audio").play()

    }

    document.querySelector("audio").onended = () => {
        currentIndex += 1;
        if (currentIndex == res.data.length) {
            currentIndex = 0;
        }
        document.querySelector(".nowPlaying .picture").style = `background:url(${res.data[currentIndex].album.cover}) no-repeat`
        document.querySelector(".nowPlaying h1").innerHTML = res.data[currentIndex].title;
        document.querySelector(".nowPlaying h3").innerHTML = res.data[currentIndex].artist.name;
        document.querySelector("audio").src = res.data[currentIndex].preview;
        document.querySelector("audio").play()
    }
}

makeRequest();
