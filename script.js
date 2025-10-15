'use strict';
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tbody = document.getElementById("tbody");

let petList = JSON.parse(localStorage.getItem('petArr')) || []


const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const renderList = (list) => {
    tbody.innerHTML = '';
    list.forEach((pet, index) => {
        const row = document.createElement("tr");
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
            <td><button class="btn btn-danger btn-delete" data-id="${pet.id}">Delete</button></td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll(".btn-delete").forEach((btn) => {
        btn.addEventListener("click", function() {
            if (confirm('Chắc chắn muốn xóa không?')) {
                const id = this.getAttribute("data-id");
                deletePet(id);
            }
        });
    });
};

const deletePet = (id) => {
    petList = petList.filter((pet) => pet.id !== id);
    localStorage.setItem("petArr", JSON.stringify(petList));
    renderList(petList);
};

const isValidInput = () => {
    if (idInput.value.trim() === '' ||
        nameInput.value.trim() === '' ||
        ageInput.value === '' ||
        weightInput.value === '' ||
        lengthInput.value === '' ||
        typeInput.value === 'Select Type' ||
        breedInput.value === 'Select Breed') {
        alert("Nhập đầy đủ thông tin");
        return false;
    }
    if (petList.some(p => p.id === idInput.value.trim())) {
        alert("Nhập lại Pet ID");
        return false;
    }
    return true;
};

const addPet = () => {
    const newPet = {
        id: idInput.value.trim(),
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
        date: new Date(),
    };
    petList.push(newPet);
    localStorage.setItem("petArr", JSON.stringify(petList));
};

submitBtn.addEventListener("click", function() {
    if (!isValidInput()) return;
    console.log(petList)
    addPet();
    renderList(petList);
    document.querySelector("form").reset();
    typeInput.selectedIndex = 0;
    breedInput.selectedIndex = 0;
});

const checkHealth = () => {
    return petList.filter(pet =>
        pet.vaccinated && pet.dewormed && pet.sterilized
    );
};

let isShowingHealthy = false;

document.getElementById('healthy-btn').addEventListener('click', function() {
    if (!isShowingHealthy) {
        const healthyPets = checkHealth();
        renderList(healthyPets);
        this.textContent = "Show All Pets";
    } else {
        renderList(petList);
        this.textContent = "Show Healthy Pet";
    }

    isShowingHealthy = !isShowingHealthy;
});

document.addEventListener("DOMContentLoaded", () => {
    renderList(petList);
});