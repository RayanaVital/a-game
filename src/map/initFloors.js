export const initFloors = ({ floor, floorSize, leftSide, rightSide }) => {
  return [
    {
      size: floorSize,
      bgColor: [127, 7, 255],
      position: {
        x: leftSide,
        y: floor[1]
      }
    },
    {
      size: floorSize,
      bgColor: [200, 7, 255],
      position: {
        x: leftSide,
        y: floor[2]
      }
    },
    {
      size: floorSize,
      bgColor: [127, 255, 0],
      position: {
        x: rightSide,
        y: floor[1]
      }
    },
    {
      size: floorSize,
      bgColor: [107, 200, 255],
      position: {
        x: rightSide,
        y: floor[2]
      }
    },
    
  ]
}

