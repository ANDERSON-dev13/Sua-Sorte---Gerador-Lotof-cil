document.addEventListener("DOMContentLoaded", function () {
    const lotofacilBtn = document.getElementById("lotofacil-btn");
    const megasenaBtn = document.getElementById("megasena-btn");
    const gameTypeTitle = document.getElementById("game-type-title");
    const gameTypeIndicator = document.getElementById("game-type-indicator"); 
    const resultDisplay = document.getElementById("result");
    const numberGrid = document.getElementById("grid-numbers");
    const usePatternCheckbox = document.getElementById("distribution-toggle");
    const numberToGenerateInput = document.getElementById("number-to-generate"); 
    const generateBtn = document.getElementById("generate-btn");
    const clearBtn = document.getElementById("clear-btn");
    let gameType = "lotofacil";

    // Definição dos números fixos
    const lotofacilNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
    const megasenaNumbers = Array.from({ length: 60 }, (_, i) => i + 1);

    // Grupos estatísticos da Lotofácil
    const lotofacilGroup1 = [1, 11, 21, 2, 12, 22, 3, 13, 23, 4, 14, 24, 5, 15, 25];
    const lotofacilGroup2 = [6, 16, 7, 17, 8, 18, 9, 19, 10, 20];

    // Grupos estatísticos da Mega-Sena
    const megasenaGroup1 = [];
    const megasenaGroup2 = [];

    for (let i = 1; i <= 60; i++) {
        if ([1, 2, 3, 4, 5].includes(i % 10)) {
            megasenaGroup1.push(i);
        } else {
            megasenaGroup2.push(i);
        }
    }

    function generateNumberGrid() {
        numberGrid.innerHTML = ""; // Limpa a tabela antes de recriar

        const allNumbers = gameType === "lotofacil" ? lotofacilNumbers : megasenaNumbers;

        allNumbers.forEach(num => {
            const numElement = document.createElement("div");
            numElement.classList.add("number-box"); // Mantém a cor padrão do layout
            numElement.textContent = num;
            numberGrid.appendChild(numElement);
        });
    }

    function updateNumberInputRange() {
        if (gameType === "lotofacil") {
            numberToGenerateInput.min = 15;
            numberToGenerateInput.max = 20;
            numberToGenerateInput.value = 15;
        } else {
            numberToGenerateInput.min = 6;
            numberToGenerateInput.max = 15;
            numberToGenerateInput.value = 6;
        }
    }

    function updateGameIndicator() {
        gameTypeIndicator.innerHTML = `Jogo atual: <strong>${gameType === "lotofacil" ? "Lotofácil" : "Mega-Sena"}</strong>`;
    }

    function generateGame() {
        let selectedNumbers = [];
        let totalNumbers = parseInt(numberToGenerateInput.value);
        const usePattern = usePatternCheckbox.checked;

        if (usePattern) {
            let group1Count = Math.round(totalNumbers * 0.6417);
            let group2Count = totalNumbers - group1Count;

            const group1 = gameType === "lotofacil" ? lotofacilGroup1 : megasenaGroup1;
            const group2 = gameType === "lotofacil" ? lotofacilGroup2 : megasenaGroup2;

            while (selectedNumbers.length < group1Count) {
                let num = group1[Math.floor(Math.random() * group1.length)];
                if (!selectedNumbers.includes(num)) {
                    selectedNumbers.push(num);
                }
            }

            while (selectedNumbers.length < totalNumbers) {
                let num = group2[Math.floor(Math.random() * group2.length)];
                if (!selectedNumbers.includes(num)) {
                    selectedNumbers.push(num);
                }
            }
        } else {
            const allNumbers = gameType === "lotofacil" ? lotofacilNumbers : megasenaNumbers;

            while (selectedNumbers.length < totalNumbers) {
                let num = allNumbers[Math.floor(Math.random() * allNumbers.length)];
                if (!selectedNumbers.includes(num)) {
                    selectedNumbers.push(num);
                }
            }
        }

        selectedNumbers.sort((a, b) => a - b);

        const gameContainer = document.createElement("div");
        gameContainer.classList.add("game-result");
        gameContainer.innerHTML = `<p><strong>${gameType.toUpperCase()}:</strong> </p>`;

        selectedNumbers.forEach((num, index) => {
            setTimeout(() => {
                const numElement = document.createElement("span");
                numElement.classList.add("sorteado");
                numElement.textContent = num;
                numElement.style.animationDelay = `${index * 0.2}s`;

                gameContainer.appendChild(numElement);
            }, index * 200);
        });

        resultDisplay.appendChild(gameContainer);
    }

    // Eventos para alternar entre Lotofácil e Mega-Sena
    lotofacilBtn.addEventListener("click", function () {
        gameType = "lotofacil";
        gameTypeTitle.textContent = "Lotofácil";
        updateNumberInputRange();
        generateNumberGrid();
        updateGameIndicator();
    });

    megasenaBtn.addEventListener("click", function () {
        gameType = "megasena";
        gameTypeTitle.textContent = "Mega-Sena";
        updateNumberInputRange();
        generateNumberGrid();
        updateGameIndicator();
    });

    // Eventos para os botões
    generateBtn.addEventListener("click", generateGame);
    clearBtn.addEventListener("click", function () {
        resultDisplay.innerHTML = "";
    });

    // Inicializa corretamente ao carregar a página
    updateNumberInputRange();
    updateGameIndicator();
    generateNumberGrid();
});
