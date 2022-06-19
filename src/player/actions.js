export const moveLeft = (player, speed) => {
  player.flipX(true);
  player.multiplier = 1;
  player.move(-speed, 0);
};
export const moveRight = (player, speed) => {
  player.flipX(false);
  player.multiplier = 0;
  player.move(speed, 0);
};
export const jump = (player) => {
  if (!player.isGrounded()) {
    return;
  }

  player.jump(100);
};
export const shoot = (player) => {
  if (!player.exists()) return
  if (!player.isGrounded()) return

  const {
    x: xAxis,
    y: yAxis
  } = player.pos;

  const { size } = player;
  const [width, height] = [size, size];

  const { multiplier } = player;
  const speedMultiplier = multiplier ? -1 : 1;
  const posMultiplier = speedMultiplier + 1;

  const speed = 500;
  const bulletSize = 35;

  const cannonEdgeX = multiplier ?? width + 1;
  const bulletSpawnX = cannonEdgeX + bulletSize;
  const bulletX = xAxis + (bulletSpawnX * posMultiplier);

  const cannonEdgeY = multiplier ?? (yAxis / 2) + 1;
  const bulletSpawnY = cannonEdgeY + bulletSize;
  const bulletY = yAxis + bulletSpawnY;

  const bullet = add([
    sprite("apple", {
      width: bulletSize,
      height: bulletSize,
    }),
    solid(),
    pos(bulletX, bulletY),
    area(),
    move(player.pos.angle(xAxis * speedMultiplier, yAxis), speed * speedMultiplier),
    cleanup(),
    "bullet"
  ]);

};
