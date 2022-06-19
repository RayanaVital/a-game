export const createPlayer = (props) => {
  const { multiplier, size, hp } = props;
  return add([
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
    props
  ]);
}
