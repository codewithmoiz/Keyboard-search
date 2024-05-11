let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
letters.split("").forEach((letter) => {
    document.querySelector('.btn-wrapper').innerHTML += `<button>${letter}</button>`
});
document.querySelector('.btn-wrapper').innerHTML += `<button><i class="ri-delete-back-2-fill"></i></button>`;

function playSound() {
    var keySound = new Audio('./Sound/Key-Press-Sound.MP3');
    keySound.play();
}

async function fetchWords(startingLetter) {
    const response = await fetch(`https://api.datamuse.com/words?sp=${startingLetter}*`);
    const data = await response.json();
    const words = data.map(wordObj => wordObj.word).slice(0, 5);
    return words;
}

document.querySelectorAll('.keyboard button').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
        playSound();
        const inputField = document.querySelector('input');
        const resultContainer = document.querySelector('.result');

        resultContainer.innerHTML = "";

        if (e.target.classList.contains('ri-delete-back-2-fill')) {
            inputField.value = inputField.value.slice(0, -1);
        } else if (e.target.id === 'space') {
            inputField.value += ' ';
        } else {
            const letter = e.target.innerText;
            inputField.value += letter;
            if (inputField.value !== "") {
                const words = await fetchWords(letter);
                words.forEach((word) => {
                    resultContainer.innerHTML += `<div class="item">${word}</div>`;
                });
            }
        }

        if (inputField.value === "") {
            resultContainer.style.display = 'none';
            document.querySelector('#main').style.backgroundColor = '#fff';
        } else {
            resultContainer.style.display = 'block';
            document.querySelector('#main').style.backgroundColor = '#0000004d';
        }
    });
});



