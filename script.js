// Estado dos presentes (por enquanto fake, depois vamos conectar com backend)
let presentesEstado = {
  massagem: false,
  jantar: false,
  carta: false,
  foto: false,
  video: false
};

// Estado das opções de jantar escolhidas
let opcoesJantarEscolhidas = {
  japonesa: false,
  burger: false,
  italiana: false,
  mexicana: false,
  rodizio: false,
  surpresa: false
};

// Conteúdo de cada presente - Linguagem carinhosa e emocional
const conteudoPresentes = {
  massagem: {
    titulo: "💆 Vale Massagem",
    texto: `Quando você escolher usar este presente, algo mágico vai acontecer... 🤖

Um robôzinho vai enviar uma mensagem automática no WhatsApp do seu namorado (sim, eu mesmo! 😄) e eu vou saber que é hora de preparar tudo com muito carinho.

Vou preparar:
✨ Creme relaxante
🕯️ Velas perfumadas
🎭 Máscara facial
💆 Massagem completa

Tudo no seu tempo, no seu ritmo. Sem pressa, só cuidado e carinho. Quando você sentir que precisa de um momento só seu, de relaxamento e atenção, é só escolher usar este presente.

Eu vou estar pronto para te mimar do jeito que você merece. ❤️`
  },
  jantar: {
    titulo: "🍝 Vale Jantar",
    texto: `Esse aqui é um vale jantar.

Mas calma… não precisa decidir nada agora 😌



Pra facilitar a vida (e evitar estresse desnecessário),

você tem algumas opções bem claras:



🍣 Comida japonesa  

🍔 Burger King  

🍝 Comida italiana  

🌮 Comida mexicana  

🎲 Rodízio aleatório  

😈 Alguma comida que a gente nunca comeu — e nessa opção,

eu escolho na sorte.

Não vale reclamar. Nem fazer cara feia. Nem chantagem emocional.



O combinado é simples:

boa comida, companhia melhor ainda,

risadas no meio do caminho

e zero pressão pra ser algo perfeito.



Só a gente. Do nosso jeito. 💛`
  },
  carta: {
    titulo: "💌 Carta Secreta",
    texto: `Meu amor,



Nem tudo é simples.

Nem a vida, nem as pessoas, nem os caminhos.

Mas mesmo assim, algumas escolhas valem a tentativa.



Você é prova de que força não precisa fazer barulho.

Que continuar, mesmo quando cansa,

também é uma forma de coragem.



A gente não é perfeito.

Nunca foi.

Mas é real.

E às vezes isso é mais raro do que qualquer coisa fácil.



Eu escolhi ficar.

Escolhi acreditar.

Escolhi você — todos os dias, mesmo nos difíceis.



Se existir um jeito bonito de seguir,

é assim: com verdade, cuidado,

e a vontade sincera de fazer dar certo.



Com você, tudo faz mais sentido. 🤍`
  },
  foto: {
    titulo: "📸 Nossas Fotos Especiais",
    texto: `Algumas das minhas fotos favoritas nossas! Momentos especiais capturados, memórias que eu guardo com muito carinho no coração.

Cada uma dessas fotos me lembra de algum momento especial que vivemos juntos. 💖`,
    temGaleria: true // Flag para mostrar galeria
  },
  video: {
    titulo: "🎥 Vídeo Surpresa",
    texto: `Um vídeo especial só para você! Uma mensagem direta do coração, porque algumas coisas são melhor ditas assim.

(aqui vai aparecer o vídeo quando você adicionar) 🐱`
  }
};

// Estado de raspadinha para cada presente
let raspadinhaEstado = {
  massagem: false,
  jantar: false,
  carta: false,
  foto: false,
  video: false
};

// Inicializa sistema de raspadinha quando página carrega
document.addEventListener('DOMContentLoaded', function() {
  inicializarRaspadinhas();
  carregarEstadoSalvo();
  inicializarCliquesCards();
});

// Inicializa cliques nos cards (para cards usados, mostra modal novamente)
function inicializarCliquesCards() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const presenteId = card.getAttribute('data-presente');
    
    card.addEventListener('click', function(e) {
      // Se clicou no overlay, não faz nada (já tem evento próprio)
      if (e.target.closest('.raspadinha-overlay')) {
        return;
      }
      
      // Se o presente já foi usado, mostra modal novamente
      if (presentesEstado[presenteId]) {
        mostrarModal(presenteId);
      }
    });
  });
  
  // Clique na mascote flutuante
  const mascote = document.getElementById('mascote-flutuante');
  if (mascote) {
    mascote.addEventListener('click', function() {
      mostrarMensagemMascoteAleatoria();
    });
  }
}

