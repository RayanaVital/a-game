export function createWall(walls){
    walls.forEach(wall => {
        const position = wall.position;
        const size = wall.size;

        add([
            rect(size.x, size.y),
            pos(position.x, position.y),
            area(),
            solid(),
            color(255, 255, 255)
        ]);
    });

}