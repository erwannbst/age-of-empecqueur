module.exports = class Building {
  constructor(running, duration, defaultDuration, timer){    
    this.running = false,
    this.duration = 0,
    this.defaultDuration = 0
    this.timer = ""
  }
    
  start() {
    //only start if duration is equal to 0
    if (!this.running && startButton.innerHTML === "Start Timer") {
      startButton.innerHTML = "Stop Timer"
      this.running = true;
      this.timer = setInterval(() => {
        this.duration += 1;
        output.textContent = this.duration;
      }, 1000);
    } else if (startButton.innerHTML === "Stop Timer") {
      this.stop();
    }
  };

  stop() {
    startButton.innerHTML = "Start Timer"
    if (this.running) {
      this.running = false;
      clearInterval(this.timer);
    } else {
      throw new Error("stop watch has not started");
    }
  };

  reset() {
    this.duration = this.defaultDuration;
    this.stop();
    output.textContent = this.duration;
  };

}