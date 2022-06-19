export function initWall(width, height) {
    return [
        {
            position: {
                x: 0,
                y: 0
            },
            size: {
                x: 0,
                y: height
            },
        },
        {
            position: {
                x: 0,
                y: 0
            },
            size: {
                x: width,
                y: 0
            },
        },
        {
            position: {
                x: width,
                y: 0
            },
            size: {
                x: width,
                y: height
            },
        },
        {
            position: {
                x: 0,
                y: height
            },
            size: {
                x: width,
                y: height
            }
        }
    ];
}