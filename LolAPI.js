const req = require('request');

module.exports = class LolAPI {
    constructor(){
        //속성
        this.key = "RGAPI-ba5d22ae-e6dc-4af8-a98f-f822ef0506cd";
    }
    //기능
    loadSummoner(name){
        return new Promise((resolve,reject)=>{
            let url = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
            name = encodeURI(name);
            const key = this.key;
            req.get(`${url}${name}?api_key=${this.key}`, (err, res, body)=>{
                let json = JSON.parse(body);
                let accId = json.accountId;
                let matchUrl = `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accId}?api_key=${key}`;
            
                req.get(matchUrl, (err, res, body)=>{
                    let matchJson = JSON.parse(body).matches;
                    resolve({summoner:json, match:matchJson});
                });
            });
        });
    }
}