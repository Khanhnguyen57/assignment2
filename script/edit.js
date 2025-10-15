'use strict';

const tbody = document.getElementById('tbody');
const formContainer = document.getElementById('container-form');
const submitBtn = document.getElementById('submit-btn');

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');


let petArr = JSON.parse(localStorage.getItem('petArr')) || [];


const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const renderTable = (list) => {
    tbody.innerHTML = ''
    list.forEach(pet => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <th scope="row">${pet.id}</th>
            <td>${pet.name}</td>
            <td>${pet.age}</td>
            <td>${pet.type}</td>
            <td>${pet.weight} kg</td>
            <td>${pet.length} cm</td>
            <td>${pet.breed}</td>
            <td><i class="bi bi-square-fill" style="color: ${pet.color}"></i></td>
            <td><i class="bi ${pet.vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
            <td><i class="bi ${pet.dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
            <td><i class="bi ${pet.sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
            <td>${formatDate(pet.date)}</td>
            <td><button class="btn btn-warning btn-edit" onclick="startEdit('${pet.id}')">Edit</button></td>
        `
        tbody.appendChild(row);
    });
}
let currentID = null
const startEdit = (id) => {
    const pet = petArr.find((p) => p.id === id)
    if (!pet) return;

    currentID = id;
    formContainer.classList.remove('hide');

    idInput.value = pet.id;
    nameInput.value = pet.name;
    ageInput.value = pet.age;
    typeInput.value = pet.type;
    weightInput.value = pet.weight;
    lengthInput.value = pet.length;
    colorInput.value = pet.color;
    breedInput.value = pet.breed;
    vaccinatedInput.checked = pet.vaccinated;
    dewormedInput.checked = pet.dewormed;
    sterilizedInput.checked = pet.sterilized;
}

submitBtn.addEventListener('click', function() {
    const petIndex = petArr.findIndex((p) => p.id === currentID)
    if (petIndex === -1) return;

    petArr[petIndex] = {
        id: currentID,
        name: nameInput.value.trim(),
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseFloat(weightInput.value),
        length: parseFloat(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
    }
    localStorage.setItem('petArr', JSON.stringify(petArr));
    formContainer.classList.add('hide');
    renderTable(petArr);
})

document.addEventListener('DOMContentLoaded', function() {
    renderTable(petArr)
})