import kaboom from "kaboom";
import { createFloor } from "./map/createFloor";
import { moveUp, moveDown, moveLeft, moveRight, jump, shoot } from "./player/actions";
import { createPlayer } from "./player/createPlayer";
import { initPlayers } from "./player/initPlayers";
import { createPowerBar } from "./powerBar/createPowerBar";
import { handleProgressBar } from "./powerBar/handleProgressBar";
import { initFloors } from "./map/initFloors";
import "./styles/style.css";

kaboom({
    width: 800,
    height: 600,
    font: "sinko",
    canvas: document.querySelector("#mycanvas"),
    background: [100, 100, 150],
});

const speed = 350;
const playerSize = 100;
const bulletSize = 10;
const cannonSlice = 1.25;
const gravityValue = 9.82 ** 2;

export const floorSize = {
    w: width() / 3,
    h: 48
};
export const rightSide = width()
    - floorSize.w;
export const leftSide = 0;
const floor = {
    1: 200,
    2: 400
};


loadSprite("cannon", "sprites/cannon.png", {
    sliceX: cannonSlice,
    sliceY: cannonSlice

});

loadSprite("apple", "sprites/apple.png", {
    width: bulletSize,
    height: bulletSize,
});


scene("game", () => {
    gravity(gravityValue);

    const floors = initFloors({ floor, floorSize, leftSide, rightSide });
    createFloor(floors);

    let progressBar = createPowerBar(width(), height());
    let { players } = initPlayers({ size: playerSize, currentAngle: 0 });

    let [player, player2] = players.map(createPlayer);

    players.currentPlayer = player;

    onKeyPressRepeat("left", () => {
        moveLeft(players.currentPlayer, speed);
    });

    onKeyPressRepeat("right", () => {
        moveRight(players.currentPlayer, speed);
    });

    onKeyPressRepeat("space", () => {
        const { userAction } = progressBar;
        const move = handleProgressBar[userAction];
        move(progressBar, width);
    });

    onKeyPress("q", () => {
        shoot(players.currentPlayer);
    });

    onKeyPress("enter", () => {
        players.currentPlayer = players.currentPlayer == player
            ? player2
            : player;
    });

    onCollide("player", "bullet", (player, bullet, colision) => {
        if (!bullet.exists()) {
            console.log(player.hp());
            return;
        }

        if (player.hp() <= 0) {
            destroy(player);
            return;
        }

        player.hurt(1);
        destroy(bullet);

    });

    onCollide("bullet", "bullet", (bullet) => {
        destroy(bullet);
    })

});

go("game");