// Mostra mensagem aleatória da mascote ao clicar nela
function mostrarMensagemMascoteAleatoria() {
  const mensagensAleatorias = [
    "Oi! Estou aqui te observando escolher seus presentes! 😸",
    "Que bom te ver por aqui! Cada escolha é especial! 🐱✨",
    "Você está fazendo escolhas incríveis! Continue assim! 💖",
    "Adoro ver você descobrindo cada presente! É emocionante! 😻"
  ];
  
  const balao = document.getElementById('mascote-balao');
  const mensagem = document.getElementById('mascote-mensagem');
  
  if (!balao || !mensagem) return;
  
  const textoAleatorio = mensagensAleatorias[Math.floor(Math.random() * mensagensAleatorias.length)];
  mensagem.textContent = textoAleatorio;
  
  balao.style.display = 'block';
  
  setTimeout(() => {
    balao.style.transition = 'opacity 0.5s ease-out';
    balao.style.opacity = '0';
    setTimeout(() => {
      balao.style.display = 'none';
      balao.style.opacity = '1';
    }, 500);
  }, 3000);
}

// Função para inicializar raspadinhas
function inicializarRaspadinhas() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const presenteId = card.getAttribute('data-presente');
    const overlay = document.getElementById(`overlay-${presenteId}`);
    
    if (!overlay) return;
    
    let isRaspando = false;
    let porcentagemRaspada = 0;
    
    // Eventos de mouse/touch para raspar
    overlay.addEventListener('mousedown', iniciarRaspagem);
    overlay.addEventListener('touchstart', iniciarRaspagem);
    
    function iniciarRaspagem(e) {
      if (raspadinhaEstado[presenteId]) return; // Já foi raspado
      
      isRaspando = true;
      e.preventDefault();
      raspar(e);
    }
    
    overlay.addEventListener('mousemove', raspar);
    overlay.addEventListener('touchmove', raspar);
    
    overlay.addEventListener('mouseup', pararRaspagem);
    overlay.addEventListener('mouseleave', pararRaspagem);
    overlay.addEventListener('touchend', pararRaspagem);
    
    function raspar(e) {
      if (!isRaspando || raspadinhaEstado[presenteId]) return;
      
      const rect = overlay.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      
      // Cria efeito visual de raspagem
      criarEfeitoRaspagem(x, y, overlay);
      
      // Calcula porcentagem raspada (simplificado)
      porcentagemRaspada += 2;
      
      if (porcentagemRaspada >= 100) {
        revelarPresente(presenteId);
      }
    }
    
    function pararRaspagem() {
      isRaspando = false;
    }
  });
}

