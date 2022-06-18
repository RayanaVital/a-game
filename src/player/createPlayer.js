export const createPlayer = ({ multiplier, size, hp }) => add([
  sprite("cannon", {
    width: size,
    height: size,
    flipX: multiplier,
  }),
  body(),
  area(),
  pos(((width() - size) * multiplier), 0),
  solid(),
  health(hp),
  "player",
  { multiplier }
]);
