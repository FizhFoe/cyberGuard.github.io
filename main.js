const scenarios = [
    {
        text: "Um amigo no Discord enviou-te um ficheiro dizendo que é um cheat para teres skins grátis no Fortnite.",
        solutions: ["antivirus", "delete"],
        info: "Nunca abras ficheiros suspeitos. Faz scan ou apaga."
    },
    {
        text: "Estás no centro comercial e queres entrar na tua conta da PSN usando o Wi-Fi público da malta.",
        solutions: ["vpn"],
        info: "Redes públicas são perigosas. Usa VPN para proteger dados."
    },
    {
        text: "Disseram o teu IP numa stream e agora alguém está a tentar bloquear a tua ligação para te tirar do jogo!",
        solutions: ["firewall", "antivirus"],
        info: "Firewall bloqueia ataques; antivirus deteta ameaças."
    },
    {
        text: "Vais enviar uma foto do teu Cartão de Cidadão para o suporte e não queres que nenhum hacker a consiga ler.",
        solutions: ["encryption"],
        info: "Encriptação protege dados com acesso seguro."
    },
    {
        text: "Fizeste download de um jogo pirateado e agora o teu telemóvel está bué lento e com apps estranhas.",
        solutions: ["antivirus"],
        info: "Downloads ilegais podem conter malware. Verifica sempre."
    },
    {
        text: "Queres ver uma série que só dá na Netflix dos EUA sem que saibam que estás em Portugal.",
        solutions: ["vpn"],
        info: "VPN oculta localização e melhora privacidade online."
    },
    {
        text: "Um bot está a tentar forçar a entrada no teu router, testando mil passwords por segundo.",
        solutions: ["firewall", "antivirus"],
        info: "Ataques de força bruta exigem proteção ativa."
    },
    {
        text: "Queres que as tuas mensagens diretas (DMs) fiquem totalmente privadas e ilegíveis para intrusos.",
        solutions: ["encryption"],
        info: "Encriptação garante mensagens privadas e seguras."
    },
    {
        text: "Recebeste uma mensagem a dizer que a tua encomenda da 'Vinted' está retida e pede para clicares num link estranho.",
        solutions: ["antivirus", "delete"],
        info: "Phishing usa links falsos. Não cliques e apaga."
    },
    {
        text: "Recebeste um email a dizer que a tua conta do Instagram vai ser bloqueada e pedem para fazer login num link.",
        solutions: ["delete", "antivirus"],
        info: "Isto é phishing. Nunca faças login de links suspeitos."
    },
    {
        text: "Um site pede-te para instalares um programa para 'acelerar a tua internet' gratuitamente.",
        solutions: ["antivirus", "delete"],
        info: "Softwares milagrosos são quase sempre malware."
    },
    {
        text: "Estás a jogar online e alguém pede-te a tua password para 'dar skins grátis'.",
        solutions: ["delete"],
        info: "Nunca partilhes passwords. Nem com amigos."
    },
    {
        text: "Recebeste uma pen USB de alguém desconhecido e ligaste ao teu PC por curiosidade.",
        solutions: ["antivirus"],
        info: "Dispositivos desconhecidos podem conter vírus perigosos."
    }
];

let hp = 100;
let active = null;
let canPlay = false;
let lastScenario = null;
let time = 60;
let timer;

function initGame() {
    hp = 100;
    time = 60;
    // score = 0;
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('action-buttons').style.display = 'grid';
    document.getElementById('stats-bar').style.display = 'flex';
    document.getElementById('msg').innerText = "";
    // document.getElementById('ready-title').style.display = 'none';
    document.getElementById('how-to').style.display = 'none';
    updateUI();
    startTimer();
    next();
}

function next() {
    if (hp <= 0) return end();

    canPlay = true;

    active = scenarios[Math.floor(Math.random() * scenarios.length)];

    active.used = [];

    // Escolhe um cenário aleatório
    document.getElementById('scenario-text').innerText = active.text;
    if (active.solutions.length > 1) {
        document.getElementById('msg').innerText = "Atenção: cenário tem duas proteções!!";
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
        // hp += 25;
        hp = Math.min(100, hp + 25);
        // conso.log("HP: ", hp);
        showMsg(active.info, varName('--neon-green'));
    } else {
        hp -= 25;
        // conso.log("HP: ", hp);
        showMsg("ERRO! Essa escolha deixou o sistema vulnerável. 💀", varName('--neon-red'));
    }

    updateUI();

    if (hp <= 0)
        return end(false);


    // AGORA AVANÇA: Espera 3 segundos para o jogador ler o feedback antes do próximo
    setTimeout(() => {
        next();
    }, 2500);
}

function showMsg(txt, color) {
    const m = document.getElementById('msg');
    m.innerText = txt;
    m.style.color = color;
}

function updateUI() {
    document.getElementById('hp-fill').style.width = hp + "%";
    // document.getElementById('score').innerText = "PONTOS: " + score;
    document.getElementById('score').innerText = "Tempo: " + time + "s"
}

function end(win = false) {
    clearInterval(timer);
    let msg = "";
    if (win) {
        if (hp >= 75) {
            msg = '<i class="fa-solid fa-circle" style="color: green;"></i> SISTEMA SEGURO! Excelente defesa!';
        }
        else if (hp >= 50) {
            msg = "<i class='fa-solid fa-circle' style='color: yellow;'></i> SISTEMA MODERADAMENTE SEGURO. Ainda resistente.";
        }
        else {
            msg = "<i class='fa-solid fa-circle' style='color: red''></i> SISTEMA GANHOU O JOGO MAS FICOU FRACO!";
        }
    } else {
        if (hp <= 0) {
            msg = "🔴 SISTEMA COMPROMETIDO! Hackers ganharam controlo.";
        }
        else if (hp < 50) {
            msg = "🟠 SISTEMA CAIU QUASE POR COMPLETO!";
        }
        else {
            msg = "🟡 FALHA CRÍTICA DETETADA!";
        }
    }

    document.getElementById('games-links').style.display = 'block';
    document.getElementById('scenario-text').innerText = win ? "Missão Completa!" : "Game Over!!";
    document.getElementById('msg').innerHTML = msg;

    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('action-buttons').style.display = 'none';
    document.getElementById('score').style.display = 'none';

    active = null;
    canPlay = false;
}

// Função auxiliar para ler cores do CSS
function varName(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
}

function startTimer() {
    timer = setInterval(() => {
        time--;

        document.getElementById('score').innerText = "Tempo: " + time + "s";

        if (time <= 0) {
            clearInterval(timer);
            return end(true);
        }
    }, 1000);
}
