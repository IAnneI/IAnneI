const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

// Adiciona os personagens (mesmo conjunto de personagens para todos os modos)
const characters = [
  'alien', 'astronaltas', 'astronaltas2', 'astronaltas3', 'astronaltas4',
  'buraconegro', 'cometas', 'cometas2', 'cometas3', 'estrela', 'estrela2',
  'foguete', 'foguete2', 'foguete3', 'lua', 'marte', 'marte2', 'planetas',
  'planetas2', 'saturno', 'universo', 'universo2', 'universo3'
];

// Função para criar o elemento de uma carta
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(timerInterval);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500);
  }
}

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();
  }
}

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/cards/${character}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
}

// Função para carregar o jogo com a quantidade de cartas baseado no modo
const loadGame = () => {
  const mode = localStorage.getItem('modo');  // Corrigido para 'modo'
  let numberOfCards = 8;  // Padrão para o modo fácil
  
  if (mode === 'medio') {
    numberOfCards = 12;  // Modo médio
  } else if (mode === 'dificil') {
    numberOfCards = 24;  // Modo difícil
  }

  // Ajusta o layout da grid de acordo com o modo (no modo difícil, as cartas ficam menores)
  if (mode === 'dificil') {
    grid.style.gridTemplateColumns = 'repeat(6, 120px)'; // Ajusta para 6 colunas no modo difícil
  } else if (mode === 'medio') {
    grid.style.gridTemplateColumns = 'repeat(4, 120px)'; // Ajusta para 4 colunas no modo médio
  } else {
    grid.style.gridTemplateColumns = 'repeat(3, 120px)'; // Ajusta para 3 colunas no modo fácil
  }

  // Limpar o grid antes de adicionar as cartas
  grid.innerHTML = '';

  const charactersToUse = characters.slice(0, numberOfCards / 2);  // Usar metade dos personagens
  const duplicateCharacters = [...charactersToUse, ...charactersToUse];  // Duplicar para ter pares
  
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
  
  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {
  timerInterval = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
  
    // Adiciona a classe correspondente ao modo de jogo
    const mode = localStorage.getItem('modo');
    document.body.classList.add(mode); // Adiciona a classe 'medio' ou 'dificil' ou 'facil'

    // Atualiza o título da aba
    document.title = `Match Madness - ${mode.charAt(0).toUpperCase() + mode.slice(1)}`;
}
