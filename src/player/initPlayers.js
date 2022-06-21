export const initPlayers = (props) => {
  return {
    players: [
      {
        hp: 1000,
        angles: [
          15, 67
        ],
        multiplier: 0,
        name: 'Player 1',
        ...props,
      },
      {
        hp: 10100,
        angles: [
          26, 78
        ],
        multiplier: 1,
        name: 'Player 2',
        ...props,
      }
    ],
    currentPlayer: 0
  }
};
