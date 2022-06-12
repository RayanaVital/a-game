import kaboom from "kaboom";

kaboom();
const h = 48;
const w = 200;
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


rects.forEach(rectangle => {
    const { size, position, bgColor } = rectangle;
    const { w, h } = size;
    const { x, y } = position;
    const r = bgColor[0];
    const g = bgColor[1];
    const b = bgColor[2];
    console.log({ rectangle });
    add([
        rect(w, h),
        pos(x, y),
        outline(4),
        area(),
        solid(),
        color(r, g, b)
    ]);
});


add([
    circle(10),
    pos(80, 40),
    scale(3),
    rotate(30),
    color(0, 0, 255),
    area({ width: 10, height: 10 }),
    body(),
])