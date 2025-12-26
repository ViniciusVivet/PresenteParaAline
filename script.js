// Estado dos presentes (por enquanto fake, depois vamos conectar com backend)
let presentesEstado = {
  massagem: false,
  jantar: false,
  carta: false,
  metas: false,
  taro: false
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

// Estado das cartas de tarô (cada carta pode ser aberta apenas uma vez a cada 24h)
let cartasTaroEstado = {
  prosperidade: false,
  foco: false,
  casa: false,
  alivio: false
};

// Timestamp da última carta aberta (cooldown global de 24h - só pode abrir uma carta a cada 24h)
let ultimaCartaAbertaTimestamp = null;

// Variável para armazenar qual carta está aguardando confirmação
let cartaAguardandoConfirmacao = null;

// Definições das cartas de tarô
const cartasTaro = {
  prosperidade: {
    titulo: "Carta da Prosperidade 💰",
    texto: `Quando essa carta aparece, o caminho se organiza.
As metas se alinham, a cabeça fica mais leve e o esforço começa a dar retorno.

O mês flui melhor, a cobrança pesa menos e você sente que está exatamente onde deveria estar.

✨ A prosperidade não chega gritando. Ela chega confirmando.`,
    emoji: "💰",
    dica: "Prosperidade",
    imagem: "assets/taro/prosperidade.jpg"
  },
  foco: {
    titulo: "Carta do Foco 🎯",
    texto: `Essa carta simboliza clareza.
Menos ruído, menos estresse desnecessário e mais controle do que realmente importa.

Ao tirar essa carta, você atravessa desafios com mais firmeza e termina o ciclo sabendo que fez o seu melhor.

✨ Quem confia no próprio processo, vence antes do final.`,
    emoji: "🎯",
    dica: "Foco",
    imagem: "assets/taro/foco.jpg"
  },
  casa: {
    titulo: "Carta da Casa 🏡",
    texto: `Quando essa carta se revela, o caminho do lar se move.
A obra anda, as pessoas se alinham e tudo flui melhor do que o esperado.

O que parecia lento ganha ritmo.
O que parecia distante se aproxima.

✨ O lugar certo já está te esperando.`,
    emoji: "🏡",
    dica: "Lar",
    imagem: "assets/taro/casa.jpg"
  },
  alivio: {
    titulo: "Carta do Alívio 🌙",
    texto: `Essa carta aparece quando você precisa lembrar de respirar.

Ela não promete menos responsabilidade — promete mais cuidado.
Mais descanso mental, mais leveza e menos cobrança interna.

✨ Nem tudo é urgência. Algumas coisas são só vida acontecendo.`,
    emoji: "🌙",
    dica: "Alívio",
    imagem: "assets/taro/alivio.jpg"
  }
};

// Conteúdo de cada presente - Linguagem carinhosa e emocional
const conteudoPresentes = {
  massagem: {
    titulo: "💆 Vale Massagem",
    texto: `Meu amor,
esse é um vale massagem pra quando você quiser um momento só seu.

Quando você usar esse presente, vai chegar uma mensagem direto no meu WhatsApp.
Aí eu vou saber que é hora de preparar tudo pra você.

Vou separar o creme, acender as velas e cuidar de você com calma e atenção.
É pra relaxar, desligar a cabeça e se sentir cuidada.

Quando você usar,
eu vou estar pronto. 🤍`
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
`
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
  metas: {
    titulo: "🔮 O Profeta das Metas",
    texto: `Metas que constroem nosso futuro.`,
    temProfeta: true // Flag para abrir tela fullscreen
  },
  taro: {
    titulo: "🔮 Tarô da Positividade",
    texto: `Bem-vinda ao Tarô da Positividade! 🌙

Aqui você encontrará 4 cartas especiais, cada uma com uma mensagem positiva e única.

Cada carta pode ser revelada apenas uma vez. Escolha com o coração e deixe que a energia positiva te guie.

✨ As cartas não prometem o impossível — elas apenas lembram você do que já está acontecendo.`,
    temCartas: true
  }
};

// Estado de raspadinha para cada presente
let raspadinhaEstado = {
  massagem: false,
  jantar: false,
  carta: false,
  metas: false,
  taro: false
};

// Estado de autenticação (será conectado ao Firebase depois)
let usuarioLogado = null;
let modoVisitante = false;

// Inicializa sistema quando página carrega
document.addEventListener('DOMContentLoaded', function() {
  verificarAutenticacao();
});

// Verifica se usuário está autenticado ou em modo visitante
function verificarAutenticacao() {
  // Verifica se já está logado (será implementado com Firebase depois)
  const usuarioSalvo = localStorage.getItem('usuarioLogado');
  const visitanteSalvo = localStorage.getItem('modoVisitante');
  
  if (usuarioSalvo) {
    // Usuário logado - mostra conteúdo principal
    usuarioLogado = JSON.parse(usuarioSalvo);
    mostrarConteudoPrincipal();
  } else if (visitanteSalvo === 'true') {
    // Modo visitante - mostra conteúdo principal
    modoVisitante = true;
    mostrarConteudoPrincipal();
  } else {
    // Não autenticado - mostra tela de login
    mostrarTelaLogin();
  }
}

// Mostra tela de login
function mostrarTelaLogin() {
  const loginScreen = document.getElementById('login-screen');
  const cadastroScreen = document.getElementById('cadastro-screen');
  const mainContent = document.getElementById('main-content');
  
  if (cadastroScreen) {
    cadastroScreen.style.display = 'none';
  }
  if (loginScreen) {
    loginScreen.style.display = 'flex';
  }
  if (mainContent) {
    mainContent.style.display = 'none';
  }
}

// Mostra conteúdo principal
function mostrarConteudoPrincipal() {
  const loginScreen = document.getElementById('login-screen');
  const cadastroScreen = document.getElementById('cadastro-screen');
  const mainContent = document.getElementById('main-content');
  const btnLogout = document.getElementById('btn-logout');
  
  if (loginScreen) {
    loginScreen.style.display = 'none';
  }
  if (cadastroScreen) {
    cadastroScreen.style.display = 'none';
  }
  if (mainContent) {
    mainContent.style.display = 'block';
  }
  
  // Mostra botão de logout se estiver logado (não visitante)
  if (btnLogout) {
    if (usuarioLogado && !modoVisitante) {
      btnLogout.style.display = 'flex';
    } else {
      btnLogout.style.display = 'none';
    }
  }
  
  // Inicializa sistema após mostrar conteúdo
  inicializarRaspadinhas();
  carregarEstadoSalvo();
  inicializarCliquesCards();
}

// Função de login (será conectada ao Firebase depois)
function fazerLogin(email, senha) {
  // TODO: Conectar com Firebase Auth
  // Por enquanto, apenas simula login
  return new Promise((resolve, reject) => {
    // Simula delay de autenticação
    setTimeout(() => {
      // Por enquanto, aceita qualquer email/senha
      // Depois será substituído por Firebase Auth
      usuarioLogado = {
        email: email,
        uid: 'temp-' + Date.now() // Temporário até conectar Firebase
      };
      
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
      localStorage.removeItem('modoVisitante');
      
      mostrarConteudoPrincipal();
      resolve(usuarioLogado);
    }, 500);
  });
}

// Função para entrar como visitante
function entrarComoVisitante() {
  modoVisitante = true;
  localStorage.setItem('modoVisitante', 'true');
  localStorage.removeItem('usuarioLogado');
  
  mostrarConteudoPrincipal();
}

// Mostra tela de cadastro
function mostrarTelaCadastro() {
  const loginScreen = document.getElementById('login-screen');
  const cadastroScreen = document.getElementById('cadastro-screen');
  
  if (loginScreen) {
    loginScreen.style.display = 'none';
  }
  if (cadastroScreen) {
    cadastroScreen.style.display = 'flex';
  }
}


// Função de cadastro (será conectada ao Firebase depois)
function fazerCadastro(nome, email, senha) {
  // TODO: Conectar com Firebase Auth
  // Por enquanto, apenas simula cadastro
  return new Promise((resolve, reject) => {
    // Simula delay de cadastro
    setTimeout(() => {
      // Por enquanto, aceita qualquer cadastro
      // Depois será substituído por Firebase Auth
      usuarioLogado = {
        nome: nome,
        email: email,
        uid: 'temp-' + Date.now() // Temporário até conectar Firebase
      };
      
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
      localStorage.removeItem('modoVisitante');
      
      mostrarConteudoPrincipal();
      resolve(usuarioLogado);
    }, 500);
  });
}

// Função para fazer logout
function fazerLogout() {
  if (confirm('Tem certeza que deseja sair? Seus dados locais serão mantidos, mas você precisará fazer login novamente para sincronizar.')) {
    usuarioLogado = null;
    modoVisitante = false;
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('modoVisitante');
    
    // Esconde botão de logout
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
      btnLogout.style.display = 'none';
    }
    
    // Mostra tela de login
    mostrarTelaLogin();
  }
}

// Handler do formulário de login
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const senha = document.getElementById('login-senha').value;
      
      if (!email || !senha) {
        alert('Por favor, preencha email e senha.');
        return;
      }
      
      // Mostra loading
      const submitBtn = loginForm.querySelector('.login-btn-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Entrando...</span>';
      submitBtn.disabled = true;
      
      try {
        await fazerLogin(email, senha);
      } catch (error) {
        alert('Erro ao fazer login. Tente novamente.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
  
  // Handler do formulário de cadastro
  const cadastroForm = document.getElementById('cadastro-form');
  if (cadastroForm) {
    cadastroForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const nome = document.getElementById('cadastro-nome').value.trim();
      const email = document.getElementById('cadastro-email').value;
      const senha = document.getElementById('cadastro-senha').value;
      const confirmarSenha = document.getElementById('cadastro-confirmar-senha').value;
      
      if (!nome || !email || !senha || !confirmarSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      
      if (senha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
      }
      
      if (senha !== confirmarSenha) {
        alert('As senhas não coincidem. Tente novamente.');
        return;
      }
      
      // Mostra loading
      const submitBtn = cadastroForm.querySelector('.login-btn-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Criando conta...</span>';
      submitBtn.disabled = true;
      
      try {
        await fazerCadastro(nome, email, senha);
      } catch (error) {
        alert('Erro ao criar conta. Tente novamente.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});

// Inicializa cliques nos cards (para cards usados, mostra modal novamente)
function inicializarCliquesCards() {
  const cards = document.querySelectorAll('.gift-box, .card');
  
  cards.forEach(card => {
    const presenteId = card.getAttribute('data-presente');
    
    card.addEventListener('click', function(e) {
      // Se clicou no overlay, não faz nada (já tem evento próprio)
      if (e.target.closest('.raspadinha-overlay')) {
        return;
      }
      
      // Se o presente já foi raspado (revelado), mostra modal
      if (raspadinhaEstado[presenteId]) {
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
  const cards = document.querySelectorAll('.gift-box, .card');
  
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
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      // Calcula posição relativa ao overlay (mesmo se estiver nas bordas ampliadas)
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      // Verifica se está dentro da área do overlay (incluindo bordas ampliadas)
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        // Cria efeito visual de raspagem
        criarEfeitoRaspagem(x, y, overlay);
        
        // Calcula porcentagem raspada (mais sensível)
        porcentagemRaspada += 2.5;
        
        if (porcentagemRaspada >= 100) {
          revelarPresente(presenteId);
        }
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
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 11;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  `;
  overlay.appendChild(circulo);
  
  setTimeout(() => {
    circulo.style.transition = 'opacity 0.4s, transform 0.4s';
    circulo.style.opacity = '0';
    circulo.style.transform = 'translate(-50%, -50%) scale(1.5)';
    setTimeout(() => circulo.remove(), 400);
  }, 150);
}

// Mensagens da mascote Lina Trova
const mensagensMascote = {
  massagem: "Que escolha incrível! Você merece esse momento de relaxamento total! 😸💆",
  jantar: "Adorei sua escolha! Vai ser um jantar especial, tenho certeza! 🍝✨",
  carta: "Essa vai ser emocionante! Palavras do coração são as melhores! 💌❤️",
  foto: "Memórias são tesouros! Essa foto vai ser especial! 📸💖",
  taro: "Que momento especial! As cartas têm algo especial para você! 🔮✨"
};

// Revela o presente quando raspado completamente
function revelarPresente(presenteId) {
  if (raspadinhaEstado[presenteId]) return;
  
  // Marca como raspado (revelado), mas NÃO como usado ainda
  raspadinhaEstado[presenteId] = true;
  // NÃO marca como usado - só quando confirmar no modal (exceto metas que é usado automaticamente)
  
  const overlay = document.getElementById(`overlay-${presenteId}`);
  const giftBox = document.getElementById(presenteId);
  const status = giftBox.querySelector('.gift-status') || giftBox.querySelector('.card-status');
  const titulo = giftBox.querySelector('.gift-titulo') || giftBox.querySelector('.card-titulo');
  
  // Remove overlay com animação
  overlay.style.transition = 'opacity 0.5s ease-out';
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 500);
  
  // Se for metas, abre tela fullscreen após animação
  if (presenteId === 'metas') {
    setTimeout(() => {
      giftBox.classList.add('aberto');
      mostrarProfetaFullscreen();
    }, 800);
    return;
  }
  
  // Anima abertura do presente
  setTimeout(() => {
    // Marca como aberto para animação
    giftBox.classList.add('aberto');
    
    // Cria partículas de brilho
    criarParticulasBrilho(giftBox);
    
    // Mostra título após animação
    if (titulo) {
      titulo.style.display = 'block';
    }
  }, 100);
  
  // Atualiza status - presente revelado mas ainda não usado
  if (status) {
    status.textContent = '🎁 Presente revelado';
  }
  
  // NÃO marca como usado ainda - só quando confirmar no modal
  
  // Mascote reage!
  mostrarMensagemMascote(presenteId);
  
  // Mostra modal com conteúdo (com delay para não sobrepor a mensagem da mascote)
  setTimeout(() => {
    mostrarModal(presenteId);
  }, 2000);
  
  // Salva estado (mas sem marcar como usado ainda)
  salvarEstado();
}

// Cria partículas de brilho quando presente abre
function criarParticulasBrilho(giftBox) {
  const particulas = ['✨', '⭐', '💫', '🌟'];
  const rect = giftBox.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const particula = document.createElement('div');
      particula.textContent = particulas[Math.floor(Math.random() * particulas.length)];
      particula.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        font-size: 24px;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        animation: particulaBrilho 1s ease-out forwards;
      `;
      
      const angle = (Math.PI * 2 * i) / 8;
      const distance = 60 + Math.random() * 40;
      const finalX = centerX + Math.cos(angle) * distance;
      const finalY = centerY + Math.sin(angle) * distance;
      
      document.body.appendChild(particula);
      
      setTimeout(() => {
        particula.style.transition = 'all 1s ease-out';
        particula.style.left = finalX + 'px';
        particula.style.top = finalY + 'px';
        particula.style.opacity = '0';
        particula.style.transform = `translate(-50%, -50%) scale(0.5)`;
        
        setTimeout(() => {
          particula.remove();
        }, 1000);
      }, 50);
    }, i * 50);
  }
  
  // Adiciona CSS da animação se não existir
  if (!document.getElementById('particula-brilho-style')) {
    const style = document.createElement('style');
    style.id = 'particula-brilho-style';
    style.textContent = `
      @keyframes particulaBrilho {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0) rotate(0deg);
        }
        50% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
        }
        100% {
          opacity: 0.8;
          transform: translate(-50%, -50%) scale(1) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  }
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
  // Se já foi raspado, apenas mostra modal ou tela fullscreen
  if (raspadinhaEstado[presenteId]) {
    // Se for metas, abre tela fullscreen diretamente
    if (presenteId === 'metas') {
      mostrarProfetaFullscreen();
      return;
    }
    mostrarModal(presenteId);
    return;
  }
  
  // Se não foi raspado ainda, inicia raspagem
  const overlay = document.getElementById(`overlay-${presenteId}`);
  if (overlay) {
    overlay.style.display = 'block';
  }
}

