function removerAcentos(palavra) {
    return palavra.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const buttonElements = document.querySelectorAll('button');
let row = 1;
let letter = 1;
let guessedCorrectly = false;

const wordsForTheWeek = [
    'Bolsa', 'Lapso', 'Crime', 'Marca', 'Encho', 
    'Razão', 'Noção', 'Dorme', 'Tempo', 'Juízo', 'Balde', 'Êxito', 'Entra', 'Vesgo', 'Etnia', 
    'Susto', 'Neura', 'Ética', 'Honra', 'Houve', 'Bispo', 'Queda', 'Cesta', 'Pesca', 'Sobre', 
    'Toque', 'Desde', 'Metro', 'Areia', 'Inibe', 'Omite', 'Prato', 'Herói', 'Trama', 'Termo', 
    'Usado', 'Quais', 'Rosna', 'Pisca', 'Outro', 'Inato', 'Cacho', 'Passo', 'Xerém', 'Álbum', 
    'Junto', 'Kebab', 'Deixa', 'Quati', 'Untei', 'Puxei', 'Ontem', 'Nariz', 'Graça', 'Anzol', 
    'Rampa', 'Comer', 'Zelar', 'Justo', 'Legal', 'Ordem', 'Obter', 'Gesto', 'Senso', 'Tênis', 
    'Jogar', 'Aspas', 'Fugir', 'Graxa', 'Fazer', 'Olhar', 'Nobre', 'Balão', 'Vozes', 'Chuva', 
    'Gosto', 'Xeque', 'Achar', 'Karma', 'Xampu', 'Yacht', 'Quina', 'Unido', 'Viola', 'Verbo', 
    'Amado', 'Zarpa', 'Haver', 'Sauna', 'Fisga', 'Jovem', 'Fútil', 'Afoga', 'Jeito', 'Poste', 
    'Quero', 'Nisso', 'Ouvir', 'Zumbi', 'Resto', 'Quilo', 'Daqui', 'Kiwis', 'Lento', 'Besta', 
    'Roupa', 'Então', 'Troca', 'Zinco', 'Calma', 'Suflê', 'Briga', 'Filma', 'Foice', 'Hotel', 
    'Ideia', 'Vocês', 'Xingo', 'Igual', 'Jaula', 'Zorra', 'Misto', 'Navio', 'Leite', 'Gosma', 
    'Globo', 'Ténue', 'Expor', 'Negro', 'Homem', 'Muito', 'Dedão', 'Vento', 'Mexer', 'Sanar', 
    'Dardo', 'Quase', 'Louco', 'Mania', 'Urina', 'Raspo', 'Moral', 'Veado', 'Hiena', 'Pular', 
    'Dessa', 'Forma', 'Zanga', 'Ícone', 'Urubu', 'Risos', 'Seção', 'Gaita', 'Bucho', 'Itens', 
    'Livro', 'Creio', 'Impor', 'Zíper', 'Usura', 'Lápis', 'União'
];

const startDate = new Date('2024-09-03');
const today = new Date();
const diffTime = Math.abs(today - startDate);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
const wordForTheDay = wordsForTheWeek[diffDays % wordsForTheWeek.length];

const wordElements = document.querySelectorAll('.word-row');
let gameOver = false;

buttonElements.forEach((element) => {
    element.addEventListener('click', function() {
        keypress(element.attributes["data-key"].value.toUpperCase());
    });
});

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === 'Enter') {
        keypress('ENTER');
    } else if (key === 'Backspace') {
        keypress('DEL');
    } else if (/^[a-zA-Z]$/.test(key)) {
        keypress(key.toUpperCase());
    }
});

function populateWord(key) {
    if (letter < 6) {
        wordElements[row - 1].querySelectorAll('.word')[letter - 1].innerText = key;
        letter += 1;
    }
}

function removerAcentos(palavra) {
    return palavra.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function checkword() {
    const letterElements = wordElements[row - 1].querySelectorAll('.word');
    const wordOfTheDayLower = removerAcentos(wordForTheDay.toLowerCase());
    const lettersStatus = Array(5).fill(false); // Array para controlar quais letras foram verificadas como verdes
    let numOfCorrectAlphabets = 0;

    // Primeira passagem: verificar letras verdes
    letterElements.forEach((element, index) => {
        const letter = removerAcentos(element.innerText.toLowerCase());
        if (letter === removerAcentos(wordOfTheDayLower[index])) {
            numOfCorrectAlphabets += 1;
            element.classList.add('word-green');
            lettersStatus[index] = true; // Marca a posição correta como já verificada
        }
    });

    // Segunda passagem: verificar letras amarelas
    letterElements.forEach((element, index) => {
        const letter = removerAcentos(element.innerText.toLowerCase());
        if (!lettersStatus[index]) { // Ignorar letras já marcadas como verdes
            const letterInWordIndex = wordOfTheDayLower.indexOf(letter);
            if (letterInWordIndex > -1 && !wordElements[row - 1].querySelectorAll('.word')[letterInWordIndex].classList.contains('word-green')) {
                element.classList.add('word-yellow');
            } else {
                element.classList.add('word-grey');
            }
        }
    });

    if (numOfCorrectAlphabets === 5) {
        gameOver = true;
        guessedCorrectly = true;
        alert('Parabéns! Você acertou a palavra do dia.');
    } else if (row === 6) {
        gameOver = true;
        alert('Tenha mais sorte na próxima vez. A palavra era: ' + wordForTheDay);
    }
}

function enterWord() {
    if (letter < 6) {
        alert('Tem poucas letras.');
    } else {
        checkword();
        row += 1;
        letter = 1;
    }
}

function deleteLetter() {
    const letterElements = wordElements[row - 1].querySelectorAll('.word');
    for (let index = letterElements.length - 1; index >= 0; index--) {
        const element = letterElements[index];
        if (element.innerText !== '') {
            element.innerText = '';
            letter -= 1;
            break;
        }
    }
}

function keypress(key) {
    if (!gameOver) {
        if (key === 'ENTER') {
            enterWord();
        } else if (key === 'DEL') {
            deleteLetter();
        } else {
            populateWord(key);
        }
    } else {
        alert('Fim de jogo! Por favor, tente novamente amanhã e adivinhe uma nova palavra.');
    }
}