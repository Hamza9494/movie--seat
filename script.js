const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const movie = document.querySelector('.movie');
let ticketPrice = +movie.value;
const count = document.querySelector('.count');
const total = document.querySelector('.total');

// udpate count and total
function udpateSelectedSeats() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const totalSeats = selectedSeats.length;
  count.textContent = totalSeats;

  const totalPrice = totalSeats * ticketPrice;
  total.textContent = totalPrice;
}

//change ticket value
movie.addEventListener('change', (e) => {
  ticketPrice = e.target.value;
  udpateSelectedSeats();
});

//add class of selected to selected seats
seats.forEach((seat) => {
  seat.addEventListener('click', (e) => {
    if (e.target.classList.contains('occupied')) {
      return;
    }
    e.target.classList.toggle('selected');
    udpateSelectedSeats();
  });
});
