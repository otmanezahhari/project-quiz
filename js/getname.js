const inputName = document.querySelector('#name');
const playBtn = document.getElementById('play')



console.log(playBtn);
playBtn.onclick = ()=>{
  const tempInput = (inputName.value !=='')? inputName.value : 'Unknown';

  localStorage.setItem("name",tempInput);
}