// Função para criar HTML das cartas de tarô
function criarHTMLCartasTaro() {
  const cartasIds = ['prosperidade', 'foco', 'casa', 'alivio'];
  let html = '';
  
  cartasIds.forEach(cartaId => {
    const carta = cartasTaro[cartaId];
    const estaAberta = cartasTaroEstado[cartaId];
    
    if (estaAberta) {
      // Carta já aberta - mostra conteúdo
      html += `
        <div class="carta-taro aberta" data-carta="${cartaId}" style="
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
          border-radius: 20px;
          padding: 25px;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          border: 2px solid rgba(255, 255, 255, 0.3);
          cursor: default;
          opacity: 0.8;
        ">
          <div style="font-size: 60px; margin-bottom: 15px;">${carta.emoji}</div>
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 15px; font-family: 'Dancing Script', cursive;">${carta.titulo}</h3>
          <p style="font-size: 15px; line-height: 1.7; white-space: pre-line; opacity: 0.9;">${carta.texto}</p>
          <div style="margin-top: 15px; font-size: 14px; opacity: 0.7;">🃏 Carta usada</div>
        </div>
      `;
    } else {
      // Carta fechada - mostra verso
      html += `
        <div class="carta-taro fechada" data-carta="${cartaId}" onclick="abrirCartaTaro('${cartaId}')" style="
          background: linear-gradient(135deg, rgba(80, 80, 120, 0.9) 0%, rgba(60, 60, 100, 0.9) 100%);
          border-radius: 20px;
          padding: 25px;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          border: 2px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        ">
          <div style="font-size: 80px; margin-bottom: 20px; opacity: 0.8;">🔮</div>
          <p style="font-size: 16px; font-weight: 600; opacity: 0.9;">Toque para revelar sua carta</p>
          <div style="position: absolute; top: 10px; right: 10px; font-size: 20px; opacity: 0.5;">🌙</div>
        </div>
      `;
    }
  });
  
  return html;
}

