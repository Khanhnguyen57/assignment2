'use strict';

const tbody = document.getElementById('tbody');
const formContainer = document.getElementById('container-form');
const submitBtn = document.getElementById('submit-btn');

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const typeInput = document.getElementById('input-type');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const findBtn = document.getElementById('find-btn')

let petArr = JSON.parse(localStorage.getItem('petArr')) || []
let findList = []
const breedSearch = JSON.parse(localStorage.getItem('breedList'))

const renderBreed = (type) => {
    breedInput.innerHTML = '<option>Select Breed</option>';
    const filteredBreeds = breedSearch.filter(b => b.Type === type);
    filteredBreeds.forEach(b => {
        const option = document.createElement('option');
        option.value = b.Breed;
        option.textContent = b.Breed;
        breedInput.appendChild(option);
    });
};

// Khi chọn Type -> cập nhật Breed tương ứng
typeInput.addEventListener('change', function() {
    const selectedType = this.value;
    if (selectedType === 'Select Type') {
        breedInput.innerHTML = '<option>Select Breed</option>';
    } else {
        renderBreed(selectedType);
    }
});

const filterPets = () => {
    const idValue = idInput.value
    const nameValue = nameInput.value
    const typeValue = typeInput.value
    const breedValue = breedInput.value
    const vaccinatedCheck = vaccinatedInput.checked;
    const dewormedCheck = dewormedInput.checked;
    const sterilizedCheck = sterilizedInput.checked;

    const filtered = petArr.filter(pet =>
        pet.id.includes(idValue) &&
        pet.name.includes(nameValue) &&
        (typeValue === 'Select Type' || pet.type === typeValue) &&
        (breedValue === '' || pet.breed.includes(breedValue)) &&
        (!vaccinatedCheck || pet.vaccinated) &&
        (!dewormedCheck || pet.dewormed) &&
        (!sterilizedCheck || pet.sterilized)
    );
    findList = filtered
}

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

findBtn.addEventListener('click', function() {
    filterPets()
    renderTable(findList)
    console.log(findList)
})