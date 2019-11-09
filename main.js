const {ipcRenderer} = require('electron');

window.addEventListener("keydown",(e)=>{
    if(e.ctrlKey && e.key.toLowerCase() == "q"){
        ipcRenderer.send("openDev");
    }
});

window.addEventListener("load",()=>{
let name = document.querySelector("#txtName");
let searchBtn = document.querySelector("#search");

searchBtn.addEventListener("click",(e)=>{
    let str = name.value;
    console.log(str);
    ipcRenderer.send("summoner",{name:str});
    });

    ipcRenderer.on("summonererData",(e,data)=>{
        let s = data.summoner;
        let html = summonerTemplate(
            s.profileIconId, 
            s.name, s.summonerLevel, 
            s.revisionDate);

        let sDiv = document.querySelector(".summoner");
        sDiv.innerHTML = html;
        
        let mDiv = document.querySelector(".matchList");
        let m = data.match; //전적 100개가 가져와 짐
        m.forEach(x=>{
            let div = matchTemplate(x);
            mDiv.appendChild(div);
        });
    // console.log(data);
    });
});

function summonerTemplate(icon, name, level, date){
    

    return `<div class="img-wrapper">
            <img src="./image/profileIcon/${icon}.png" alt="">
            </div>
            <div class="text-wrapper">
            <div class="info">
                <span>소환사 이름</span> <span id="${name}">위대한트린</span>
            </div>
            <div class="info">
                <span>소환사 레벨</span> <span id="${level}">98</span>
            </div>
            <div class="info">
                <span>최종 갱신일</span> <span id="${date}"></span>
            </div>
            </div>`
}

function matchTemplate(match){
    let champ = champData[match.champion];
    let html = `
    <div class="img-wrapper">
            <img src="./image/champion/${champ.img}" alt="챔피언">
        </div>
        <div class="up">
            <div class="match-info"><span>${match.lane}</span></div>
            <div class="match-info"><span>${match.name}</span></div>
            <div class="match-info"><span>${match.platformId}</span></div>
            <div class="match-info"><span>${match.season}</span></div>
        </div>
        <div class="down">
            <div class="match-info"><span>${match.queue}</span></div>
            <div class="match-info"><span>${match.role}</span></div>
            <div class="match-info"><span>${match.timestamp}</span></div>
        </div>`;
let div = document.createElement("div");
div.classList.add("match");
div.innerHTML = html;

return div;
}