// Cria efeito visual de raspagem
function criarEfeitoRaspagem(x, y, overlay) {
  const circulo = document.createElement('div');
  circulo.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 10;
  `;
  overlay.appendChild(circulo);
  
  setTimeout(() => {
    circulo.style.transition = 'opacity 0.3s';
    circulo.style.opacity = '0';
    setTimeout(() => circulo.remove(), 300);
  }, 100);
}

// Mensagens da mascote Lina Trova
const mensagensMascote = {
  massagem: "Que escolha incrível! Você merece esse momento de relaxamento total! 😸💆",
  jantar: "Adorei sua escolha! Vai ser um jantar especial, tenho certeza! 🍝✨",
  carta: "Essa vai ser emocionante! Palavras do coração são as melhores! 💌❤️",
  foto: "Memórias são tesouros! Essa foto vai ser especial! 📸💖",
  video: "A última escolha! Prepare-se para algo especial! 🎥🎉"
};

// Revela o presente quando raspado completamente
function revelarPresente(presenteId) {
  if (raspadinhaEstado[presenteId]) return;
  
  raspadinhaEstado[presenteId] = true;
  presentesEstado[presenteId] = true;
  
  const overlay = document.getElementById(`overlay-${presenteId}`);
  const card = document.getElementById(presenteId);
  const status = card.querySelector('.card-status');
  
  // Remove overlay com animação
  overlay.style.transition = 'opacity 0.5s ease-out';
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 500);
  
  // Atualiza status do card
  if (status) {
    status.textContent = '🎁 Presente usado';
  }
  
  // Marca card como usado
  card.classList.add('usado');
  
  // Mascote reage!
  mostrarMensagemMascote(presenteId);
  
  // Mostra modal com conteúdo (com delay para não sobrepor a mensagem da mascote)
  setTimeout(() => {
    mostrarModal(presenteId);
  }, 2000);
  
  // Salva estado
  salvarEstado();
}

// Mostra mensagem da mascote
function mostrarMensagemMascote(presenteId) {
  const balao = document.getElementById('mascote-balao');
  const mensagem = document.getElementById('mascote-mensagem');
  const mascote = document.getElementById('mascote-flutuante');
  
  if (!balao || !mensagem || !mascote) return;
  
  // Mensagem baseada no presente
  const texto = mensagensMascote[presenteId] || "Que escolha incrível! 🐱✨";
  mensagem.textContent = texto;
  
  // Mostra balão
  balao.style.display = 'block';
  
  // Anima a mascote
  mascote.style.animation = 'mascoteCelebrate 0.6s ease-out';
  
  // Esconde balão após 3 segundos
  setTimeout(() => {
    balao.style.transition = 'opacity 0.5s ease-out';
    balao.style.opacity = '0';
    setTimeout(() => {
      balao.style.display = 'none';
      balao.style.opacity = '1';
    }, 500);
  }, 3000);
}

// Função para resgatar presente (mantida para compatibilidade)
function resgatar(presenteId) {
  // Se já foi raspado, apenas mostra modal
  if (raspadinhaEstado[presenteId]) {
    mostrarModal(presenteId);
    return;
  }
  
  // Se não foi raspado ainda, inicia raspagem
  const overlay = document.getElementById(`overlay-${presenteId}`);
  if (overlay) {
    overlay.style.display = 'block';
  }
}

// Função para mostrar o modal
function mostrarModal(presenteId) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const conteudo = conteudoPresentes[presenteId];

  if (!conteudo) return;

  let conteudoHTML = `
    <div style="text-align: center; margin-bottom: 20px; font-size: 60px; animation: catCelebrateModal 0.6s ease-out;">🐱</div>
    <h2 style="margin-bottom: 20px; text-align: center; font-size: 28px; font-family: 'Dancing Script', cursive;">${conteudo.titulo}</h2>
  `;
  
  // Se for o jantar, mostra opções interativas
  if (presenteId === 'jantar') {
    conteudoHTML += `
      <div style="text-align: left; font-size: 18px; line-height: 1.8; background: rgba(255, 255, 255, 0.05); padding: 25px; border-radius: 15px; margin: 20px 0;">
        <p>Esse aqui é um vale jantar.</p>
        <p>Mas calma… não precisa decidir nada agora 😌</p>
        <br>
        <p>Pra facilitar a vida (e evitar estresse desnecessário),<br>você tem algumas opções bem claras:</p>
        <br>
        <div id="opcoes-jantar" style="display: flex; flex-direction: column; gap: 12px; margin: 20px 0;">
          <div class="opcao-jantar ${opcoesJantarEscolhidas.japonesa ? 'escolhida' : ''}" onclick="escolherOpcaoJantar('japonesa')">
            <span class="opcao-emoji">🍣</span>
            <span class="opcao-texto">Comida japonesa</span>
            ${opcoesJantarEscolhidas.japonesa ? '<span class="opcao-check">✓</span>' : ''}
          </div>
          <div class="opcao-jantar ${opcoesJantarEscolhidas.burger ? 'escolhida' : ''}" onclick="escolherOpcaoJantar('burger')">
            <span class="opcao-emoji">🍔</span>
            <span class="opcao-texto">Burger King</span>
            ${opcoesJantarEscolhidas.burger ? '<span class="opcao-check">✓</span>' : ''}
          </div>
          <div class="opcao-jantar ${opcoesJantarEscolhidas.italiana ? 'escolhida' : ''}" onclick="escolherOpcaoJantar('italiana')">
            <span class="opcao-emoji">🍝</span>
            <span class="opcao-texto">Comida italiana</span>
            ${opcoesJantarEscolhidas.italiana ? '<span class="opcao-check">✓</span>' : ''}
          </div>
          <div class="opcao-jantar ${opcoesJantarEscolhidas.mexicana ? 'escolhida' : ''}" onclick="escolherOpcaoJantar('mexicana')">
            <span class="opcao-emoji">🌮</span>
            <span class="opcao-texto">Comida mexicana</span>
            ${opcoesJantarEscolhidas.mexicana ? '<span class="opcao-check">✓</span>' : ''}
          </div>
          <div class="opcao-jantar ${opcoesJantarEscolhidas.rodizio ? 'escolhida' : ''}" onclick="escolherOpcaoJantar('rodizio')">
            <span class="opcao-emoji">🎲</span>
            <span class="opcao-texto">Rodízio aleatório</span>
            ${opcoesJantarEscolhidas.rodizio ? '<span class="opcao-check">✓</span>' : ''}
          </div>
          <div class="opcao-jantar ${opcoesJantarEscolhidas.surpresa ? 'escolhida' : ''}" onclick="escolherOpcaoJantar('surpresa')">
            <span class="opcao-emoji">😈</span>
            <span class="opcao-texto">Alguma comida que a gente nunca comeu — e nessa opção, eu escolho na sorte.</span>
            ${opcoesJantarEscolhidas.surpresa ? '<span class="opcao-check">✓</span>' : ''}
          </div>
        </div>
        <br>
        <p>O combinado é simples:<br>boa comida, companhia melhor ainda,<br>risadas no meio do caminho<br>e zero pressão pra ser algo perfeito.</p>
        <p style="margin-top: 15px; font-style: italic; opacity: 0.9;">Qualquer escolha é boa quando é a gente juntos. 💛</p>
        <br>
        <p>Só a gente. Do nosso jeito. 💛</p>
      </div>
    `;
  } else if (presenteId === 'carta') {
    // Carta tem estilo de papel real - adiciona classe ao modal
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
      modalContent.classList.add('modal-carta');
    }
    
    conteudoHTML += `
      <div class="carta-papel">
        <div class="carta-conteudo">
          ${conteudo.texto}
        </div>
      </div>
    `;
  } else {
    // Remove classe de carta se existir
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
      modalContent.classList.remove('modal-carta');
    }
    // Outros presentes mantêm o texto normal
    conteudoHTML += `
      <div style="text-align: left; font-size: 18px; line-height: 1.8; white-space: pre-line; background: rgba(255, 255, 255, 0.05); padding: 25px; border-radius: 15px; margin: 20px 0;">
        ${conteudo.texto}
      </div>
    `;
  }
  
  // Se for o presente de foto, mostra galeria
  if (presenteId === 'foto' && conteudo.temGaleria) {
    conteudoHTML += `
      <div class="galeria-fotos" style="margin: 25px 0;">
        <div class="galeria-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 20px;">
          <div class="galeria-item" style="position: relative; width: 100%; padding-bottom: 100%; background: rgba(0,0,0,0.2); border-radius: 15px; overflow: hidden; cursor: pointer;" onclick="abrirFoto('assets/fotos/foto1.jpg')">
            <img src="assets/fotos/foto1.jpg" alt="Nossa foto" class="galeria-img" onerror="this.parentElement.style.display='none'" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; border-radius: 15px;">
          </div>
          <div class="galeria-item" style="position: relative; width: 100%; padding-bottom: 100%; background: rgba(0,0,0,0.2); border-radius: 15px; overflow: hidden; cursor: pointer;" onclick="abrirFoto('assets/fotos/foto2.jpg')">
            <img src="assets/fotos/foto2.jpg" alt="Nossa foto" class="galeria-img" onerror="this.parentElement.style.display='none'" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; border-radius: 15px;">
          </div>
          <div class="galeria-item" style="position: relative; width: 100%; padding-bottom: 100%; background: rgba(0,0,0,0.2); border-radius: 15px; overflow: hidden; cursor: pointer;" onclick="abrirFoto('assets/fotos/foto3.jpg')">
            <img src="assets/fotos/foto3.jpg" alt="Nossa foto" class="galeria-img" onerror="this.parentElement.style.display='none'" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; border-radius: 15px;">
          </div>
          <div class="galeria-item" style="position: relative; width: 100%; padding-bottom: 100%; background: rgba(0,0,0,0.2); border-radius: 15px; overflow: hidden; cursor: pointer;" onclick="abrirFoto('assets/fotos/foto4.jpg')">
            <img src="assets/fotos/foto4.jpg" alt="Nossa foto" class="galeria-img" onerror="this.parentElement.style.display='none'" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; border-radius: 15px;">
          </div>
        </div>
      </div>
    `;
  }
  
  conteudoHTML += `
    <div style="text-align: center; margin-top: 30px;">
      <button onclick="fecharModal()" class="btn-modal-close">
        Fechar 🐾
      </button>
    </div>
  `;
  
  modalBody.innerHTML = conteudoHTML;
  
  // Adiciona gatinhos comemorativos quando revela
  criarGatinhosComemorativos();

  modal.style.display = 'block';
  
  // Animação de entrada do modal
  setTimeout(() => {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
      modalContent.style.animation = 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
  }, 10);
}

// Função para abrir foto em tela cheia
function abrirFoto(src) {
  const lightbox = document.createElement('div');
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    animation: fadeIn 0.3s ease-out;
  `;
  
  const img = document.createElement('img');
  img.src = src;
  img.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 15px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  `;
  img.onerror = function() {
    lightbox.innerHTML = '<p style="color: white; font-size: 18px;">Erro ao carregar imagem</p>';
  };
  
  lightbox.appendChild(img);
  document.body.appendChild(lightbox);
  
  lightbox.addEventListener('click', function() {
    lightbox.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => lightbox.remove(), 300);
  });
}

// Função para fechar o modal
function fecharModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  
  // Remove classe de carta ao fechar
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.classList.remove('modal-carta');
  }
}

// Fechar modal clicando fora dele
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target == modal) {
    fecharModal();
  }
}

// Carrega estado salvo
function carregarEstadoSalvo() {
  const estadoSalvo = localStorage.getItem('presentesEstado');
  const raspadinhaSalva = localStorage.getItem('raspadinhaEstado');
  const opcoesJantarSalvas = localStorage.getItem('opcoesJantarEscolhidas');
  
  if (estadoSalvo) {
    try {
      presentesEstado = JSON.parse(estadoSalvo);
    } catch (e) {
      console.log('Erro ao carregar estado salvo');
    }
  }
  
  if (raspadinhaSalva) {
    try {
      raspadinhaEstado = JSON.parse(raspadinhaSalva);
    } catch (e) {
      console.log('Erro ao carregar estado de raspadinha');
    }
  }
  
  if (opcoesJantarSalvas) {
    try {
      opcoesJantarEscolhidas = JSON.parse(opcoesJantarSalvas);
    } catch (e) {
      console.log('Erro ao carregar opções de jantar');
    }
  }
  
  atualizarVisual();
}

// Nomes das opções de jantar
const nomesOpcoesJantar = {
  japonesa: 'Comida japonesa 🍣',
  burger: 'Burger King 🍔',
  italiana: 'Comida italiana 🍝',
  mexicana: 'Comida mexicana 🌮',
  rodizio: 'Rodízio aleatório 🎲',
  surpresa: 'Comida surpresa que a gente nunca comeu 😈'
};

// Função para escolher uma opção de jantar
function escolherOpcaoJantar(opcao) {
  // Se já foi escolhida, não faz nada
  if (opcoesJantarEscolhidas[opcao]) {
    return;
  }
  
  // Mostra animação de raspadinha antes de confirmar
  const opcoes = document.querySelectorAll('.opcao-jantar');
  const opcoesArray = ['japonesa', 'burger', 'italiana', 'mexicana', 'rodizio', 'surpresa'];
  const indice = opcoesArray.indexOf(opcao);
  
  if (opcoes[indice]) {
    const opcaoElement = opcoes[indice];
    
    // Animação de raspadinha/efeito visual
    criarAnimacaoRaspadinha(opcaoElement, () => {
      // Depois da animação, mostra modal de confirmação
      mostrarConfirmacaoJantar(opcao);
    });
  }
}

// Detecta se é mobile
function isMobile() {
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Cria animação de raspadinha na opção
function criarAnimacaoRaspadinha(elemento, callback) {
  // No mobile, simplifica - apenas um clique rápido
  if (isMobile()) {
    const overlay = document.createElement('div');
    overlay.className = 'raspadinha-overlay-opcao';
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(100, 100, 100, 0.95) 0%, rgba(80, 80, 80, 0.95) 100%);
      border-radius: 12px;
      cursor: pointer;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      -webkit-tap-highlight-color: transparent;
    `;
    
    const texto = document.createElement('div');
    texto.textContent = '👆 Toque para escolher';
    texto.style.cssText = `
      color: rgba(255, 255, 255, 0.9);
      font-size: 16px;
      font-weight: 600;
      pointer-events: none;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    `;
    
    overlay.appendChild(texto);
    elemento.style.position = 'relative';
    elemento.appendChild(overlay);
    
    // No mobile, apenas um toque remove o overlay
    overlay.addEventListener('click', (e) => {
      e.stopPropagation();
      overlay.style.transition = 'opacity 0.2s ease-out';
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
        callback();
      }, 200);
    });
    
    overlay.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      overlay.style.transition = 'opacity 0.2s ease-out';
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
        callback();
      }, 200);
    });
    
    return;
  }
  
  // Desktop: mantém animação de raspadinha
  const overlay = document.createElement('div');
  overlay.className = 'raspadinha-overlay-opcao';
  overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(100, 100, 100, 0.95) 0%, rgba(80, 80, 80, 0.95) 100%);
    border-radius: 12px;
    cursor: grabbing;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `;
  
  const texto = document.createElement('div');
  texto.textContent = '👆 Raspe para escolher';
  texto.style.cssText = `
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    font-weight: 600;
    pointer-events: none;
    text-align: center;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  `;
  
  overlay.appendChild(texto);
  elemento.style.position = 'relative';
  elemento.appendChild(overlay);
  
  let porcentagem = 0;
  let isRaspando = false;
  
  const raspar = (e) => {
    if (!isRaspando) return;
    
    const rect = overlay.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    
    // Cria efeito visual de raspagem
    criarEfeitoRaspagemOpcao(x, y, overlay);
    
    porcentagem += 5; // Mais rápido no desktop também
    
    if (porcentagem >= 100) {
      overlay.remove();
      callback();
    }
  };
  
  overlay.addEventListener('mousedown', (e) => {
    isRaspando = true;
    e.preventDefault();
    raspar(e);
  });
  
  overlay.addEventListener('touchstart', (e) => {
    isRaspando = true;
    e.preventDefault();
    raspar(e);
  });
  
  overlay.addEventListener('mousemove', raspar);
  overlay.addEventListener('touchmove', raspar);
  
  overlay.addEventListener('mouseup', () => { isRaspando = false; });
  overlay.addEventListener('mouseleave', () => { isRaspando = false; });
  overlay.addEventListener('touchend', () => { isRaspando = false; });
}

// Cria efeito visual de raspagem
function criarEfeitoRaspagemOpcao(x, y, overlay) {
  const circulo = document.createElement('div');
  circulo.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: transparent;
    border: 3px solid rgba(255, 255, 255, 0.6);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 11;
  `;
  overlay.appendChild(circulo);
  
  setTimeout(() => {
    circulo.style.transition = 'opacity 0.3s, transform 0.3s';
    circulo.style.opacity = '0';
    circulo.style.transform = 'translate(-50%, -50%) scale(1.5)';
    setTimeout(() => circulo.remove(), 300);
  }, 150);
}

