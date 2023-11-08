
console.log("tickethack");

const urlPrefix = 'http://localhost:3000/';

const departureInput = document.getElementById('departure-input');
departureInput.value = 'paris';
const arrivalInput = document.getElementById('arrival-input');
arrivalInput.value = 'lyon';
const dateInput = document.getElementById('date-input');
dateInput.value = '2023-11-07';
const searchButton = document.getElementById('search-btn');

const elementIdPairs = [];



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
    const {_id, departure, arrival, date, price} = result;
    const timeHours = new Date(date).getHours();
    const timeMins = new Date(date).getMinutes();

    console.log(_id);

    const resultElem = document.createElement('div');
    resultElem.classList.add('result');
    elementIdPairs.push({element: resultElem, _id: _id});

    const resultTripElem = document.createElement('div');
    resultTripElem.classList.add('result-trip');
    resultTripElem.textContent = `${departure} > ${arrival}`;

    const resultTimeElem = document.createElement('div');
    resultTimeElem.classList.add('result-time');
    resultTimeElem.textContent = `${timeHours}:${timeMins}`;

    const resultPriceElem = document.createElement('div');
    resultPriceElem.classList.add('result-price');
    resultPriceElem.textContent = `${price}€`;

    const resultBookBtn = document.createElement('button');
    resultBookBtn.textContent = `Book`;
    resultBookBtn.addEventListener('click', function(){
        const tripId = elementIdPairs.find(pair => pair.element === this.parentElement)._id;
        console.log(tripId);
        AddToCart(tripId);
    });

    resultElem.appendChild(resultTripElem);
    resultElem.appendChild(resultTimeElem);
    resultElem.appendChild(resultPriceElem);
    resultElem.appendChild(resultBookBtn);
    document.getElementById('results-container').appendChild(resultElem);
}


async function AddToCart(tripId){
    const url = `${urlPrefix}cart/addTrip`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({tripId: tripId})
      });
    const cart = await response.json();
    //console.log(cart);
    window.location.assign('./cart.html');
}