const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const movie = document.querySelector('.movie');
let ticketPrice = +movie.value;
const count = document.querySelector('.count');
const total = document.querySelector('.total');

populateUI();

// add movie data to local storage
function addMovieData(movieIndex, moviePrice) {
  localStorage.setItem('movieIndex', movieIndex);
  localStorage.setItem('moviePrice', moviePrice);
}

// udpate count and total
function udpateSelectedSeats() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const totalSeats = selectedSeats.length;

  const totalPrice = totalSeats * ticketPrice;
  total.textContent = totalPrice;

  count.textContent = totalSeats;

  //add selected movies to local storage
  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('SelectedSeatsIndex', JSON.stringify(seatIndex));
}

//update ticket value
movie.addEventListener('change', (e) => {
  ticketPrice = e.target.value;
  udpateSelectedSeats();

  //add movie data to local storage
  addMovieData(e.target.selectedIndex, e.target.value);
});

// populate ui from local storage
function populateUI() {
  const selectedSeatsIndex = JSON.parse(
    localStorage.getItem('SelectedSeatsIndex')
  );

  if (selectedSeatsIndex.length > 0 && selectedSeatsIndex) {
    seats.forEach((seat, index) => {
      if (selectedSeatsIndex.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const movieIndex = localStorage.getItem('movieIndex');
  if (movieIndex) {
    movie.selectedIndex = movieIndex;
  }
}
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

//sets the initial count and total from local storage
udpateSelectedSeats();
