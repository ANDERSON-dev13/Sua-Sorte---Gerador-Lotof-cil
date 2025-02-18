document.addEventListener("DOMContentLoaded", function () {
    const lotofacilBtn = document.getElementById("lotofacil-btn");
    const megasenaBtn = document.getElementById("megasena-btn");
    const gameTypeTitle = document.getElementById("game-type-title");
    const numberGrid = document.getElementById("grid-numbers");
    const resultDisplay = document.getElementById("result");
    const numberToGenerateInput = document.getElementById("number-to-generate");
    const gameTypeIndicator = document.getElementById("game-type-indicator");
    let gameType = "lotofacil";

    // Definição dos números
    const lotofacilNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
    const megasenaNumbers = Array.from({ length: 60 }, (_, i) => i + 1);

    let chosenNumbers = [];

    function generateGrid(numbers) {
        numberGrid.innerHTML = "";
        chosenNumbers = [];
        numbers.forEach(num => {
            const numberBox = document.createElement("div");
            numberBox.textContent = num;
            numberBox.dataset.number = num;
            numberBox.classList.add("number-box");
            numberBox.addEventListener("click", function () {
                const number = parseInt(this.dataset.number);
                if (chosenNumbers.includes(number)) {
                    chosenNumbers.splice(chosenNumbers.indexOf(number), 1);
                    this.classList.remove("selected");
                } else if (chosenNumbers.length < (gameType === "lotofacil" ? 5 : 6)) {
                    chosenNumbers.push(number);
                    this.classList.add("selected");
                } else {
                    alert(`Você só pode escolher ${gameType === "lotofacil" ? 5 : 6} números!`);
                }
            });
            numberGrid.appendChild(numberBox);
        });
    }

    function generateGame() {
        const numbersToGenerate = parseInt(numberToGenerateInput.value);
        let selectedNumbers = [...chosenNumbers];
        const allNumbers = gameType === "lotofacil" ? lotofacilNumbers : megasenaNumbers;

        // Validação do número a ser gerado
        if ((gameType === "lotofacil" && (numbersToGenerate < 15 || numbersToGenerate > 20)) ||
            (gameType === "megasena" && (numbersToGenerate < 6 || numbersToGenerate > 20))) {
            alert("Número inválido! Escolha um valor dentro do limite permitido.");
            return;
        }

        while (selectedNumbers.length < numbersToGenerate) {
            let num = allNumbers[Math.floor(Math.random() * allNumbers.length)];
            if (!selectedNumbers.includes(num)) {
                selectedNumbers.push(num);
            }
        }
        selectedNumbers.sort((a, b) => a - b);
        resultDisplay.innerHTML += `<p><strong>${gameType.toUpperCase()}:</strong> ${selectedNumbers.join(", ")}</p>`;
    }

    lotofacilBtn.addEventListener("click", function () {
        gameType = "lotofacil";
        gameTypeTitle.textContent = "Lotofácil";
        gameTypeIndicator.innerHTML = "Jogo atual: <strong>Lotofácil</strong>";
        numberToGenerateInput.min = 15;
        numberToGenerateInput.max = 20;
        numberToGenerateInput.value = 15;
        generateGrid(lotofacilNumbers);
    });

    megasenaBtn.addEventListener("click", function () {
        gameType = "megasena";
        gameTypeTitle.textContent = "Mega-Sena";
        gameTypeIndicator.innerHTML = "Jogo atual: <strong>Mega-Sena</strong>";
        numberToGenerateInput.min = 6;
        numberToGenerateInput.max = 20;
        numberToGenerateInput.value = 6;
        generateGrid(megasenaNumbers);
    });

    document.getElementById("generate-btn").addEventListener("click", generateGame);
    document.getElementById("clear-btn").addEventListener("click", function () {
        chosenNumbers.length = 0;
        resultDisplay.innerHTML = "";
        document.querySelectorAll(".number-box").forEach(el => el.classList.remove("selected"));
    });

    generateGrid(lotofacilNumbers);
});
