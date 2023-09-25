let canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Rest of the code remains the same

let ctx = canvas.getContext("2d");

let planeImg = new Image();
planeImg.src = 'plane.png'; // replace with your image path

let missileImg = new Image();
missileImg.src = 'missile.png'; // replace with your image path

let explosionImg = new Image();
explosionImg.src = 'explosion.png'; // replace with your image path

let missileSound = new Audio('missileSound.mp3');
let explosionSound = new Audio('explosionSound.mp3');
missileSound.loop = true;


let gameState = "running";  // Possible values: "running", "ended"
let explosionDuration = 1000; // Explosion will last for 1000 milliseconds (1 second)
let explosionStart = null;
let angle; // Store the rotation angle of the missile

let plane = {
    x: 0,
    y: 0,
    width: 92,
    height: 50
};

let missile = {
    x: 0,
    y: 0,
    width: 10,
    height: 27,
    speed: 3,
    active: false
};

let explosion = {
    active: false,
    x: 0,
    y: 0,
    width: 67,
    height: 60
};


canvas.addEventListener("mousemove", (event) => {
    plane.x = event.clientX - plane.width / 2;
    plane.y = event.clientY - plane.height / 2;
});

canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    missile.active = true;
    missile.x = canvas.width / 2;
    missile.y = canvas.height;
    
    missileSound.play();  // Play the missile sound when activated
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


function moveMissile() {
    if (missile.active) {
        // Adjusting the target coordinates to the center of the plane image
        let targetX = plane.x + plane.width / 2;
        let targetY = plane.y + plane.height / 2;

        let dx = targetX - missile.x;
        let dy = targetY - missile.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        missile.x += (dx / dist) * missile.speed;
        missile.y += (dy / dist) * missile.speed;

        // Calculate the angle
        angle = Math.atan2(dy, dx) + Math.PI / 2;
    }

    if (missile.active && checkCollision(missile, plane)) {
        explosion.active = true;
        missile.active = false;
        
        missileSound.pause();  // Stop the missile sound
        missileSound.currentTime = 0; // Rewind the sound for the next play
        explosionSound.play();  // Play the explosion sound
        
        explosion.x = plane.x + (plane.width - explosion.width) / 2;  // Center explosion on plane
        explosion.y = plane.y + (plane.height - explosion.height) / 2;
    }
}

function checkCollision(objA, objB) {
    return objA.x < objB.x + objB.width &&
           objA.x + objA.width > objB.x &&
           objA.y < objB.y + objB.height &&
           objA.y + objA.height > objB.y;
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "running") {
        
        
        if (missile.active) {
            ctx.save(); // Save the current context state
            
            // Translate the context to the missile's position
            ctx.translate(missile.x + missile.width / 2, missile.y + missile.height / 2);
            
            // Rotate the context
            ctx.rotate(angle);
            
            // Draw the missile, considering the translated context
            ctx.drawImage(missileImg, -missile.width / 2, -missile.height / 2, missile.width, missile.height);
            
            ctx.restore(); // Restore the context state to its original state
        }
        
        if (explosion.active) {
            ctx.drawImage(explosionImg, explosion.x, explosion.y, explosion.width, explosion.height);
            missileSound.pause(); // Stop the explosion sound
            missileSound.currentTime = 0; // Rewind the sound for the next play
            
            if (!explosionStart) {
                explosionStart = Date.now();
            } else if (Date.now() - explosionStart >= explosionDuration) {
                gameState = "ended";
                explosionStart = null;

                
            }
        }
        else {
            ctx.drawImage(planeImg, plane.x, plane.y, plane.width, plane.height);
        }
    } else if (gameState === "ended") {
        // Display "Game Over" text
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    }

    moveMissile();
    requestAnimationFrame(draw);
}



planeImg.onload = function() {
    requestAnimationFrame(draw);
};
