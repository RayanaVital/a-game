export const initPlayers = ({ size }) => {
  return {
    players: [
      {
        hp: 1000,
        angles: [
          15, 67
        ],
        multiplier: 0,
        size,
      },
      {
        hp: 10100,
        angles: [
          26, 78
        ],
        multiplier: 1,
        size,
      }
    ],
    currentPlayer: null
  }
};
