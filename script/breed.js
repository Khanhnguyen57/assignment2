'use strict';

const inputBreed = document.getElementById('input-breed');
const inputType = document.getElementById('input-type');
const submitBtn = document.getElementById('submit-btn');
const tbody = document.getElementById('tbody');

let breedArr = JSON.parse(localStorage.getItem('breedList')) || [];

const isValidInput = () => {
    if (!inputBreed.value.trim()) {
        alert('Không được để trống giống loài');
        return false;
    }
    if (inputType.value === 'Select Type') {
        alert('Vui lòng chọn loại thú cưng');
        return false;
    }
    if (breedArr.some(b => b.Breed.toLowerCase() === inputBreed.value.trim().toLowerCase())) {
        alert('Giống loài này đã tồn tại!');
        return false;
    }
    return true;
};

const renderList = (list) => {
    tbody.innerHTML = '';
    list.forEach((breed, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${breed.Breed}</td>
      <td>${breed.Type}</td>
      <td>
        <button class="btn btn-danger btn-delete" data-id="${breed.id}">
          Delete
        </button>
      </td>
    `;
        tbody.appendChild(row);
    });

    document.querySelectorAll('.btn-delete').forEach((btn) => {
        btn.addEventListener('click', function() {
            const id = Number(this.dataset.id);
            deleteBreed(id);
        });
    });
};

const addBreed = () => {
    const newBreed = {
        id: Date.now(),
        Breed: inputBreed.value.trim(),
        Type: inputType.value,
    };
    breedArr.push(newBreed);
    localStorage.setItem('breedList', JSON.stringify(breedArr));
    renderList(breedArr);
};

const deleteBreed = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa giống loài này không?')) {
        breedArr = breedArr.filter((b) => b.id !== id);
        localStorage.setItem('breedList', JSON.stringify(breedArr));
        renderList(breedArr);
    }
};

submitBtn.addEventListener('click', () => {
    if (!isValidInput()) return;
    addBreed();
    inputBreed.value = '';
    inputType.selectedIndex = 0;
});

document.addEventListener('DOMContentLoaded', () => {
    renderList(breedArr);
});