// This script is meant to get and set the current date in the footer

// Get the current year for copyright
let year = new Date().getFullYear();
let currentYearSpan = document.getElementById('current-year');
currentYearSpan.innerText = year;

// Get current date and format it in footer
let date = new Date().toDateString();
let currentDateSpan = document.getElementById('current-date');
currentDateSpan.innerText = date;