// ============================================
// TELA FULLSCREEN DO TARÔ
// ============================================

// Verifica se pode abrir carta (cooldown global de 24h - só pode abrir uma carta a cada 24h)
function podeAbrirCarta(cartaId) {
  // Se nunca abriu nenhuma carta, pode abrir
  if (!ultimaCartaAbertaTimestamp) return true;
  
  const agora = Date.now();
  const vinteQuatroHoras = 24 * 60 * 60 * 1000; // 24h em ms
  const tempoPassado = agora - ultimaCartaAbertaTimestamp;
  
  return tempoPassado >= vinteQuatroHoras;
}

// Calcula tempo restante até próxima abertura (cooldown global)
function calcularTempoRestante(cartaId) {
  // Se nunca abriu nenhuma carta, não tem tempo restante
  if (!ultimaCartaAbertaTimestamp) return null;
  
  const agora = Date.now();
  const vinteQuatroHoras = 24 * 60 * 60 * 1000;
  const tempoPassado = agora - ultimaCartaAbertaTimestamp;
  const tempoRestante = vinteQuatroHoras - tempoPassado;
  
  if (tempoRestante <= 0) return null;
  
  const horas = Math.floor(tempoRestante / (60 * 60 * 1000));
  const minutos = Math.floor((tempoRestante % (60 * 60 * 1000)) / (60 * 1000));
  
  return { horas, minutos };
}

// Formata tempo restante para exibição
function formatarTempoRestante(tempo) {
  if (!tempo) return '';
  if (tempo.horas > 0) {
    return `${tempo.horas}h ${tempo.minutos}m`;
  }
  return `${tempo.minutos}m`;
}

