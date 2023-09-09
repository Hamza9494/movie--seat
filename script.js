const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const movie = document.querySelector('.movie');
let ticketPrice = +movie.value;
const count = document.querySelector('.count');
const total = document.querySelector('.total');

// add movie data to local storage
function addMovieData(movieIndex, moviePrice) {
  localStorage.setItem('movieIndex', movieIndex);
  localStorage.setItem('moviePrice', moviePrice);
}

// udpate count and total
function udpateSelectedSeats() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const totalSeats = selectedSeats.length;
  count.textContent = totalSeats;
  const totalPrice = totalSeats * ticketPrice;
  total.textContent = totalPrice;

  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('SelectedSeatsIndex', JSON.stringify(seatIndex));
}

//update ticket value
movie.addEventListener('change', (e) => {
  ticketPrice = e.target.value;
  udpateSelectedSeats();
  addMovieData(e.target.selectedIndex, e.target.value);
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
