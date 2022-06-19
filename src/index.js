import kaboom from "kaboom";
import { createFloor } from "./map/createFloor";
import { moveLeft, moveRight, jump, shoot } from "./player/actions";
import { createPlayer } from "./player/createPlayer";
import { initPlayers } from "./player/initPlayers";
import { createPowerBar } from "./powerBar/createPowerBar";
import { handleProgressBar } from "./powerBar/handleProgressBar";
import "./styles/style.css";

kaboom({
    width: 800,
    height: 600,
    font: "sinko",
    canvas: document.querySelector("#mycanvas"),
    background: [100, 100, 150],
});
export const size = 100;
const cannonSlice = 1.25;
export const speed = 350;
const floorSize = {
    w: width() / 3,
    h: 48
};

const leftSide = 0;
const rightSide = width() - floorSize.w;
const floor = {
    1: 200,
    2: 400
};
const rects = [
    {
        size: floorSize,
        bgColor: [127, 7, 255],
        position: {
            x: leftSide,
            y: floor[1]
        }
    },
    {
        size: floorSize,
        bgColor: [200, 7, 255],
        position: {
            x: leftSide,
            y: floor[2]
        }
    },
    {
        size: floorSize,
        bgColor: [127, 255, 0],
        position: {
            x: rightSide,
            y: floor[1]
        }
    },
    {
        size: floorSize,
        bgColor: [107, 200, 255],
        position: {
            x: rightSide,
            y: floor[2]
        }
    }
];

loadSprite("apple", "sprites/apple.png", {
    width: 10,
    height: 10,
});

loadSprite("cannon", "sprites/cannon.png", {
    sliceX: cannonSlice,
    sliceY: cannonSlice

});

scene("game", () => {
    gravity(9.82 ** 2);
    createFloor(rects);

    let progressBar = createPowerBar(width(), height());
    let { players } = initPlayers({ size });
    let [player, player2] = players.map(createPlayer);

    players.currentPlayer = players.currentPlayer ?? player;

    onKeyPressRepeat("left", () => {
        moveLeft(currentPlayer, speed);
    });

    onKeyPressRepeat("right", () => {
        moveRight(currentPlayer, speed);
    });

    onKeyPressRepeat("space", () => {
        const { userAction } = progressBar;
        const move = handleProgressBar[userAction];
        move(progressBar);
    });

    onKeyPress("q", () => {
        shoot(currentPlayer);
    });

    onKeyPress("enter", () => {
        currentPlayer = currentPlayer == player
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