// Mostra tela fullscreen do tarô
function mostrarTaroFullscreen() {
  const taroFullscreen = document.getElementById('taro-fullscreen');
  if (!taroFullscreen) return;
  
  // Primeiro cria as cartas
  criarCartasTaro();
  
  // Depois mostra a tela
  taroFullscreen.classList.add('ativo');
  // NÃO bloqueia scroll do body - deixa o scroll livre na tela do tarô
  
  // Scroll automático para baixo quando abre (mostra as cartas)
  setTimeout(() => {
    // Rola para mostrar o grid de cartas
    const grid = document.getElementById('taro-grid');
    if (grid) {
      grid.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    } else {
      // Fallback: rola um pouco para baixo
      taroFullscreen.scrollTo({
        top: 300,
        behavior: 'smooth'
      });
    }
  }, 300);
  
  // Garante scroll após renderização completa
  setTimeout(() => {
    const grid = document.getElementById('taro-grid');
    if (grid) {
      grid.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  }, 600);
}

// Fecha tela fullscreen do tarô
function fecharTaroFullscreen() {
  const taroFullscreen = document.getElementById('taro-fullscreen');
  if (!taroFullscreen) return;
  
  taroFullscreen.classList.remove('ativo');
  // Não precisa restaurar overflow do body pois não bloqueamos
  
  // Para o timer quando fecha
  if (timerTaroInterval) {
    clearInterval(timerTaroInterval);
    timerTaroInterval = null;
  }
}

// Cria as cartas de tarô no grid
function criarCartasTaro() {
  const grid = document.getElementById('taro-grid');
  if (!grid) return;
  
  const cartasIds = ['prosperidade', 'foco', 'casa', 'alivio'];
  grid.innerHTML = '';
  
  // Verifica cooldown global (se pode abrir qualquer carta)
  const podeAbrirQualquerCarta = podeAbrirCarta('qualquer');
  const tempoRestanteGlobal = calcularTempoRestante('qualquer');
  
  cartasIds.forEach(cartaId => {
    const carta = cartasTaro[cartaId];
    const foiAberta = cartasTaroEstado[cartaId];
    
    // Só pode clicar se nunca foi aberta E pode abrir qualquer carta (cooldown global)
    const podeClicar = !foiAberta && podeAbrirQualquerCarta;
    
    const cartaHTML = `
      <div class="taro-carta ${!podeClicar && !foiAberta ? 'bloqueada' : ''} ${foiAberta ? 'flipped' : ''}" 
           data-carta="${cartaId}"
           ${podeClicar ? `onclick="mostrarConfirmacaoAberturaCarta('${cartaId}')"` : ''}
           ${!podeClicar && !foiAberta ? 'title="Você já abriu uma carta. Aguarde 24h para abrir outra."' : ''}
           ${foiAberta ? 'title="Esta carta já foi aberta."' : ''}>
        <div class="taro-carta-inner">
          <!-- Verso da carta (imagem GRANDE - ANTES de abrir) -->
          <div class="taro-carta-face taro-carta-verso">
            <div class="taro-carta-imagem-container">
              <img src="${carta.imagem}" alt="${carta.titulo}" class="taro-carta-imagem" 
                   onerror="this.onerror=null; this.style.display='none'; const fallback = this.parentElement.querySelector('.taro-carta-emoji-fallback'); if(fallback) fallback.style.display='flex';">
              <div class="taro-carta-emoji-fallback" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 120px; opacity: 0.8;">
                ${carta.emoji}
              </div>
            </div>
            <div class="taro-carta-dica">${carta.dica}</div>
            ${!foiAberta && podeClicar ? '<div class="taro-carta-clique">👆 Clique para revelar</div>' : ''}
            ${!foiAberta && !podeClicar && tempoRestanteGlobal ? `
              <div class="taro-carta-clique" style="background: rgba(138, 43, 226, 0.3); border: 1px solid rgba(138, 43, 226, 0.5); color: rgba(255, 255, 255, 0.8);">
                ⏱️ Aguarde ${formatarTempoRestante(tempoRestanteGlobal)}
              </div>
            ` : ''}
          </div>
          
          <!-- Frente da carta (conteúdo - DEPOIS de abrir) -->
          <div class="taro-carta-face taro-carta-frente" style="background-image: url('${carta.imagem}');">
            <!-- Imagem menor no topo (mesma imagem do verso) -->
            <div class="taro-carta-imagem-container-pequeno">
              <img src="${carta.imagem}" alt="${carta.titulo}" class="taro-carta-imagem-pequena" 
                   onerror="this.onerror=null; this.style.display='none'; const fallback = this.parentElement.querySelector('.taro-carta-emoji-fallback-pequeno'); if(fallback) fallback.style.display='flex';">
              <div class="taro-carta-emoji-fallback-pequeno" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 80px; opacity: 0.8;">
                ${carta.emoji}
              </div>
            </div>
            <h3 class="taro-carta-titulo">${carta.titulo}</h3>
            <p class="taro-carta-texto">${carta.texto}</p>
            ${foiAberta ? `
              <div class="taro-carta-usada">
                🃏 Carta já aberta
              </div>
            ` : ''}
            ${!foiAberta && !podeAbrirQualquerCarta && tempoRestanteGlobal ? `
              <div class="taro-carta-usada" style="margin-top: 20px; background: rgba(138, 43, 226, 0.2); border: 1px solid rgba(138, 43, 226, 0.4);">
                ⏱️ Aguarde para abrir uma nova carta
                <div class="taro-carta-timer" id="timer-global-${cartaId}">
                  Próxima abertura em: ${formatarTempoRestante(tempoRestanteGlobal)}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
    
    grid.innerHTML += cartaHTML;
  });
  
  // Aplica background-image via CSS variable para o blur funcionar
  setTimeout(() => {
    document.querySelectorAll('.taro-carta-frente[style*="background-image"]').forEach(carta => {
      const bgImage = carta.style.backgroundImage;
      if (bgImage) {
        carta.style.setProperty('--bg-image', bgImage);
      }
    });
  }, 10);
  
  // Inicia timer para atualizar contadores
  iniciarTimerTaro();
}

// Timer para atualizar contadores de tempo restante (cooldown global)
let timerTaroInterval = null;
function iniciarTimerTaro() {
  // Limpa timer anterior se existir
  if (timerTaroInterval) {
    clearInterval(timerTaroInterval);
  }
  
  // Atualiza a cada minuto
  timerTaroInterval = setInterval(() => {
    const cartasIds = ['prosperidade', 'foco', 'casa', 'alivio'];
    let precisaAtualizar = false;
    const tempoRestanteGlobal = calcularTempoRestante('qualquer');
    
    cartasIds.forEach(cartaId => {
      // Atualiza timer global em cada carta (se existir)
      const timerElement = document.getElementById(`timer-global-${cartaId}`);
      
      if (timerElement) {
        if (tempoRestanteGlobal) {
          timerElement.textContent = `Próxima abertura em: ${formatarTempoRestante(tempoRestanteGlobal)}`;
          precisaAtualizar = true;
        } else {
          // Tempo expirou, recria cartas para liberar
          precisaAtualizar = true;
        }
      }
      
      // Atualiza também o texto no verso da carta (se existir)
      const cliqueElement = document.querySelector(`.taro-carta[data-carta="${cartaId}"] .taro-carta-clique`);
      if (cliqueElement && !document.querySelector(`.taro-carta[data-carta="${cartaId}"]`).classList.contains('flipped')) {
        if (tempoRestanteGlobal) {
          cliqueElement.textContent = `⏱️ Aguarde ${formatarTempoRestante(tempoRestanteGlobal)}`;
          precisaAtualizar = true;
        } else {
          // Tempo expirou, recria cartas para mostrar "Clique para revelar"
          precisaAtualizar = true;
        }
      }
    });
    
    // Se alguma carta pode ser aberta agora, recria o grid
    if (precisaAtualizar) {
      criarCartasTaro();
    }
  }, 60000); // Atualiza a cada minuto
}

// Abre carta de tarô com animação flip
// Função para mostrar modal de confirmação antes de abrir carta
function mostrarConfirmacaoAberturaCarta(cartaId) {
  const cartaElement = document.querySelector(`.taro-carta[data-carta="${cartaId}"]`);
  if (!cartaElement) return;
  
  // Verifica se pode abrir
  if (!podeAbrirCarta(cartaId)) {
    return;
  }
  
  // Verifica se já foi aberta
  if (cartasTaroEstado[cartaId]) {
    return;
  }
  
  // Armazena qual carta está aguardando confirmação
  cartaAguardandoConfirmacao = cartaId;
  
  // Obtém informações da carta
  const carta = cartasTaro[cartaId];
  if (!carta) return;
  
  // Atualiza o texto do modal com o nome da carta
  const confirmacaoTexto = document.getElementById('taro-confirmacao-texto');
  if (confirmacaoTexto) {
    confirmacaoTexto.innerHTML = `
      Você tem certeza que quer abrir a <strong>${carta.titulo}</strong>?
      <br><br>
      Quando você abrir essa carta, ela intervém no seu destino.
      <br><br>
      Você só pode abrir uma carta a cada 24 horas.
      <br><br>
      <strong>Abra com sabedoria e coração. ✨</strong>
    `;
  }
  
  // Mostra o modal de confirmação
  const modal = document.getElementById('taro-confirmacao-modal');
  if (modal) {
    modal.classList.add('ativo');
  }
}

// Função para cancelar abertura da carta
function cancelarAberturaCarta() {
  cartaAguardandoConfirmacao = null;
  const modal = document.getElementById('taro-confirmacao-modal');
  if (modal) {
    modal.classList.remove('ativo');
  }
}

// Função para confirmar e abrir a carta
function confirmarAberturaCarta() {
  if (!cartaAguardandoConfirmacao) return;
  
  const cartaId = cartaAguardandoConfirmacao;
  cartaAguardandoConfirmacao = null;
  
  // Fecha o modal
  const modal = document.getElementById('taro-confirmacao-modal');
  if (modal) {
    modal.classList.remove('ativo');
  }
  
  // Abre a carta
  abrirCartaTaroFullscreen(cartaId);
}

function abrirCartaTaroFullscreen(cartaId) {
  const cartaElement = document.querySelector(`.taro-carta[data-carta="${cartaId}"]`);
  if (!cartaElement) return;
  
  // Verifica se pode abrir
  if (!podeAbrirCarta(cartaId)) {
    return;
  }
  
  // Verifica se já foi aberta
  if (cartasTaroEstado[cartaId]) {
    return;
  }
  
  // Adiciona classe para flip
  cartaElement.classList.add('flipped');
  
  // Marca como aberta e salva timestamp global (cooldown de 24h para qualquer carta)
  cartasTaroEstado[cartaId] = true;
  ultimaCartaAbertaTimestamp = Date.now();
  
  // Salva estado
  salvarEstado();
  
  // Verifica se todas as cartas foram abertas
  const todasAbertas = Object.values(cartasTaroEstado).every(aberta => aberta === true);
  if (todasAbertas) {
    presentesEstado.taro = true;
    const giftBox = document.getElementById('taro');
    const overlay = document.getElementById('overlay-taro');
    const status = giftBox ? (giftBox.querySelector('.gift-status') || giftBox.querySelector('.card-status')) : null;
    
    if (giftBox) {
      giftBox.classList.add('aberto', 'usado');
    }
    
    if (overlay) {
      overlay.style.display = 'none';
    }
    
    if (status) {
      status.textContent = '🃏 Presente usado';
    }
    
    salvarEstado();
  }
  
  // Atualiza visual após animação
  setTimeout(() => {
    criarCartasTaro();
  }, 800);
}

// Função para abrir uma carta de tarô (mantida para compatibilidade)
function abrirCartaTaro(cartaId) {
  // Se a tela fullscreen estiver aberta, usa a função nova
  const taroFullscreen = document.getElementById('taro-fullscreen');
  if (taroFullscreen && taroFullscreen.classList.contains('ativo')) {
    abrirCartaTaroFullscreen(cartaId);
    return;
  }
  
  // Senão, mantém comportamento antigo (não deveria acontecer)
  abrirCartaTaroFullscreen(cartaId);
}

// Função para mostrar o modal
function mostrarModal(presenteId) {
  // Se for metas, mostra a interface do Profeta diretamente
  if (presenteId === 'metas') {
    mostrarProfetaFullscreen();
    return;
  }
  
  // Se for taro, mostra a tela fullscreen do tarô
  if (presenteId === 'taro') {
    mostrarTaroFullscreen();
    return;
  }
  
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
    // Conta quantas opções estão disponíveis
    const opcoesDisponiveis = Object.values(opcoesJantarEscolhidas).filter(escolhida => !escolhida).length;
    const totalOpcoes = Object.keys(opcoesJantarEscolhidas).length;
    
    conteudoHTML += `
      <div style="text-align: left; font-size: 18px; line-height: 1.8; background: rgba(255, 255, 255, 0.05); padding: 25px; border-radius: 15px; margin: 20px 0;">
        <div data-contador-pratos style="text-align: center; margin-bottom: 20px; padding: 12px; background: rgba(212, 175, 55, 0.15); border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.3);">
          <p style="margin: 0; font-size: 16px; color: rgba(255, 255, 255, 0.9);">
            <strong style="color: #d4af37;">🍽️ Pratos disponíveis: ${opcoesDisponiveis}/${totalOpcoes}</strong>
          </p>
        </div>
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
  } else if (presenteId === 'taro' && conteudo.temCartas) {
    // Tarô da Positividade - abre tela fullscreen
    mostrarTaroFullscreen();
    return; // Não mostra modal, já abre tela fullscreen
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
  
  
  // Verifica se o presente já foi usado
  const jaUsado = presentesEstado[presenteId];
  
  // Para o jantar e metas, não mostra botão "usar presente" (jantar não tem esse botão, metas é usado automaticamente)
  const mostrarBotaoUsar = presenteId !== 'jantar' && presenteId !== 'metas' && !jaUsado;
  
  conteudoHTML += `
    <div style="text-align: center; margin-top: 30px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
      ${mostrarBotaoUsar ? `
        <button onclick="usarPresente('${presenteId}')" class="btn-modal-usar" style="
          padding: 12px 30px;
          border: none;
          border-radius: 25px;
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(74, 222, 128, 0.4);
          font-family: 'Poppins', sans-serif;
          font-size: 16px;
        ">
          Usar presente ✨
        </button>
      ` : ''}
      <button onclick="fecharModal()" class="btn-modal-close">
        ${jaUsado ? 'Fechar 🐾' : 'Fechar'}
      </button>
    </div>
  `;
  
  modalBody.innerHTML = conteudoHTML;
  
  // Adiciona gatinhos comemorativos quando revela
  criarGatinhosComemorativos();

  modal.style.display = 'block';
  
  // Detecta se é mobile
  const isMobileDevice = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Animação de entrada do modal
  setTimeout(() => {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
      modalContent.style.animation = 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      
      if (isMobileDevice) {
        // Mobile: scroll para o topo do modal imediatamente
        setTimeout(() => {
          modal.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          
          // Garante que o conteúdo fique visível
          setTimeout(() => {
            const modalBody = document.getElementById('modal-body');
            if (modalBody) {
              modalBody.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
              });
            }
          }, 100);
        }, 100);
      } else {
        // Desktop: scroll suave até o modal (centro)
        setTimeout(() => {
          modalContent.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }, 50);
      }
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
// Função para usar o presente (marca como usado)
function usarPresente(presenteId) {
  // Marca como usado
  presentesEstado[presenteId] = true;
  
  const giftBox = document.getElementById(presenteId);
  const status = giftBox ? (giftBox.querySelector('.gift-status') || giftBox.querySelector('.card-status')) : null;
  
  // Adiciona classe usado para ficar cinza
  if (giftBox) {
    giftBox.classList.add('usado');
  }
  
  // Atualiza status
  if (status) {
    status.textContent = '🎁 Presente usado';
  }
  
  // Salva estado
  salvarEstado();
  
  // Fecha o modal
  fecharModal();
  
  // Mostra mensagem de confirmação
  mostrarMensagemMascote(presenteId);
  
  // Mostra popup de sucesso
  setTimeout(() => {
    const popup = document.createElement('div');
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10003;
      pointer-events: none;
      animation: fadeInOut 2s ease-in-out forwards;
    `;
    
    popup.innerHTML = `
      <div style="background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(10px); padding: 25px 40px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.2); text-align: center;">
        <div style="font-size: 40px; margin-bottom: 15px;">✅</div>
        <p style="color: white; font-size: 18px; font-weight: 600; margin: 0; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">
          Presente usado! 🎁✨
        </p>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
      popup.style.animation = 'fadeOut 0.5s ease-out forwards';
      setTimeout(() => popup.remove(), 500);
    }, 1500);
  }, 100);
}

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
  
  // Carrega estado das cartas de tarô
  const cartasTaroSalvas = localStorage.getItem('cartasTaroEstado');
  if (cartasTaroSalvas) {
    try {
      cartasTaroEstado = JSON.parse(cartasTaroSalvas);
    } catch (e) {
      console.log('Erro ao carregar estado das cartas de tarô');
    }
  }
  
  // Carrega timestamp da última carta aberta (cooldown global)
  const ultimaCartaAbertaTimestampSalvo = localStorage.getItem('ultimaCartaAbertaTimestamp');
  if (ultimaCartaAbertaTimestampSalvo) {
    try {
      ultimaCartaAbertaTimestamp = parseInt(ultimaCartaAbertaTimestampSalvo);
      // Se não é um número válido, limpa
      if (isNaN(ultimaCartaAbertaTimestamp)) {
        ultimaCartaAbertaTimestamp = null;
      }
    } catch (e) {
      console.log('Erro ao carregar timestamp da última carta aberta');
      ultimaCartaAbertaTimestamp = null;
    }
  }
  
  // Migração: Se existir o formato antigo (objeto), converte para o novo formato (timestamp único)
  const cartasTaroTimestampsSalvos = localStorage.getItem('cartasTaroTimestamps');
  if (cartasTaroTimestampsSalvos && !ultimaCartaAbertaTimestamp) {
    try {
      const timestampsAntigos = JSON.parse(cartasTaroTimestampsSalvos);
      // Pega o timestamp mais recente de todas as cartas
      const valores = Object.values(timestampsAntigos).filter(v => v !== null);
      if (valores.length > 0) {
        ultimaCartaAbertaTimestamp = Math.max(...valores);
        // Salva no novo formato
        localStorage.setItem('ultimaCartaAbertaTimestamp', ultimaCartaAbertaTimestamp.toString());
        // Remove o formato antigo
        localStorage.removeItem('cartasTaroTimestamps');
      }
    } catch (e) {
      console.log('Erro ao migrar timestamps antigos das cartas de tarô');
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
  
  // Verifica se todas as opções foram escolhidas
  const todasEscolhidas = Object.values(opcoesJantarEscolhidas).every(escolhida => escolhida === true);
  
  // Se todas foram escolhidas, marca o presente como usado
  if (todasEscolhidas) {
    presentesEstado.jantar = true;
    // Atualiza visual do presente (fica cinza)
    const giftBox = document.getElementById('jantar');
    if (giftBox) {
      giftBox.classList.add('usado');
      const status = giftBox.querySelector('.gift-status');
      if (status) {
        status.textContent = '🎁 Presente usado';
      }
    }
  }
  
  // Salva no localStorage
  salvarEstado();
  
  // Atualiza visual no modal (opção marcada)
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
  
  // Atualiza contador de pratos disponíveis
  atualizarContadorPratos();
  
  // Mostra popup transparente de mensagem disparada
  mostrarPopupMensagemDisparada(() => {
    // Depois mostra popup de sucesso
    mostrarPopupSucesso(opcao);
  });
}

// Função para atualizar contador de pratos disponíveis
function atualizarContadorPratos() {
  const opcoesDisponiveis = Object.values(opcoesJantarEscolhidas).filter(escolhida => !escolhida).length;
  const totalOpcoes = Object.keys(opcoesJantarEscolhidas).length;
  
  // Procura o elemento do contador no modal
  const modalBody = document.getElementById('modal-body');
  if (!modalBody) return;
  
  // Procura pelo contador (se existir)
  let contadorElement = modalBody.querySelector('[data-contador-pratos]');
  
  if (contadorElement) {
    // Atualiza o texto do contador
    contadorElement.innerHTML = `<strong style="color: #d4af37;">🍽️ Pratos disponíveis: ${opcoesDisponiveis}/${totalOpcoes}</strong>`;
  }
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
    const foiRaspado = raspadinhaEstado[presenteId];
    let foiUsado = presentesEstado[presenteId];
    
    // Para o jantar, verifica se todas as opções foram escolhidas
    if (presenteId === 'jantar') {
      const todasEscolhidas = Object.values(opcoesJantarEscolhidas).every(escolhida => escolhida === true);
      foiUsado = todasEscolhidas;
      // Atualiza o estado se todas foram escolhidas
      if (todasEscolhidas && !presentesEstado.jantar) {
        presentesEstado.jantar = true;
        salvarEstado();
      }
    }
    
    if (foiRaspado) {
      const giftBox = document.getElementById(presenteId);
      const overlay = document.getElementById(`overlay-${presenteId}`);
      const status = giftBox ? (giftBox.querySelector('.gift-status') || giftBox.querySelector('.card-status')) : null;
      const titulo = giftBox ? (giftBox.querySelector('.gift-titulo') || giftBox.querySelector('.card-titulo')) : null;
      
      if (giftBox) {
        // Sempre marca como aberto se foi raspado
        giftBox.classList.add('aberto');
        
        // Só marca como usado se realmente foi usado
        if (foiUsado) {
          giftBox.classList.add('usado');
        }
        
        // Mostra título se presente já foi aberto
        if (titulo) {
          titulo.style.display = 'block';
          titulo.style.opacity = '1';
          titulo.style.transform = 'translateY(0)';
        }
      }
      
      if (overlay) {
        overlay.style.display = 'none';
      }
      
      if (status) {
        // Atualiza status baseado se foi usado ou só revelado
        status.textContent = foiUsado ? '🎁 Presente usado' : '🎁 Presente revelado';
      }
    }
  });
}

// Salva estado no localStorage (temporário, depois vamos usar backend)
function salvarEstado() {
  localStorage.setItem('presentesEstado', JSON.stringify(presentesEstado));
  localStorage.setItem('raspadinhaEstado', JSON.stringify(raspadinhaEstado));
  localStorage.setItem('opcoesJantarEscolhidas', JSON.stringify(opcoesJantarEscolhidas));
  localStorage.setItem('cartasTaroEstado', JSON.stringify(cartasTaroEstado));
  // Salva timestamp global da última carta aberta (cooldown de 24h para qualquer carta)
  if (ultimaCartaAbertaTimestamp) {
    localStorage.setItem('ultimaCartaAbertaTimestamp', ultimaCartaAbertaTimestamp.toString());
  } else {
    localStorage.removeItem('ultimaCartaAbertaTimestamp');
  }
  // Remove formato antigo se ainda existir
  localStorage.removeItem('cartasTaroTimestamps');
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

// ============================================
// GÊNIO DOS DESEJOS (SUPORTE)
// ============================================

// Função para mostrar modal do Gênio dos Desejos
function mostrarModalGenioDesejos() {
  const modal = document.getElementById('modal-genio-desejos');
  if (!modal) return;
  
  modal.classList.add('ativo');
  // Foca no textarea
  setTimeout(() => {
    const textarea = document.getElementById('mensagem-genio-desejos');
    if (textarea) {
      textarea.focus();
    }
  }, 300);
}

// Função para fechar modal do Gênio dos Desejos
function fecharModalGenioDesejos() {
  const modal = document.getElementById('modal-genio-desejos');
  if (!modal) return;
  
  modal.classList.remove('ativo');
  // Limpa o textarea
  const textarea = document.getElementById('mensagem-genio-desejos');
  if (textarea) {
    textarea.value = '';
  }
}

// Função para enviar mensagem do Gênio dos Desejos
function enviarMensagemGenioDesejos(event) {
  if (event) {
    event.preventDefault();
  }
  
  const textarea = document.getElementById('mensagem-genio-desejos');
  if (!textarea) return;
  
  const mensagem = textarea.value.trim();
  
  if (!mensagem) {
    // Mostra feedback visual se estiver vazio
    textarea.style.borderColor = 'rgba(255, 0, 0, 0.6)';
    setTimeout(() => {
      textarea.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }, 1000);
    return;
  }
  
  // Aqui você pode implementar o envio real quando tiver backend
  // Por enquanto, vamos apenas mostrar uma mensagem de sucesso
  
  // Mostra popup de sucesso
  mostrarPopupGenioSucesso(mensagem);
  
  // Limpa o textarea
  textarea.value = '';
  
  // Fecha o modal após um delay
  setTimeout(() => {
    fecharModalGenioDesejos();
  }, 500);
}

// Função para mostrar popup de sucesso do Gênio
function mostrarPopupGenioSucesso(mensagem) {
  const popup = document.createElement('div');
  popup.id = 'popup-genio-sucesso';
  popup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 30000;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.95) 0%, rgba(184, 134, 11, 0.95) 100%);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    padding: 30px 40px;
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.6),
      0 0 40px rgba(212, 175, 55, 0.4);
    text-align: center;
    animation: fadeInUp 0.4s ease-out;
    max-width: 400px;
    width: 90%;
  `;
  
  popup.innerHTML = `
    <div style="font-size: 60px; margin-bottom: 15px; animation: pulse 1s ease-in-out;">✨</div>
    <h3 style="font-size: 24px; font-weight: 700; color: white; margin-bottom: 15px; font-family: 'Dancing Script', cursive; text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);">
      Desejo Enviado!
    </h3>
    <p style="font-size: 16px; color: white; line-height: 1.6; text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);">
      Sua sugestão foi recebida! Obrigado por ajudar a tornar esta experiência ainda melhor! 💙
    </p>
  `;
  
  document.body.appendChild(popup);
  
  // Remove o popup após 3 segundos
  setTimeout(() => {
    popup.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 300);
  }, 3000);
}

