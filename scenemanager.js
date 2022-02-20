class SceneManager {
	constructor() {
        this.scenes = ["title", "playing", "gameOver"];
        this.currentScene = "";
	}
    update() {
        switch(this.currentScene) {
            case "":
                console.log('her')
                this.loadGameTitle();
                this.currentScene = "title";
                break;
            case "title":
                // switch to playing when start button is clicked
                let click = gameEngine.click;
                if (click && click.x > 800/2 - 150 && click.x < 800/2 + 150
                    && click.y > 800/2 - 40 && click.y < 800/2 + 40) {
                    this.currentScene = "playing";
                    this.clearEntities();
                    gameEngine.click = null;
                    this.loadGamePlay();
                }
                break;
            case "playing":
                if (GAME_OVER) {
                    console.log('easdf')
                    this.loadGameOver();
                    this.currentScene = "gameOver";
                    GAME_OVER = false;
                }
                break;
            case "gameOver":
                let click2 = gameEngine.click;
                if (click2 && click2.x > 800/2 - 150 && click2.x < 800/2 + 150
                    && click2.y > 800/2 - 40 && click2.y < 800/2 + 40) {
                    this.currentScene = "playing";
                    this.clearEntities();
                    gameEngine.click = null;
                    this.loadGamePlay();
                }
                break;
        }
	}
    draw(ctx) {
		// this.loadGameTitle = (ctx) => {
        //     ctx.drawImage(ASSET_MANAGER.getAsset("./resources/Play.png"),
        //         ctx.width/2 - 150, ctx.height/2 - 40, 150, 80);
        // }
        // this.loadGameOver = (ctx) => {
        //     ctx.drawImage(ASSET_MANAGER.getAsset("./resources/game_over.png"), 
        //         ctx.width/2 - 150, ctx.height/2 - 160, 150, 80);
        //     ctx.drawImage(ASSET_MANAGER.getAsset("./resources/play_again.png"), 
        //         ctx.width/2 - 150, ctx.height/2 - 40, 150, 80);
        // }
	}
	loadGameTitle() {
        console.log('he')
		const begin = new Icon(
            ASSET_MANAGER.getAsset("./resources/Play.png"),
            800/2 - 150, 800/2 - 40,
            300, 80
        );
        gameEngine.addEntity(begin);
	}
	loadGamePlay() {
		const appleMaker = new AppleMaker();
		gameEngine.addEntity(appleMaker);
		const snake = new Snake();
		gameEngine.addEntity(snake);
	}
	loadGameOver() {
        const end = new Icon(ASSET_MANAGER.getAsset("./resources/game_over.png"), 800/2 - 150, 800/2 - 160, 300, 80);
        const again = new Icon(ASSET_MANAGER.getAsset("./resources/play_again.png"), 800/2 - 150, 800/2 - 40, 300, 80);
        gameEngine.addEntity(end);
        gameEngine.addEntity(again);
	}
	clearEntities() {
        gameEngine.entities.forEach(entity => {
            if (entity === this) return;
            entity.removeFromWorld = true;
        });
    }
}