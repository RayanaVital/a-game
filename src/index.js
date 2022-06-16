import kaboom from "kaboom";
import "./styles/style.css";

kaboom({
    width: 800,
    height: 600,
    font: "sinko",
    canvas: document.querySelector("#mycanvas"),
    background: [100, 100, 150],
});

const h = 48;
const w = width() / 4;
const speed = 350;
const size = {
    w,
    h
};

const ladoEsquerdo = 0;
const ladoDireito = width() - w;

const rects = [
    {
        size,
        bgColor: [127, 7, 255],
        position: {
            x: ladoEsquerdo,
            y: 200
        }
    },
    {
        size,
        bgColor: [200, 7, 255],
        position: {
            x: ladoEsquerdo,
            y: 400
        }
    },
    {
        size,
        bgColor: [127, 255, 0],
        position: {
            x: ladoDireito,
            y: 200
        }
    },
    {
        size,
        bgColor: [107, 200, 255],
        position: {
            x: ladoDireito,
            y: 400
        }
    }
];

const createRects = () => {
    rects.forEach(rectangle => {
        const { size, position, bgColor } = rectangle;
        const { w, h } = size;
        const { x, y } = position;
        const r = bgColor[0];
        const g = bgColor[1];
        const b = bgColor[2];
        add([
            rect(w, h),
            pos(x, y),
            outline(4),
            area(),
            solid(),
            color(r, g, b)
        ]);
    });
}

const createGameInstance = (props) => {
    return {
        players: {
            1: {
                hp: 1000,
                angles: [
                    15, 67
                ],
                multiplier: 0,
            },
            2: {
                hp: 10100,
                angles: [
                    26, 78
                ],
                multiplier: 1,
            }
        },
        currentPlayer: 1
    }
}

let gameInstance = createGameInstance();

loadSprite("apple", "sprites/apple.png", {
    width: 10,
    height: 10,
});

loadSprite("cannon", "sprites/cannon.png", {
    sliceX: 1.25,
    sliceY: 1.25
});

const createPlayer = ({ multiplier }) => add([
    sprite("cannon", {
        width: 100,
        height: 100,
        flipX: multiplier,
    }),
    body(),
    area(),
    pos(((width() - 100) * multiplier), 0),
    solid(),
    "player",
    { multiplier }
]);

scene("game", () => {

    createRects();
    gravity(9.82 ** 2)
    let [
        player,
        player2
    ] = [
            createPlayer({
                multiplier: 0
            }),
            createPlayer({
                multiplier: 1
            })
        ];

    let currentPlayer = player;
    onKeyPressRepeat("left", () => {
        moveLeft(currentPlayer);
    });

    onKeyPressRepeat("right", () => {
        moveRight(currentPlayer);
    });

    onKeyPress("space", () => {
        jump(currentPlayer);


    });

    onKeyPress("q", () => {
        shoot(currentPlayer);
    });

    onKeyPress("enter", () => {
        currentPlayer = currentPlayer == player
            ? player2
            : player;
    });
});

const moveLeft = (player) => {
    player.flipX(true);
    player.multiplier = 1;
    player.move(-speed, 0);
}

const moveRight = (player) => {
    player.flipX(false);
    player.multiplier = 0;
    player.move(speed, 0);
}

const jump = (player) => {
    if (!player.isGrounded()) {
        return;
    }

    player.jump(100);
}

const shoot = (player) => {
    if (!player.isGrounded()) {
        return;
    }

    const { x, y } = player.pos;
    const [w, h] = [100, 100]; //TODO: get size from player
    const { multiplier } = player;
    const speedMultiplier = multiplier ? -1 : 1;
    const speed = 500;
    const bulletSize = 35;

    const cannonEdgeX = multiplier ?? w + 1;
    const bulletSpawnX = cannonEdgeX + bulletSize;
    const posMultiplier = speedMultiplier + 1;
    const bulletX = x + (bulletSpawnX * posMultiplier);

    const cannonEdgeY = multiplier ?? (y / 2) + 1;
    const bulletSpawnY = cannonEdgeY + bulletSize;
    const bulletY = y + bulletSpawnY;

    const bullet = add([
        sprite("apple", {
            width: bulletSize,
            height: bulletSize,
        }),
        solid(),
        pos(bulletX, bulletY),
        area(),
        move(player.pos.angle(x * speedMultiplier, y), speed * speedMultiplier),
        cleanup(),
        "bullet"
    ]);

    bullet.onCollide("player", (player) => {
        destroy(bullet);
    })
}


go("game");
