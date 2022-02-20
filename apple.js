class AppleMaker {
    constructor() {
        this.appleCount = 0;
    }
    update() {
        gameEngine.entities.forEach(entity => {
            if (entity instanceof Apple) this.appleCount++;
        });
        if (this.appleCount === 0) {
            let flag = true;
            let apple;
            do {
                let i = getRandomInteger(0, CELL_NUM - 1);
                let j = getRandomInteger(0, CELL_NUM - 1);
                apple = new Apple(i, j);
                gameEngine.entities.forEach(entity => {
                    if (entity instanceof Snake) {
                        flag = entity.collidesWith(apple.pos);
                    }
                });
            } while (flag)
            gameEngine.addEntity(apple);
        }

        this.appleCount = 0;
    }
    draw(ctx) {

    }
}

class Apple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.pos = new Vector(this.x, this.y);
        this.dead = false;
    }

    update(){
        gameEngine.entities.forEach(entity => {
            if (entity instanceof Snake) {
                if (entity.body[0].equals(this.pos)) {
                    this.dead = true;
                    entity.increaseGrowth(GROWTH);
                }
            }
        })
        if (this.dead) this.removeFromWorld = true;
    }

    draw(ctx){
        const image = ASSET_MANAGER.getAsset("./resources/apple.png");
        ctx.drawImage(image,
            this.pos.x*CELL_SIZE, this.pos.y*CELL_SIZE,
            CELL_SIZE, CELL_SIZE
        );
    }    

}