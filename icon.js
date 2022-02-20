class Icon {
    constructor(source, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.source = source;
    }
    draw(ctx) {
        ctx.globalAlpha = 1;
        ctx.drawImage(this.source, this.x, this.y, this.width, this.height);
    }
    update() {

    }
}