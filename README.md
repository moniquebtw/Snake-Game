# 🐍 Snake Game

Bem-vindo ao **Snake Game**, um clássico dos jogos de arcade recriado usando **HTML5**, **CSS3** e **JavaScript**!

Este projeto foi desenvolvido para praticar lógica de programação, manipulação do DOM e armazenamento local.

## 🎮 Funcionalidades

- **Movimentação** da cobra utilizando as teclas de seta (`↑ ↓ ← →`)
- **Sistema de pontuação** ao coletar alimentos
- **Geração aleatória** de comida em locais válidos
- **Detecção de colisões** com paredes e com o próprio corpo
- **Sistema de ranking** usando `localStorage`
- **Efeitos sonoros** e **sprites** para uma experiência mais imersiva
- **Tela de início** e **tela de game over** interativas

## 🖥️ Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **LocalStorage**

## 🚀 Como Rodar o Projeto

```bash
#Clone o repositório
git clone https://github.com/seu-usuario/snake-game.git

# Acesse o diretório do projeto
cd snake-game

# Abra o arquivo index.html no navegador

## 📂 Estrutura do Projeto

```plaintext
snake-game/
│
│
├── assets/
│   ├── audio/
│   │   ├── bg-audio.mp3
│   │   ├── eat-food.mp3
│   │   └── start-game.mp3
│   └── img-canvas/
│       ├── cereja.png
│       ├── cogumelo.png
│       ├── fundo.png
│       ├── graminha.png
│       ├── macas.png
│       ├── morango.png
│       ├── img-start.png
│       └── snake-green.png
│
├── css/
│   ├── styles/
│   ├── modal.css
│   ├── ranking.css
│   ├── start-game.css
│   └── style.css
│
├── js/
│   ├── modal.js
│   ├── music-button.js
│   ├── dev-info.js
│   └── script.js
│
├── index.html
└── README.md
