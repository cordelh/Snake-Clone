const CELL_SIZE = 40;
const CELL_NUM = 20;
const GROWTH = 5;

let GAME_OVER = false;

const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./resources/apple.png");
ASSET_MANAGER.queueDownload("./resources/snake.png");
ASSET_MANAGER.queueDownload("./resources/head_right.png");
ASSET_MANAGER.queueDownload("./resources/head_up.png");
ASSET_MANAGER.queueDownload("./resources/head_left.png");
ASSET_MANAGER.queueDownload("./resources/head_down.png");
ASSET_MANAGER.queueDownload("./resources/game_over.png");
ASSET_MANAGER.queueDownload("./resources/Play.png");
ASSET_MANAGER.queueDownload("./resources/play_again.png");


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	gameEngine.init(ctx);
	
	// const appleMaker = new AppleMaker();
	// gameEngine.addEntity(appleMaker);
	// const snake = new Snake();
	// gameEngine.addEntity(snake);

	const sceneManager = new SceneManager();
	gameEngine.addEntity(sceneManager);

	gameEngine.start();
});