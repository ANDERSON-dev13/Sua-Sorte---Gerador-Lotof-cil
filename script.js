document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById("grid-numbers");
    const chosenNumbersList = document.getElementById("chosen-numbers");
    const resultContainer = document.getElementById("result");
    const numberToGenerate = document.getElementById("number-to-generate");

    const chosenNumbers = [];

    // Gerar números da cartela
    for (let i = 1; i <= 25; i++) {
        const numberBox = document.createElement("div");
        numberBox.textContent = i;
        numberBox.dataset.number = i;

        // Evento de seleção
        numberBox.addEventListener("click", function () {
            const number = parseInt(this.dataset.number);

            if (chosenNumbers.includes(number)) {
                chosenNumbers.splice(chosenNumbers.indexOf(number), 1);
                this.classList.remove("selected");
                updateChosenList();
            } else if (chosenNumbers.length < 5) {
                chosenNumbers.push(number);
                this.classList.add("selected");
                updateChosenList();
            } else {
                alert("Você só pode escolher 5 números!");
            }
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

    function generateGame() {
        const numbersToGenerate = parseInt(numberToGenerate.value) || 15;

        if (numbersToGenerate < 15 || numbersToGenerate > 20) {
            alert("Por favor, escolha um número entre 15 e 20.");
            return;
        }

        const allNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
        const generatedNumbers = [];

        while (generatedNumbers.length < numbersToGenerate - chosenNumbers.length) {
            const randomNumber = allNumbers[Math.floor(Math.random() * allNumbers.length)];

            if (
                !chosenNumbers.includes(randomNumber) &&
                !generatedNumbers.includes(randomNumber)
            ) {
                generatedNumbers.push(randomNumber);
            }
        }

        const finalNumbers = [...chosenNumbers, ...generatedNumbers].sort((a, b) => a - b);
        resultContainer.innerHTML += `<p>${finalNumbers.join(", ")}</p>`;
    }

    document.getElementById("generate-btn").addEventListener("click", generateGame);
    document.getElementById("generate-more-btn").addEventListener("click", generateGame);

    document.getElementById("clear-btn").addEventListener("click", function () {
        chosenNumbers.length = 0;
        updateChosenList();
        resultContainer.innerHTML = "";
        document.querySelectorAll("#grid-numbers div").forEach(el => el.classList.remove("selected"));
    });
});
