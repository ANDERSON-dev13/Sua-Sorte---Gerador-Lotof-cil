// Definição dos números internos e externos
const internos = [7, 8, 9, 12, 13, 14, 17, 18, 19];
const externos = [1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24, 25];

// Definição das cores e seus números
const cores = {
    "vermelha": [1, 11, 21],
    "amarela": [2, 12, 22],
    "verde": [3, 13, 23],
    "marrom": [4, 14, 24],
    "azul": [5, 15, 25],
    "rosa": [6, 16],
    "preta": [7, 17],
    "cinza": [8, 18],
    "laranja": [9, 19],
    "branca": [10, 20]
};

// Percentuais baseados na análise
const percentualInternos = 0.3583;
const percentualExternos = 0.6417;

const chosenNumbers = [];

document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById("grid-numbers");
    const chosenNumbersList = document.getElementById("chosen-numbers");

    for (let i = 1; i <= 25; i++) {
        const numberBox = document.createElement("div");
        numberBox.textContent = i;
        numberBox.dataset.number = i;

        numberBox.addEventListener("click", function () {
            const number = parseInt(this.dataset.number);

            if (chosenNumbers.includes(number)) {
                chosenNumbers.splice(chosenNumbers.indexOf(number), 1);
                this.classList.remove("selected");
            } else if (chosenNumbers.length < 5) {
                chosenNumbers.push(number);
                this.classList.add("selected");
            } else {
                alert("Você só pode escolher 5 números!");
            }
            updateChosenList();
        });

        gridContainer.appendChild(numberBox);
    }

    function updateChosenList() {
        chosenNumbersList.innerHTML = "";
        chosenNumbers.forEach(num => {
            const li = document.createElement("li");
            li.textContent = num;
            chosenNumbersList.appendChild(li);
        });
    }
});

function generateGame() {
    const numbersToGenerate = parseInt(document.getElementById("number-to-generate").value) || 15;

    if (numbersToGenerate < 15 || numbersToGenerate > 20) {
        alert("Por favor, escolha um número entre 15 e 20.");
        return;
    }

    const numbersRemaining = numbersToGenerate - chosenNumbers.length;

    // Padrão 1 - Quadrante
    const totalInternos = Math.round(numbersRemaining * percentualInternos);
    const totalExternos = numbersRemaining - totalInternos;
    
    let selectedInternos = [];
    let selectedExternos = [];

    while (selectedInternos.length < totalInternos) {
        let num = internos[Math.floor(Math.random() * internos.length)];
        if (!selectedInternos.includes(num) && !chosenNumbers.includes(num)) {
            selectedInternos.push(num);
        }
    }

    while (selectedExternos.length < totalExternos) {
        let num = externos[Math.floor(Math.random() * externos.length)];
        if (!selectedExternos.includes(num) && !selectedInternos.includes(num) && !chosenNumbers.includes(num)) {
            selectedExternos.push(num);
        }
    }

    let quadranteNumbers = [...chosenNumbers, ...selectedInternos, ...selectedExternos].sort((a, b) => a - b);
    
    // Padrão 2 - Cores
    let selectedColors = [...chosenNumbers];
    const allNumbers = Array.from({ length: 25 }, (_, i) => i + 1);

    while (selectedColors.length < numbersToGenerate) {
        let num = allNumbers[Math.floor(Math.random() * allNumbers.length)];
        if (!selectedColors.includes(num)) {
            selectedColors.push(num);
        }
    }

    let colorNumbers = selectedColors.sort((a, b) => a - b);
    
    document.getElementById("result").innerHTML += `
        <div class='result-section'>
            <h3>Padrão 1 - Quadrante</h3>
            <p>${quadranteNumbers.join(", ")}</p>
        </div>
        <div class='result-section'>
            <h3>Padrão 2 - Cores</h3>
            <p>${colorNumbers.join(", ")}</p>
        </div>`;
}

document.getElementById("generate-btn").addEventListener("click", generateGame);
document.getElementById("generate-more-btn").addEventListener("click", generateGame);

document.getElementById("clear-btn").addEventListener("click", function () {
    chosenNumbers.length = 0;
    document.getElementById("result").innerHTML = "";
    document.querySelectorAll("#grid-numbers div").forEach(el => el.classList.remove("selected"));
});
