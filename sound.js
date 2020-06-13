function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

export let gameTheme = new sound("./audio/bensound-summer.mp3");
export let gameOverSound = new sound("./audio/wrong.mp3");
export let eatSound = new sound("./audio/green.mp3");