// Mostra modal de confirmação
function mostrarConfirmacaoJantar(opcao) {
  const nomeOpcao = nomesOpcoesJantar[opcao];
  const mobile = isMobile();
  const animSpeed = mobile ? '0.15s' : '0.3s';
  
  const modalConfirmacao = document.createElement('div');
  modalConfirmacao.id = 'modal-confirmacao-jantar';
  modalConfirmacao.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    z-index: 10001;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn ${animSpeed} ease-out;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `;
  
  // Permite fechar clicando fora
  modalConfirmacao.addEventListener('click', (e) => {
    if (e.target === modalConfirmacao) {
      cancelarEscolhaJantar();
    }
  });
  
  modalConfirmacao.innerHTML = `
    <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #533483 100%); padding: ${mobile ? '30px 20px' : '40px'}; border-radius: 25px; max-width: 500px; width: 90%; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6); animation: modalSlideIn ${animSpeed} ease-out; position: relative; margin: 20px;">
      <span onclick="cancelarEscolhaJantar()" style="position: absolute; top: 15px; right: 15px; color: white; font-size: 32px; cursor: pointer; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255, 255, 255, 0.1); transition: all 0.2s; -webkit-tap-highlight-color: transparent;">&times;</span>
      <div style="text-align: center; margin-bottom: 20px; font-size: ${mobile ? '50px' : '60px'};">🍽️</div>
      <h2 style="text-align: center; font-size: ${mobile ? '22px' : '24px'}; margin-bottom: 20px; font-family: 'Dancing Script', cursive;">Confirmar escolha?</h2>
      <p style="text-align: center; font-size: ${mobile ? '16px' : '18px'}; line-height: 1.6; margin-bottom: 30px;">
        Você tem certeza que quer marcar um encontro para comer<br><strong>${nomeOpcao}</strong><br>para o dia mais próximo possível?
      </p>
      <p style="text-align: center; font-size: ${mobile ? '14px' : '16px'}; opacity: 0.9; margin-bottom: 30px; font-style: italic;">
        Você seleciona e seu namorado faz acontecer! 💛
      </p>
      <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
        <button onclick="cancelarEscolhaJantar()" style="padding: ${mobile ? '14px 25px' : '12px 30px'}; border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 25px; background: transparent; color: white; font-weight: 600; cursor: pointer; font-size: ${mobile ? '15px' : '16px'}; min-width: 120px; min-height: 44px; -webkit-tap-highlight-color: transparent; touch-action: manipulation;">
          Cancelar
        </button>
        <button onclick="confirmarEscolhaJantar('${opcao}')" style="padding: ${mobile ? '14px 25px' : '12px 30px'}; border: none; border-radius: 25px; background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); color: white; font-weight: 600; cursor: pointer; font-size: ${mobile ? '15px' : '16px'}; box-shadow: 0 4px 15px rgba(74, 222, 128, 0.4); min-width: 120px; min-height: 44px; -webkit-tap-highlight-color: transparent; touch-action: manipulation;">
          Confirmar
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modalConfirmacao);
  
  // Previne scroll do body quando modal está aberto
  document.body.style.overflow = 'hidden';
}

