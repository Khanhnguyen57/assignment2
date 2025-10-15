'use strict';

const breedInputEl = document.getElementById('input-breed');
const breedArrHtml = JSON.parse(localStorage.getItem('breedList')) || [];

const renderBreedList = (breedArr) => {
    breedInputEl.innerHTML = '<option value="">Select Breed</option>';
    breedArrHtml.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.Breed;
        option.textContent = breed.Breed;
        breedInputEl.appendChild(option);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    renderBreedList(breedArrHtml);
});