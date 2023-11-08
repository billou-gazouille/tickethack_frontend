
console.log("tickethack");

const urlPrefix = 'http://localhost:3000/';

const departureInput = document.getElementById('departure-input');
departureInput.value = 'paris';
const arrivalInput = document.getElementById('arrival-input');
arrivalInput.value = 'lyon';
const dateInput = document.getElementById('date-input');
dateInput.value = '2023-11-07';
const searchButton = document.getElementById('search-btn');



searchButton.addEventListener('click', async function(){
    const dep = departureInput.value;
    const arr = arrivalInput.value;
    const dat = dateInput.value;
    //const resp = await fetch(`${urlPrefix}trips`);
    const url = `${urlPrefix}trips/${dep}/${arr}/${dat}`;
    console.log(url);
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    document.getElementById('results-container').innerHTML = ``;
    for (let tripResult of data.trips){
        console.log(tripResult);
        addTripResult(tripResult);
    }
});


function addTripResult(result){
    const {departure, arrival, date, price} = result;
    const timeHours = new Date(date).getHours();
    const timeMins = new Date(date).getMinutes();
    const resultItem = 
    `<div class="result">
        <div class="result-trip">${departure} > ${arrival}</div>
        <div class="result-time">${timeHours}:${timeMins}</div>
        <div class="result-price">${price}€</div>
        <button class="result-back-btn">Back</button>
    </div>`;
    document.getElementById('results-container').innerHTML += resultItem;
}