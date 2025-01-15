// Função para atualizar o número de cartas de acordo com o modo
function updateCards(columns) {
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';  // Limpa as cartas atuais
    
    // Adiciona as novas cartas (multiplicando por 2 para garantir pares de cartas)
    for (let i = 0; i < columns * 2; i++) {  // Multiplicando por 2 para ter um número par de cartas
        const card = document.createElement('div');
        card.classList.add('card');
        grid.appendChild(card);
    }
}

// Lógica para alternar os modos ao clicar no botão
document.getElementById('modoBtn').addEventListener('click', function () {
    const button = this;

    // Alterando os modos (facil, medio, dificil)
    if (button.classList.contains('modo-facil')) {
        button.classList.remove('modo-facil');
        button.classList.add('modo-medio');
        button.textContent = 'Modo Médio';
        updateCards(6);  // 6 cartas para o modo médio
        localStorage.setItem('modo', 'medio');  // Salvando o modo na "caixinha"
    } else if (button.classList.contains('modo-medio')) {
        button.classList.remove('modo-medio');
        button.classList.add('modo-dificil');
        button.textContent = 'Modo Difícil';
        updateCards(8);  // 8 cartas para o modo difícil
        localStorage.setItem('modo', 'dificil');  // Salvando o modo na "caixinha"
    } else {
        button.classList.remove('modo-dificil');
        button.classList.add('modo-facil');
        button.textContent = 'Modo Fácil';
        updateCards(4);  // 4 cartas para o modo fácil
        localStorage.setItem('modo', 'facil');  // Salvando o modo na "caixinha"
    }
});

// Quando a página for carregada, leia o modo e defina o jogo de acordo
window.addEventListener('DOMContentLoaded', function () {
    const modoBtn = document.getElementById('modoBtn');
    const modo = localStorage.getItem('modo') || 'facil';  // Se não tiver nada na "caixinha", coloca 'facil' como padrão

    // Aplica o modo que foi salvo
    if (modo === 'medio') {
        modoBtn.classList.add('modo-medio');
        modoBtn.classList.remove('modo-facil');
        modoBtn.textContent = 'Modo Médio';
        updateCards(6);  // 6 cartas para o modo médio
    } else if (modo === 'dificil') {
        modoBtn.classList.add('modo-dificil');
        modoBtn.classList.remove('modo-facil');
        modoBtn.textContent = 'Modo Difícil';
        updateCards(8);  // 8 cartas para o modo difícil
    } else {
        modoBtn.classList.add('modo-facil');
        modoBtn.textContent = 'Modo Fácil';
        updateCards(4);  // 4 cartas para o modo fácil
    }
});

// Controla o som
document.getElementById('sondBg').addEventListener('click', function () {
    const audioElement = document.getElementById('background-music');
    
    if (audioElement.paused) {
        audioElement.play();
        this.textContent = 'Som Ligado';
    } else {
        audioElement.pause();
        this.textContent = 'Som Desligado';
    }

    this.classList.toggle('sondBg');
});

// Redirecionar para a página do modo escolhido
document.getElementById('jogarBtn').addEventListener('click', function () {
    const modoBtn = document.getElementById('modoBtn');

    if (modoBtn.classList.contains('modo-facil')) {
        window.location.href = 'facil.html'; 
    } else if (modoBtn.classList.contains('modo-medio')) {
        window.location.href = 'medio.html';
    } else {
        window.location.href = 'dificil.html';
    }
});

// Ajuste do volume
const audioElement = document.getElementById('background-music');
audioElement.volume = 0.2;  // Volume inicial

const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.addEventListener('input', function() {
    audioElement.volume = volumeSlider.value;
});