// Cancela a escolha
function cancelarEscolhaJantar() {
  const modal = document.getElementById('modal-confirmacao-jantar');
  if (modal) {
    const mobile = isMobile();
    const animSpeed = mobile ? 150 : 300;
    modal.style.animation = `fadeOut ${animSpeed}ms ease-out`;
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = ''; // Restaura scroll
    }, animSpeed);
  }
}

// Confirma a escolha
function confirmarEscolhaJantar(opcao) {
  // Remove modal de confirmação
  const modalConfirmacao = document.getElementById('modal-confirmacao-jantar');
  if (modalConfirmacao) {
    modalConfirmacao.remove();
    document.body.style.overflow = ''; // Restaura scroll
  }
  
  // Marca como escolhida
  opcoesJantarEscolhidas[opcao] = true;
  
  // Salva no localStorage
  localStorage.setItem('opcoesJantarEscolhidas', JSON.stringify(opcoesJantarEscolhidas));
  
  // Atualiza visual no modal
  const opcoes = document.querySelectorAll('.opcao-jantar');
  const opcoesArray = ['japonesa', 'burger', 'italiana', 'mexicana', 'rodizio', 'surpresa'];
  const indice = opcoesArray.indexOf(opcao);
  
  if (opcoes[indice]) {
    const opcaoElement = opcoes[indice];
    opcaoElement.classList.add('escolhida');
    
    // Adiciona check visual
    if (!opcaoElement.querySelector('.opcao-check')) {
      const check = document.createElement('span');
      check.className = 'opcao-check';
      check.textContent = '✓';
      opcaoElement.appendChild(check);
    }
    
    // Animação de confirmação
    opcaoElement.style.animation = 'opcaoEscolhida 0.5s ease-out';
    setTimeout(() => {
      opcaoElement.style.animation = '';
    }, 500);
  }
  
  // Mostra popup transparente de mensagem disparada
  mostrarPopupMensagemDisparada(() => {
    // Depois mostra popup de sucesso
    mostrarPopupSucesso(opcao);
  });
}

