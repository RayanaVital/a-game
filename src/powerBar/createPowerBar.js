export const createPowerBar = (width, heigth) => {
  let main = add([
    rect(width - 2, 48),
    pos(1, heigth - 50),
    outline(1),
    area(),
    solid(),
    color(152, 100, 155)
  ]);

  return add([
    rect(0, 38),
    pos(5, heigth - 45),
    outline(2, rgb(255, 255, 255)),
    color(0, 200, 0),
    "progressBar",
    {
      actions: ['fill', 'unfill'],
      userAction: 'fill'
    }
  ]);
}