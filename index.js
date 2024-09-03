const dice = document.getElementById('dice-inside');
const adviceId = document.getElementById('adviceId');
const advice = document.getElementById('advice');
let displayElement = document.getElementById('display');

function fetchAdvice() {
fetch('https://api.adviceslip.com/advice')
.then(response => response.json())
.then(data => {
advice.innerHTML = data.slip.advice;
adviceId.innerHTML = data.slip.id
})

dice.addEventListener('click', () => {
fetchAdvice();
});

window.addEventListener('load', fetchAdvice());
