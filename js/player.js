class Player {
  constructor(gameScreen, left, top, width, height, image) {
    this.gameScreen = gameScreen;
    
    // Position and Sizing
    this.left = left;
    this.right = this.left + this.width;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;

    // Visuals
    this.element = document.createElement("img");
    this.element.src = image;
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.right = `${this.right}px`;
    this.gameScreen.appendChild(this.element);

    // Audio Files
    this.damageSound = new Audio("/audio/takedamage.wav");
  }

  // Movement Logic
  move() {
    
      this.left += this.directionX;
      this.top += this.directionY;

      
    if (this.left < 10) {
      this.left = 10;
    }

    if (this.left + this.width > 690) {
      this.left = 690 - this.width;
      this.right = this.width - this.left;
    }

    if (this.top < 45) {
      this.top = 45;
    }

    if (this.top > 660) {
      this.top = 660;
    }
    //  if (this.top + this.height > 690) {
    //    this.bottom = this.height - this.top;
    //  }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.right = `${this.right}px`;
  }

  // Collision Logic
  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      this.playDamageSound();
      return true;
    } else {
      return false;
    }
  }

  playDamageSound() {
    this.damageSound.load();
    this.damageSound.volume = 0.25;
    this.damageSound.play();
  }
}
