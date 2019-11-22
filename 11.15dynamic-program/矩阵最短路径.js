/**
 * @file 最短路径
 * @description 假设我们有一个 n 乘以 n 的矩阵 arr[n][n]。矩阵存储的都是正整数。棋子起始位置在左上角，终止位置在右下角。
 * 将棋子从左上角移动到右下角，每次只能向右或者向下移动一位。把每条路径经过的数字加起来看作路径的长度。
 * 那从左上角移动到右下角的最短路径长度是多少呢？
 */

/**
 * 回溯
 * @param {Number} i 二维矩阵的横坐标
 * @param {Number} j 二维矩阵的纵坐标
 * @param {Number} dist 行驶路径长度
 * @param {Array<Array>} arr 二维矩阵
 * @param {Number} n 
 */
let minDist = 0;
function minDistBT (i=0, j=0, dist=0, matrix, n) {
    // 一旦棋子的位置超出矩阵，则跳出递归
    if(i == n && j == n) {
        if(dist < minDist) {
            minDist = dist;
        }
        return;
    }

    // 往下走 更新i=i+1, j=j
    if(i < n && j < n) {
        minDistBT(i + 1, j, (dist + matrix[i][j]), matrix, n);
    }

    // 往右走 更新i=i, j=j+1
    if(j < n && i < n) {
        minDistBT(i, j + 1, (dist + matrix[i][j]), matrix, n);
    }
}


/**
 * 状态表法
 * @param {Array<Array>} matrix 
 * @param {Number} n 
 */
function minDistDP(matrix, n) {
    // 初始化二维状态表
    const status = Array(n).fill(0).map(() => Array(n).fill(0));

    let sum = 0;

    // 初始化第一行的数据
    for(let j = 0; j < n; j++) {
        sum += matrix[0][j];
        status[0][j] = sum;
    }
    sum = 0;
    // 初始化第一列的数据
    for(let i = 0; i < n; i++) {
        sum += matrix[i][0];
        status[i][0] = sum;
    }

    for(let i = 1; i < n; i++) {
        for(let j = 1; j < n; j++) {
            // let temp1 = status[i - 1][j] + matrix[i][j];  // 向下走
            // let temp2 = status[i][j - 1] + matrix[i][j];  // 向右走
            // status[i][j] = Math.min(temp1, temp2);
            status[i][j] = matrix[i][j] + Math.min(status[i - 1][j], status[i][j-1]);
        }
    }

    minDist = status[n-1][n-1];
}


// 测试入口
function start() {
    const arr = [
        [1, 3, 5, 9],
        [2, 1, 3, 4],
        [5, 2, 6, 7],
        [6, 8, 4, 3]
    ];

    // minDistBT(0, 0, 0, arr, arr.length);

    minDistDP(arr, arr.length);

    console.log('min-cos:', minDist)
}

start();