// Mostra popup transparente avisando que mensagem foi disparada
function mostrarPopupMensagemDisparada(callback) {
  const mobile = isMobile();
  const popup = document.createElement('div');
  popup.id = 'popup-mensagem-disparada';
  const duration = mobile ? 1500 : 2500; // Mais rápido no mobile
  const fadeOut = mobile ? 300 : 500;
  
  popup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10003;
    pointer-events: none;
    animation: fadeInOut ${mobile ? '1.5s' : '3s'} ease-in-out forwards;
  `;
  
  popup.innerHTML = `
    <div style="background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(10px); padding: ${mobile ? '20px 30px' : '25px 40px'}; border-radius: 20px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.2); text-align: center;">
      <div style="font-size: ${mobile ? '35px' : '40px'}; margin-bottom: 15px;">📱</div>
      <p style="color: white; font-size: ${mobile ? '16px' : '18px'}; font-weight: 600; margin: 0; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">
        Mensagem disparada para o Vivet! ✨
      </p>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  // Remove após tempo e chama callback
  setTimeout(() => {
    popup.style.animation = `fadeOut ${fadeOut}ms ease-out forwards`;
    setTimeout(() => {
      popup.remove();
      if (callback) callback();
    }, fadeOut);
  }, duration);
}

// Mostra popup de sucesso
function mostrarPopupSucesso(opcao) {
  const nomeOpcao = nomesOpcoesJantar[opcao];
  const mobile = isMobile();
  const animSpeed = mobile ? '0.15s' : '0.3s';
  
  const popup = document.createElement('div');
  popup.id = 'popup-sucesso-jantar';
  popup.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    z-index: 10002;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn ${animSpeed} ease-out;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `;
  
  // Permite fechar clicando fora
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      fecharPopupSucesso();
    }
  });
  
  popup.innerHTML = `
    <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #533483 100%); padding: ${mobile ? '30px 20px' : '40px'}; border-radius: 25px; max-width: 500px; width: 90%; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6); animation: modalSlideIn ${animSpeed} ease-out; text-align: center; position: relative; margin: 20px;">
      <span onclick="fecharPopupSucesso()" style="position: absolute; top: 15px; right: 15px; color: white; font-size: 32px; cursor: pointer; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255, 255, 255, 0.1); transition: all 0.2s; -webkit-tap-highlight-color: transparent;">&times;</span>
      <div style="font-size: ${mobile ? '60px' : '80px'}; margin-bottom: 20px; animation: catCelebrateModal ${mobile ? '0.3s' : '0.6s'} ease-out;">✅</div>
      <h2 style="font-size: ${mobile ? '24px' : '28px'}; margin-bottom: 20px; font-family: 'Dancing Script', cursive;">Escolha confirmada!</h2>
      <p style="font-size: ${mobile ? '16px' : '18px'}; line-height: 1.6; margin-bottom: 15px;">
        Você escolheu: <strong>${nomeOpcao}</strong>
      </p>
      <p style="font-size: ${mobile ? '14px' : '16px'}; opacity: 0.9; margin-bottom: 30px;">
        Mensagem enviada para o Vivet! 📱<br>
        Ele vai fazer acontecer no dia mais próximo possível. 💛
      </p>
      <button onclick="fecharPopupSucesso()" style="padding: ${mobile ? '14px 30px' : '12px 40px'}; border: none; border-radius: 25px; background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); color: white; font-weight: 600; cursor: pointer; font-size: ${mobile ? '15px' : '16px'}; box-shadow: 0 4px 15px rgba(74, 222, 128, 0.4); min-width: 120px; min-height: 44px; -webkit-tap-highlight-color: transparent; touch-action: manipulation;">
        Perfeito! 🐾
      </button>
    </div>
  `;
  
  document.body.appendChild(popup);
}

// Fecha popup de sucesso
function fecharPopupSucesso() {
  const popup = document.getElementById('popup-sucesso-jantar');
  if (popup) {
    const mobile = isMobile();
    const animSpeed = mobile ? 150 : 300;
    popup.style.animation = `fadeOut ${animSpeed}ms ease-out`;
    setTimeout(() => {
      popup.remove();
      document.body.style.overflow = ''; // Restaura scroll
    }, animSpeed);
  }
}

// Quando a página carregar
window.onload = function() {
  carregarEstadoSalvo();
};

// Função para atualizar o visual baseado no estado
function atualizarVisual() {
  Object.keys(presentesEstado).forEach(presenteId => {
    if (presentesEstado[presenteId]) {
      const card = document.getElementById(presenteId);
      const overlay = document.getElementById(`overlay-${presenteId}`);
      const status = card ? card.querySelector('.card-status') : null;
      
      if (card) {
        card.classList.add('usado');
      }
      
      if (overlay) {
        overlay.style.display = 'none';
      }
      
      if (status) {
        status.textContent = '🎁 Presente usado';
      }
    }
  });
}

// Salva estado no localStorage (temporário, depois vamos usar backend)
function salvarEstado() {
  localStorage.setItem('presentesEstado', JSON.stringify(presentesEstado));
  localStorage.setItem('raspadinhaEstado', JSON.stringify(raspadinhaEstado));
  localStorage.setItem('opcoesJantarEscolhidas', JSON.stringify(opcoesJantarEscolhidas));
}

// Função para criar gatinhos comemorativos quando resgata presente
function criarGatinhosComemorativos() {
  const gatinhos = ['🐱', '😸', '😻', '😽', '🐾'];
  
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const cat = document.createElement('div');
      cat.textContent = gatinhos[Math.floor(Math.random() * gatinhos.length)];
      cat.style.position = 'fixed';
      cat.style.fontSize = '40px';
      cat.style.pointerEvents = 'none';
      cat.style.zIndex = '10000';
      cat.style.left = Math.random() * 80 + 10 + '%';
      cat.style.top = Math.random() * 80 + 10 + '%';
      cat.style.animation = 'catCelebrate 2s ease-out forwards';
      document.body.appendChild(cat);
      
      setTimeout(() => {
        cat.remove();
      }, 2000);
    }, i * 100);
  }
}

// Adiciona CSS para animação dos gatinhos comemorativos
const style = document.createElement('style');
style.textContent = `
  @keyframes catCelebrate {
    0% {
      transform: translateY(0) scale(0) rotate(0deg);
      opacity: 0;
    }
    50% {
      transform: translateY(-100px) scale(1.5) rotate(180deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-200px) scale(0) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Easter egg: clicar várias vezes no título mostra mais gatinhos
let clickCount = 0;
document.addEventListener('DOMContentLoaded', function() {
  const titulo = document.querySelector('.titulo-presentes');
  if (titulo) {
    titulo.addEventListener('click', function() {
      clickCount++;
      if (clickCount >= 5) {
        criarChuvaDeGatinhos();
        clickCount = 0;
      }
    });
  }
});

// Função para criar chuva de gatinhos (easter egg)
function criarChuvaDeGatinhos() {
  const gatinhos = ['🐱', '😸', '😻', '😽', '🐾', '🙀', '😿', '😾'];
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const cat = document.createElement('div');
      cat.textContent = gatinhos[Math.floor(Math.random() * gatinhos.length)];
      cat.style.position = 'fixed';
      cat.style.fontSize = '50px';
      cat.style.pointerEvents = 'none';
      cat.style.zIndex = '10000';
      cat.style.left = Math.random() * 100 + '%';
      cat.style.top = '-50px';
      cat.style.animation = 'catRain 3s linear forwards';
      document.body.appendChild(cat);
      
      setTimeout(() => {
        cat.remove();
      }, 3000);
    }, i * 50);
  }
}

// Adiciona CSS para chuva de gatinhos
const style2 = document.createElement('style');
style2.textContent = `
  @keyframes catRain {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(calc(100vh + 100px)) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style2);
