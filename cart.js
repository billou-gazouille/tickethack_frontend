
console.log('CART');
const urlPrefix = 'http://localhost:3000/';


async function loadCart(){
    const url = `${urlPrefix}cart/trips`;
    //console.log(url);
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
    const cart = data.cart;
    for(let tripInCart of cart){
        addTripElement(tripInCart.trip);
    }
}



const cartPanel = document.getElementById('cart-panel');


function addTripElement(trip){
    const {departure, arrival, date, price} = trip;
    const timeHours = new Date(date).getHours();
    const timeMins = new Date(date).getMinutes();

    const tripElem = document.createElement('div');
    tripElem.classList.add('tripElem');


    const tripMovmentElem = document.createElement('div');
    tripMovmentElem.classList.add('trip-movement');
    tripMovmentElem.textContent = `${departure} > ${arrival}`;

    const tripTimeElem = document.createElement('div');
    tripTimeElem.classList.add('trip-time');
    tripTimeElem.textContent = `${timeHours}:${timeMins}`;

    const tripPriceElem = document.createElement('div');
    tripPriceElem.classList.add('trip-price');
    tripPriceElem.textContent = `${price}€`;
    
    const deleteTripBtn = document.createElement('button');
    deleteTripBtn.classList.add('delete-trip-btn');
    deleteTripBtn.textContent = `X`;

    tripElem.appendChild(tripMovmentElem);
    tripElem.appendChild(tripTimeElem);
    tripElem.appendChild(tripPriceElem);
    tripElem.appendChild(deleteTripBtn);
    document.getElementById('trips-container').appendChild(tripElem);
    
}


loadCart();