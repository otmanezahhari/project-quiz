const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const namePlayer = document.getElementById('name-player');


finalScore.innerHTML =`Score : ${localStorage.getItem('gameScore')}%`;
namePlayer.innerHTML =`Player Name : ${localStorage.getItem("name")}`;

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

saveScoreBtn.onclick = (ev)=>{
  ev.preventDefault();
  let tempArr = [...highScores];
  const newItem = {
    Name :localStorage.getItem("name"),
    Score : localStorage.getItem('gameScore') 
  };
  tempArr.push(newItem);
  tempArr.sort((a,b) => b.Score - a.Score);
  tempArr.splice(5);
  localStorage.setItem('highScores',JSON.stringify(tempArr));
  saveScoreBtn.classList.add('disable');
}