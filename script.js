const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Dein Spieler
const player = { x: 50, y: 50, size: 30, speed: 5, color: '#00ff00' };

// Deine Stationen (Apps & KI)
const stations = [
    { id: 'github', name: 'GitHub Modul', x: 300, y: 200, size: 50, color: '#ff00ff', url: 'https://github.com' },
    { id: 'ai', name: 'KI Agent', x: 600, y: 400, size: 50, color: '#00f2ff', isAI: true }
];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Stationen zeichnen
    stations.forEach(s => {
        ctx.fillStyle = s.color;
        ctx.fillRect(s.x, s.y, s.size, s.size);
        ctx.fillStyle = "white";
        ctx.fillText(s.name, s.x, s.y - 10);
    });

    // Spieler zeichnen
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);

    checkCollision();
    requestAnimationFrame(draw);
}

// Steuerung
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') player.y -= player.speed;
    if (e.key === 'ArrowDown') player.y += player.speed;
    if (e.key === 'ArrowLeft') player.x -= player.speed;
    if (e.key === 'ArrowRight') player.x += player.speed;
});

function checkCollision() {
    stations.forEach(s => {
        if (player.x < s.x + s.size && player.x + player.size > s.x &&
            player.y < s.y + s.size && player.y + player.size > s.y) {
            
            if (s.isAI) {
                showDialog("Drücke Enter, um mit der KI zu sprechen...");
            } else {
                showDialog(`Drücke Enter, um ${s.name} zu öffnen...`);
                window.onkeydown = (e) => { if(e.key === 'Enter') openApp(s.url); };
            }
        }
    });
}

function openApp(url) {
    document.getElementById('app-window').classList.remove('hidden');
    document.getElementById('app-frame').src = url;
}

function showDialog(text) {
    const box = document.getElementById('dialog-box');
    box.classList.remove('hidden');
    document.getElementById('dialog-text').innerText = text;
}

draw();
