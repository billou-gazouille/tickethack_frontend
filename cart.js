
console.log('CART');
const urlPrefix = 'http://localhost:3000/';

const elementIdPairs = [];


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


async function RemoveTripFromCart(tripId){
    const url = `${urlPrefix}cart`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({tripId: tripId})
      });
    const data = await response.json();
    //console.log(data);
}




const cartPanel = document.getElementById('cart-panel');


function addTripElement(trip){
    console.log('AAA ', trip);
    const {_id, departure, arrival, date, price} = trip;
    const timeHours = new Date(date).getHours();
    const timeMins = new Date(date).getMinutes();

    const tripElem = document.createElement('div');
    tripElem.classList.add('tripElem');
    elementIdPairs.push({element: tripElem, _id: _id});


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
    deleteTripBtn.addEventListener('click', async function(){
        const tripId = elementIdPairs.find(pair => pair.element === this.parentElement)._id;
        await RemoveTripFromCart(tripId);
        tripElem.remove();
    });

    tripElem.appendChild(tripMovmentElem);
    tripElem.appendChild(tripTimeElem);
    tripElem.appendChild(tripPriceElem);
    tripElem.appendChild(deleteTripBtn);
    document.getElementById('trips-container').appendChild(tripElem);
    
}


loadCart();

document.getElementById('purchase-btn').addEventListener('click', function(){
    // fetch a route which will send cart into booking
});