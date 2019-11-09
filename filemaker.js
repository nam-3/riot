// const fs = require('fs'); //노드js의 파일 시스템

// fs.readFile("champ.json","utf8",(err,data)=>{
//     console.log(data);
// });
// console.log("끝");
let fs = require('fs');
let json = fs.readFileSync("champ.json","utf8");
json = JSON.parse(json);

let champList = json.data;
console.log(champList['Zyra']);

let keyList = Object.keys(champList);

let myJson = [];

for(let i=0; i < keyList.length; i++){
    let item = champList[keyList[i]];
    let myItem = {name:item.name, id:item.id, img:item.image.full};
    myJson[item.key] = myItem;
}

fs.writeFileSync("myChamp.json", JSON.stringify(myJson), "utf8");
