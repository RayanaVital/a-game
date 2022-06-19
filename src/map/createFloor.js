export const createFloor = (floors) => {
  floors.forEach(rectangle => {
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
};
