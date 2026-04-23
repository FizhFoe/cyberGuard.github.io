const scenarios = [
    {
        text: "Um amigo no Discord enviou-te um ficheiro dizendo que é um cheat para teres skins grátis no Fortnite.",
        solutions: ["antivirus", "delete"],
        info: "Boa! Nunca confies em ficheiros diretos! Ou apagas por segurança ou fazes scan com o antivirus"
    },
    {
        text: "Estás no centro comercial e queres entrar na tua conta da PSN usando o Wi-Fi público da malta.",
        solutions: ["vpn"],
        info: "Oxi! Nunca te ligues a redes públicas sem proteção! Usar VPN é a melhor solução para proteger os teus dados."
    },
    {
        text: "Disseram o teu IP numa stream e agora alguém está a tentar bloquear a tua ligação para te tirar do jogo!",
        solutions: ["firewall", "antivirus"],
        info: "Acertaste! A firewall serve como uma barreira para proteger a tua rede. O antivirus atua após algum tipo de intrusão ou suspeita."
    },
    {
        text: "Vais enviar uma foto do teu Cartão de Cidadão para o suporte e não queres que nenhum hacker a consiga ler.",
        solutions: ["encryption"],
        info: "Parabens, queres um truque? algum tipo de código que só a outra pessoa saiba, para abrir documentos importantes e te proteger.",
    },
    {
        text: "Fizeste download de um jogo pirateado e agora o teu telemóvel está bué lento e com apps estranhas.",
        solutions: ["antivirus"],
        info: "Tu sabes! Desconfia sempre de apps e sites que te apresentem mensagens duvidosas e apelativas. E verifica sempre comentários e avaliações do que vais instalar."
    },
    {
        text: "Queres ver uma série que só dá na Netflix dos EUA sem que saibam que estás em Portugal.",
        solutions: ["vpn"],
        info: "Shhhh! Não contes a ninguem. A VPN muda a tua localização para qualquer parte do mundo, aumentando não só a tua segurança, mas também permite ver conteúdos não acessíveis em Portugal."
    },
    {
        text: "Um bot está a tentar forçar a entrada no teu router, testando mil passwords por segundo.",
        solutions: ["firewall", "antivirus"],
        info: "Lixou agora."
    },
    {
        text: "Queres que as tuas mensagens diretas (DMs) fiquem totalmente privadas e ilegíveis para intrusos.",
        solutions: ["encryption"],
        info: "Damnnn! Encriptação serve para baralhar e dificultar o acesso indevido a qualquer tipo de dados. Por isso, já sabes, usa sempre aplicações que oferecem proteção end-to-end ou encriptada."
    },
    {
        text: "Recebeste uma mensagem a dizer que a tua encomenda da 'Vinted' está retida e pede para clicares num link estranho.",
        solutions: ["antivirus", "delete"],
        info: "Links em mensagens são usados para roubar passwords. O melhor é nunca clicar e apagar logo!"
    }
];


let hp = 100;
let score = 0;
let active = null;
let canPlay = false;
let lastScenario = null;
let maxScore = 200;

function initGame() {
    hp = 100; score = 0;
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('action-buttons').style.display = 'grid';
    document.getElementById('stats-bar').style.display = 'flex';
    document.getElementById('msg').innerText = "";
    document.getElementById('ready-title').style.display = 'none';
    document.getElementById('how-to').style.display = 'none';
    updateUI();
    next();
}

function next() {
    if (hp <= 0) return end();

    canPlay = true;

    active = scenarios[Math.floor(Math.random() * scenarios.length)];

    active.used =[];

    // Escolhe um cenário aleatório
    document.getElementById('scenario-text').innerText = active.text;
    if (active.solutions.length > 1){
        document.getElementById('msg').innerText = "Atenção: cenário com mais proteções!!";
    } else {
        document.getElementById('msg').innerText = "Escolhe a melhor defesa...";
    }
    document.getElementById('msg').style.color = "#aaa";
    document.getElementById('msg').style.marginTop = '80px';
}

function play(choice) {
    if (!active || !canPlay) return;
    canPlay = false; // Bloqueia cliques repetidos durante o feedback

    if (!active.used) active.used = [];

    if (active.used.includes(choice)) return;

    active.used.push(choice);

    if (active.solutions.includes(choice)) {
        score += 200;
        showMsg(active.info + " +25 pontos", varName('--neon-green'));
    } else {
        hp -= 25;
        showMsg("ERRO! Essa escolha deixou o sistema vulnerável. 💀", varName('--neon-red'));
    }

    updateUI();

    if (score >= maxScore) 
        return end(true);

    // se já encontrou todas as respostas certas OU errou
    const allCorrectFound =
        active.solutions.every(sol => active.used.includes(sol));

    if (allCorrectFound || hp <= 0) {
        canPlay = false;
    }
        
        // AGORA AVANÇA: Espera 3 segundos para o jogador ler o feedback antes do próximo
        setTimeout(() => {
            if (hp > 0) next();
            else end();
        }, 4000);
}

function showMsg(txt, color) {
    const m = document.getElementById('msg');
    m.innerText = txt;
    m.style.color = color;
}

function updateUI() {
    document.getElementById('hp-fill').style.width = hp + "%";
    document.getElementById('score').innerText = "PONTOS: " + score;
}

function end(win = false) {
    if (win){
        document.getElementById('scenario-text').innerText = "Missão Completa! SISTEMA SEGURO!";
        document.getElementById('msg').innerText = "Parabéns! Antigiste " + score + " pontos."
        // adicionar butoes apos ganhar para os outros jogos
        document.getElementById('games-links').style.display = 'block';
    } else {
        document.getElementById('scenario-text').innerText = "SISTEMA COMPROMETIDO! ";
        document.getElementById('msg').innerText = "A tua pontuação final: " + score;
        document.getElementById('games-links').style.display = 'none';
    }
    document.getElementById('start-btn').style.display = 'block';
    document.getElementById('start-btn').innerText = "RECOMEÇAR TREINO";
    document.getElementById('action-buttons').style.display = 'none';
    document.getElementById('score').style.display = 'none';
    active = null;
    canPlay = false;
}

// Função auxiliar para ler cores do CSS
function varName(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
}