// Adiciona listener ao formulário quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  const formGenio = document.getElementById('form-genio-desejos');
  if (formGenio) {
    formGenio.addEventListener('submit', enviarMensagemGenioDesejos);
  }
  
  // Fecha modal ao clicar fora dele
  const modalGenio = document.getElementById('modal-genio-desejos');
  if (modalGenio) {
    modalGenio.addEventListener('click', function(event) {
      if (event.target === modalGenio) {
        fecharModalGenioDesejos();
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

// ============================================
// O PROFETA DAS METAS
// ============================================

// Estrutura de dados das metas
let metasProfeta = [];
let metaEditandoId = null;
let midiaPreviewProfeta = null;
let tipoMidiaPreview = null; // 'imagem', 'video', 'url'

// Metas iniciais pré-carregadas
const metasIniciais = [
  {
    id: 'meta-1',
    titulo: 'Estar morando juntos na casa alugada do Vinicius',
    dataLimite: '2026-12',
    descricao: 'Nosso primeiro lar juntos, construindo nossa base.',
    midia: null,
    tipoMidia: null,
    progresso: null,
    concluida: false,
    dataCriacao: Date.now()
  },
  {
    id: 'meta-2',
    titulo: 'Morar juntos no apartamento da Aline',
    dataLimite: '2028-01',
    descricao: 'Nosso espaço definitivo, nosso lar.',
    midia: null,
    tipoMidia: null,
    progresso: null,
    concluida: false,
    dataCriacao: Date.now()
  },
  {
    id: 'meta-3',
    titulo: 'Ter filhos de maneira planejada',
    dataLimite: '2030-01',
    descricao: 'Expandir nossa família com amor e planejamento.',
    midia: null,
    tipoMidia: null,
    progresso: null,
    concluida: false,
    dataCriacao: Date.now()
  },
  {
    id: 'meta-4',
    titulo: 'Poder se aposentar, mas focar na manutenção das empresas',
    dataLimite: '2035-01',
    descricao: 'Construir um império juntos, mantendo e expandindo nossos negócios.',
    midia: null,
    tipoMidia: null,
    progresso: null,
    concluida: false,
    dataCriacao: Date.now()
  },
  {
    id: 'meta-5',
    titulo: 'Estar aposentados e viajando o mundo',
    dataLimite: '2040-01',
    descricao: 'Viver do que construímos juntos, explorando o mundo.',
    midia: null,
    tipoMidia: null,
    progresso: null,
    concluida: false,
    dataCriacao: Date.now()
  }
];

// Carrega metas do localStorage ou usa as iniciais
function carregarMetasProfeta() {
  const metasSalvas = localStorage.getItem('metasProfeta');
  if (metasSalvas) {
    try {
      metasProfeta = JSON.parse(metasSalvas);
      
      // Migração: converte "imagem" para "midia" e "tipoMidia" se necessário
      metasProfeta.forEach(meta => {
        if (meta.imagem && !meta.midia) {
          meta.midia = meta.imagem;
          meta.tipoMidia = 'imagem';
          delete meta.imagem;
        }
        // Garante que progresso seja null se não existir
        if (meta.progresso === undefined) {
          meta.progresso = null;
        }
      });
      
      // Se não tem nenhuma meta, carrega as iniciais
      if (metasProfeta.length === 0) {
        metasProfeta = [...metasIniciais];
        salvarMetasProfeta();
      } else {
        // Salva após migração
        salvarMetasProfeta();
      }
    } catch (e) {
      console.log('Erro ao carregar metas do Profeta');
      metasProfeta = [...metasIniciais];
      salvarMetasProfeta();
    }
  } else {
    metasProfeta = [...metasIniciais];
    salvarMetasProfeta();
  }
}

// Salva metas no localStorage
function salvarMetasProfeta() {
  localStorage.setItem('metasProfeta', JSON.stringify(metasProfeta));
}

// Mostra tela fullscreen do Profeta
function mostrarProfetaFullscreen() {
  const profetaFullscreen = document.getElementById('profeta-fullscreen');
  if (!profetaFullscreen) return;
  
  // Carrega metas
  carregarMetasProfeta();
  
  // Marca como usado automaticamente
  presentesEstado.metas = true;
  raspadinhaEstado.metas = true;
  salvarEstado();
  
  // Atualiza visual do presente
  const giftBox = document.getElementById('metas');
  if (giftBox) {
    giftBox.classList.add('aberto', 'usado');
    const status = giftBox.querySelector('.gift-status');
    if (status) {
      status.textContent = '🎁 Presente usado';
    }
  }
  
  // Mostra tela
  profetaFullscreen.classList.add('ativo');
  
  // Mostra animação inicial
  const animacao = document.getElementById('profeta-animacao-inicial');
  const interface = document.getElementById('profeta-interface');
  
  if (animacao && interface) {
    // Função para mostrar interface e esconder animação
    function mostrarInterface() {
      // Esconde animação completamente
      animacao.style.display = 'none';
      animacao.style.visibility = 'hidden';
      animacao.style.opacity = '0';
      
      // Mostra interface
      interface.style.display = 'block';
      interface.style.visibility = 'visible';
      interface.style.opacity = '1';
      
      // Renderiza metas
      renderizarMetasProfeta();
      
      // Scroll automático para área das metas (mobile e desktop)
      setTimeout(() => {
        const isMobile = window.innerWidth <= 768;
        const profetaFullscreen = document.getElementById('profeta-fullscreen');
        
        if (isMobile && profetaFullscreen) {
          // Mobile: scroll para o topo do container
          profetaFullscreen.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          
          // Depois scrolla para o conteúdo
          setTimeout(() => {
            const btnAdicionar = document.querySelector('.profeta-btn-adicionar');
            if (btnAdicionar) {
              btnAdicionar.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
              });
            }
          }, 200);
        } else {
          // Desktop: scroll para a seção de metas
          const secaoMetas = document.querySelector('.profeta-secao');
          if (secaoMetas) {
            secaoMetas.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 300);
    }
    
    // Mostra animação inicial
    animacao.style.display = 'flex';
    animacao.style.opacity = '1';
    interface.style.display = 'none';
    interface.style.opacity = '0';
    
    // Permite clicar na animação para pular
    animacao.style.cursor = 'pointer';
    animacao.onclick = function() {
      mostrarInterface();
    };
    
    // Após 0.45 segundos, mostra interface automaticamente
    setTimeout(function() {
      mostrarInterface();
    }, 450);
  } else {
    // Se não encontrou os elementos, mostra interface diretamente
    if (interface) {
      if (animacao) {
        animacao.style.display = 'none';
        animacao.style.visibility = 'hidden';
      }
      interface.style.display = 'block';
      interface.style.visibility = 'visible';
      interface.style.opacity = '1';
      renderizarMetasProfeta();
    } else if (animacao) {
      // Se só tem animação, esconde ela e mostra interface depois
      setTimeout(function() {
        animacao.style.display = 'none';
        animacao.style.visibility = 'hidden';
        const interfaceEl = document.getElementById('profeta-interface');
        if (interfaceEl) {
          interfaceEl.style.display = 'block';
          interfaceEl.style.visibility = 'visible';
          interfaceEl.style.opacity = '1';
          renderizarMetasProfeta();
        }
      }, 450);
    } else {
      // Último recurso: tenta renderizar mesmo assim
      renderizarMetasProfeta();
    }
  }
}

// Fecha tela fullscreen do Profeta
function fecharProfetaFullscreen() {
  const profetaFullscreen = document.getElementById('profeta-fullscreen');
  if (!profetaFullscreen) return;
  
  profetaFullscreen.classList.remove('ativo');
}

// Renderiza todas as metas
function renderizarMetasProfeta() {
  const metasAtivas = document.getElementById('profeta-metas-ativas');
  const metasConcluidas = document.getElementById('profeta-metas-concluidas');
  const secaoConcluidas = document.getElementById('profeta-secao-concluidas');
  
  if (!metasAtivas || !metasConcluidas) return;
  
  // Separa metas concluídas e não concluídas
  const ativas = metasProfeta.filter(m => !m.concluida);
  const concluidas = metasProfeta.filter(m => m.concluida);
  
  // Ordena ativas por data (mais próxima primeiro)
  ativas.sort((a, b) => {
    const dataA = new Date(a.dataLimite + '-01');
    const dataB = new Date(b.dataLimite + '-01');
    return dataA - dataB;
  });
  
  // Ordena concluídas por data (mais recente primeiro)
  concluidas.sort((a, b) => {
    const dataA = new Date(a.dataLimite + '-01');
    const dataB = new Date(b.dataLimite + '-01');
    return dataB - dataA;
  });
  
  // Renderiza metas ativas
  metasAtivas.innerHTML = '';
  ativas.forEach(meta => {
    metasAtivas.innerHTML += criarHTMLMeta(meta);
  });
  
  // Renderiza metas concluídas
  metasConcluidas.innerHTML = '';
  concluidas.forEach(meta => {
    metasConcluidas.innerHTML += criarHTMLMeta(meta);
  });
  
  // Mostra/oculta seção de concluídas
  if (concluidas.length > 0) {
    secaoConcluidas.style.display = 'block';
  } else {
    secaoConcluidas.style.display = 'none';
  }
}

// Cria HTML de uma meta
function criarHTMLMeta(meta) {
  const dataFormatada = formatarDataMeta(meta.dataLimite);
  const concluidaClass = meta.concluida ? 'profeta-meta-concluida' : '';
  
  // Mídia (imagem ou vídeo)
  let midiaHTML = '';
  if (meta.midia) {
    if (meta.tipoMidia === 'video' || (meta.tipoMidia === 'url' && meta.midia.match(/\.(mp4|webm|ogg)$/i))) {
      midiaHTML = `
        <div class="profeta-meta-midia-container">
          <video src="${meta.midia}" controls class="profeta-meta-video"></video>
        </div>
      `;
    } else {
      midiaHTML = `
        <div class="profeta-meta-midia-container">
          <img src="${meta.midia}" alt="${meta.titulo}" class="profeta-meta-imagem">
        </div>
      `;
    }
  }
  
  // Barra de progresso
  const progressoHTML = meta.progresso !== null && meta.progresso !== undefined ? `
    <div class="profeta-meta-progresso-container">
      <div class="profeta-meta-progresso-label">Progresso: ${meta.progresso}%</div>
      <div class="profeta-meta-progresso-bar">
        <div class="profeta-meta-progresso-fill" style="width: ${meta.progresso}%"></div>
      </div>
    </div>
  ` : '';
  
  return `
    <div class="profeta-meta ${concluidaClass}" data-meta-id="${meta.id}">
      <div class="profeta-meta-checkbox-container">
        <input type="checkbox" 
               class="profeta-meta-checkbox" 
               ${meta.concluida ? 'checked' : ''} 
               onchange="toggleMetaConcluida('${meta.id}')">
      </div>
      <div class="profeta-meta-conteudo">
        ${midiaHTML}
        <div class="profeta-meta-header">
          <div class="profeta-meta-data">📅 ${dataFormatada}</div>
          <button class="profeta-meta-btn-editar" onclick="mostrarModalAdicionarMeta('${meta.id}')" title="Editar meta">
            ✏️
          </button>
        </div>
        <h3 class="profeta-meta-titulo">${meta.titulo}</h3>
        ${meta.descricao ? `<p class="profeta-meta-descricao">${meta.descricao}</p>` : ''}
        ${progressoHTML}
      </div>
    </div>
  `;
}

// Formata data da meta
function formatarDataMeta(dataLimite) {
  if (!dataLimite) return 'Sem data';
  const [ano, mes] = dataLimite.split('-');
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return `${meses[parseInt(mes) - 1]}/${ano}`;
}

// Toggle meta concluída
function toggleMetaConcluida(metaId) {
  const meta = metasProfeta.find(m => m.id === metaId);
  if (!meta) return;
  
  meta.concluida = !meta.concluida;
  salvarMetasProfeta();
  
  // Animação e reordenação
  setTimeout(() => {
    renderizarMetasProfeta();
  }, 300);
}

// Mostra modal para adicionar/editar meta
function mostrarModalAdicionarMeta(metaId = null) {
  const modal = document.getElementById('profeta-modal-meta');
  const form = document.getElementById('profeta-form-meta');
  const tituloModal = document.getElementById('profeta-modal-titulo-texto');
  
  if (!modal || !form) return;
  
  metaEditandoId = metaId;
  midiaPreviewProfeta = null;
  tipoMidiaPreview = null;
  
  if (metaId) {
    // Editando
    const meta = metasProfeta.find(m => m.id === metaId);
    if (meta) {
      document.getElementById('profeta-input-titulo').value = meta.titulo;
      document.getElementById('profeta-input-data').value = meta.dataLimite;
      document.getElementById('profeta-input-descricao').value = meta.descricao || '';
      document.getElementById('profeta-input-url').value = '';
      
      // Carrega mídia se existir
      if (meta.midia) {
        midiaPreviewProfeta = meta.midia;
        tipoMidiaPreview = meta.tipoMidia || 'imagem';
        mostrarPreviewMidia(meta.midia, tipoMidiaPreview);
      } else {
        document.getElementById('profeta-preview-midia').style.display = 'none';
      }
      
      // Carrega progresso se existir
      if (meta.progresso !== null && meta.progresso !== undefined) {
        document.getElementById('profeta-check-progresso').checked = true;
        document.getElementById('profeta-progresso-container').style.display = 'block';
        document.getElementById('profeta-input-progresso').value = meta.progresso;
        document.getElementById('profeta-progresso-valor-texto').textContent = meta.progresso + '%';
      } else {
        document.getElementById('profeta-check-progresso').checked = false;
        document.getElementById('profeta-progresso-container').style.display = 'none';
      }
      
      tituloModal.textContent = 'Editar Meta';
    }
  } else {
    // Nova meta
    form.reset();
    document.getElementById('profeta-preview-midia').style.display = 'none';
    document.getElementById('profeta-check-progresso').checked = false;
    document.getElementById('profeta-progresso-container').style.display = 'none';
    document.getElementById('profeta-progresso-valor-texto').textContent = '0%';
    tituloModal.textContent = 'Adicionar Nova Meta';
  }
  
  modal.classList.add('ativo');
}

// Fecha modal
function fecharModalAdicionarMeta() {
  const modal = document.getElementById('profeta-modal-meta');
  if (!modal) return;
  
  modal.classList.remove('ativo');
  metaEditandoId = null;
  midiaPreviewProfeta = null;
  tipoMidiaPreview = null;
  document.getElementById('profeta-form-meta').reset();
  document.getElementById('profeta-preview-midia').style.display = 'none';
  document.getElementById('profeta-check-progresso').checked = false;
  document.getElementById('profeta-progresso-container').style.display = 'none';
}

// Salva meta (adiciona ou edita)
function salvarMetaProfeta(event) {
  if (event) event.preventDefault();
  
  const titulo = document.getElementById('profeta-input-titulo').value.trim();
  const dataLimite = document.getElementById('profeta-input-data').value;
  const descricao = document.getElementById('profeta-input-descricao').value.trim();
  const temProgresso = document.getElementById('profeta-check-progresso').checked;
  const progresso = temProgresso ? parseInt(document.getElementById('profeta-input-progresso').value) : null;
  
  if (!titulo || !dataLimite) {
    alert('Por favor, preencha título e data limite.');
    return;
  }
  
  if (metaEditandoId) {
    // Edita meta existente
    const meta = metasProfeta.find(m => m.id === metaEditandoId);
    if (meta) {
      meta.titulo = titulo;
      meta.dataLimite = dataLimite;
      meta.descricao = descricao;
      meta.midia = midiaPreviewProfeta || null;
      meta.tipoMidia = tipoMidiaPreview || null;
      meta.progresso = progresso;
    }
  } else {
    // Nova meta
    const novaMeta = {
      id: 'meta-' + Date.now(),
      titulo: titulo,
      dataLimite: dataLimite,
      descricao: descricao,
      midia: midiaPreviewProfeta || null,
      tipoMidia: tipoMidiaPreview || null,
      progresso: progresso,
      concluida: false,
      dataCriacao: Date.now()
    };
    metasProfeta.push(novaMeta);
  }
  
  salvarMetasProfeta();
  renderizarMetasProfeta();
  fecharModalAdicionarMeta();
}

// Preview de mídia (imagem/vídeo)
document.addEventListener('DOMContentLoaded', function() {
  const inputImagem = document.getElementById('profeta-input-imagem');
  if (inputImagem) {
    inputImagem.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          midiaPreviewProfeta = e.target.result;
          // Determina se é vídeo ou imagem
          if (file.type.startsWith('video/')) {
            tipoMidiaPreview = 'video';
          } else {
            tipoMidiaPreview = 'imagem';
          }
          mostrarPreviewMidia(e.target.result, tipoMidiaPreview);
          // Limpa URL se tiver arquivo
          document.getElementById('profeta-input-url').value = '';
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  const inputURL = document.getElementById('profeta-input-url');
  if (inputURL) {
    inputURL.addEventListener('blur', function(e) {
      const url = e.target.value.trim();
      if (url) {
        midiaPreviewProfeta = url;
        // Tenta determinar se é vídeo pela extensão
        if (url.match(/\.(mp4|webm|ogg|mov)$/i)) {
          tipoMidiaPreview = 'video';
        } else {
          tipoMidiaPreview = 'url';
        }
        mostrarPreviewMidia(url, tipoMidiaPreview);
        // Limpa arquivo se tiver URL
        document.getElementById('profeta-input-imagem').value = '';
      }
    });
  }
  
  const formMeta = document.getElementById('profeta-form-meta');
  if (formMeta) {
    formMeta.addEventListener('submit', salvarMetaProfeta);
  }
});

// Mostra preview da mídia (imagem ou vídeo)
function mostrarPreviewMidia(src, tipo) {
  const preview = document.getElementById('profeta-preview-midia');
  const conteudo = document.getElementById('profeta-preview-conteudo');
  if (!preview || !conteudo) return;
  
  conteudo.innerHTML = '';
  
  if (tipo === 'video' || src.match(/\.(mp4|webm|ogg|mov)$/i)) {
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.style.cssText = 'width: 100%; max-height: 300px; border-radius: 12px;';
    conteudo.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'width: 100%; max-height: 300px; object-fit: contain; border-radius: 12px;';
    img.onerror = function() {
      conteudo.innerHTML = '<p style="color: rgba(255,255,255,0.7); padding: 20px; text-align: center;">Não foi possível carregar a imagem/vídeo. Verifique a URL.</p>';
    };
    conteudo.appendChild(img);
  }
  
  preview.style.display = 'block';
}

// Remove preview da mídia
function removerMidiaPreview() {
  const preview = document.getElementById('profeta-preview-midia');
  const inputImagem = document.getElementById('profeta-input-imagem');
  const inputURL = document.getElementById('profeta-input-url');
  
  if (preview) {
    preview.style.display = 'none';
  }
  if (inputImagem) {
    inputImagem.value = '';
  }
  if (inputURL) {
    inputURL.value = '';
  }
  midiaPreviewProfeta = null;
  tipoMidiaPreview = null;
}

// Toggle barra de progresso
function toggleBarraProgresso() {
  const checkbox = document.getElementById('profeta-check-progresso');
  const container = document.getElementById('profeta-progresso-container');
  
  if (checkbox && container) {
    if (checkbox.checked) {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
  }
}

// Atualiza valor do progresso
function atualizarValorProgresso(valor) {
  const texto = document.getElementById('profeta-progresso-valor-texto');
  if (texto) {
    texto.textContent = valor + '%';
  }
}
