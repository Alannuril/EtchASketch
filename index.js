const gridContainer = document.getElementById('grid-container');
const sizeSlider = document.getElementById('size-slider');
const sizeLabel = document.querySelector('label[for="size-slider"]');
const colorPicker = document.getElementById('color-picker');
const eraserButton = document.getElementById('eraser');
const clearButton = document.getElementById('clear');

let currentColor = '#222222'; // Warna default
let isEraserActive = false; // Status eraser

// Fungsi untuk membuat grid
function createGrid(size) {
    gridContainer.innerHTML = ''; // Kosongkan grid
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.addEventListener('mouseover', () => {
            if (isEraserActive) {
                gridItem.style.backgroundColor = ''; // Hapus warna (eraser)
            } else {
                gridItem.style.backgroundColor = currentColor; // Gunakan warna yang dipilih
            }
        });
        gridContainer.appendChild(gridItem);
    }
}

// Fungsi untuk mereset grid (clear)
function clearGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.style.backgroundColor = ''; // Hapus warna dari semua grid item
    });
}

// Event listener untuk slider
sizeSlider.addEventListener('input', () => {
    const size = sizeSlider.value;
    sizeLabel.textContent = `Grid size: ${size} x ${size}`;
    createGrid(size);
});

// Event listener untuk color picker
colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value; // Perbarui warna yang dipilih
    isEraserActive = false; // Nonaktifkan eraser saat memilih warna baru
});

// Event listener untuk eraser button
eraserButton.addEventListener('click', () => {
    isEraserActive = !isEraserActive; // Toggle eraser mode
    eraserButton.classList.toggle('active', isEraserActive); // Tambahkan class 'active' jika eraser aktif
});

// Event listener untuk clear button
clearButton.addEventListener('click', clearGrid);

// Inisialisasi grid awal
createGrid(16);