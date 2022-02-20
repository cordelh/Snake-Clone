class Snake {
    constructor() {
        //0 is our head.
        this.body = [new Vector(5, 10), new Vector(6, 10), new Vector(7, 10)];
        this.direction = new Vector(-1, 0);
        this.time = 0;
        this.growth = 0;
        this.delay = .1;
        this.dead = false;
    }
    //move head up once.
    //move next block to where head was.
    //repeat and remove tail.
    move() {
        let maybe = this.body[0].add(this.direction);
        if (maybe.x < 0 || maybe.x > CELL_NUM - 1 || 
            maybe.y < 0 || maybe.y > CELL_NUM -1  ||
            this.collidesWith(maybe) ) {
                this.direction = new Vector(0, 0);
                this.dead = true;
                GAME_OVER = true;
                return;
        }
        
        for (let i = this.body.length - 2; i >= 0; i--) {
            this.body[i + 1] = {...this.body[i]}
        }
        this.body[0].addInPlace(this.direction);
    }

    increaseGrowth(amount) {
        this.growth += amount;
    }

    grow() {
        for (let i = 0; i < this.growth; i++) {
            this.body.push(this.body[this.body.length - 1]);
        }
        this.growth = 0;
    }

    collidesWith(cell) {
        let i = 0;
        return this.body.some(vector => {
            if (i > 0 && vector.x == cell.x && vector.y == cell.y) return true;
            i++;
        })
    }

    update() {
        const {
            ArrowRight: right, ArrowLeft: left, ArrowUp: up, ArrowDown: down,
        } = gameEngine.keys;
        if (this.dead) return;
        if (right) {
            let vector = new Vector(1, 0);
            if (!this.direction.equals(vector.scale(-1))) {
                this.direction = vector;
            }
            this.facing = 0;
        }
        if (left) {
            let vector = new Vector(-1, 0);
            if (!this.direction.equals(vector.scale(-1))) {
                this.direction = vector;
            }
            this.facing = 1;
        }
        if (up) {
            let vector = new Vector(0, -1);
            if (!this.direction.equals(vector.scale(-1))) {
                this.direction = vector;
            }
            this.facing = 2;
        }
        if (down) {
            let vector = new Vector(0, 1);
            if (!this.direction.equals(vector.scale(-1))) {
                this.direction = vector;
            }
            this.facing = 3;
        }

        if (this.time > this.delay) { 
            this.move(); 
            this.time = 0;
        } else { this.time += gameEngine.deltaTime;}

        if (this.growth > 0) {
            this.grow();
        }
        
    }

    draw(ctx) {
        const image = ASSET_MANAGER.getAsset("./resources/head_right.png");
        //const image2 = ASSET_MANAGER.getAsset("./resources/head_up.png");
        this.body.forEach(vector => {
            ctx.drawImage(image,
                vector.x*CELL_SIZE, 
                vector.y*CELL_SIZE,
                CELL_SIZE, CELL_SIZE
            );
        })
    }
}

//can food spawn in snake? Shouldn't
//Bug where go opposite direction.
//Start and end game.
//Add music, scores, high scores, timer, background.
//Implement images for snake.