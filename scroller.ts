export class Scroller {
    private interval: number = 100;
    private step: number = 80;
    private zone: number = 350;
    private enabled: boolean = false;
    private clientY: number | null = null;
    private timeoutId: number | null  = null;

    public start = () => {
      this.enabled = true;
      document.addEventListener('mousemove', this.handleMouseMove);
      this.tick();
    };

    public stop = () => {
      this.enabled = false;
      document.removeEventListener('mousemove', this.handleMouseMove);
      if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId);
      }
    };

    private handleMouseMove = (e: MouseEvent) => {
      this.clientY = e.clientY;
    };

    private tick = () => {
      if (!this.enabled) return;
      let direction: number = 0;
      let step: number = this.step;

      if (this.clientY !== null) {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (this.clientY < this.zone && scrollTop > 0) {
          direction = -1;
          step *= (this.zone - this.clientY) / this.zone;
        } else if (this.clientY > windowHeight - this.zone && scrollTop < documentHeight - windowHeight - 1) {
          direction = 1;
          step *= (this.clientY - (windowHeight - this.zone)) / this.zone;
        }
      }

      window.scrollBy({
        top: step*direction,
        behavior: "smooth",
      });
      this.timeoutId = setTimeout(this.tick, this.interval);
    };
}
