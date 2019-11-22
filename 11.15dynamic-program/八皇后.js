/**
 * @file 八皇后问题
 * @description 采用回溯算法解决，依次扫描每一行，然后寻找符合要求的棋子位置
 */

// 统计一共有多少种摆法
let totalCount = 0;

// 初始化棋盘(二维数组)
function getChessBoard(size = 8) {
    const chessboard = [];
    for (let i = 0; i < size; i++) {
        chessboard.push(Array(size).fill(0));
    }
    return chessboard;
}

// 参数为当前执行扫描的行数
function eightQueen(chessBoard, depth = 0) {
    let maxDepth = chessBoard.length;
    if (depth >= maxDepth) {
        totalCount++;
        console.log('chessBoard - index:', totalCount);
        for (let i = 0; i < maxDepth; i++) {
            console.log(chessBoard[i]);
        }
        return;
    }
    for (let i = 0; i < maxDepth; i++) {
        // 判断横行，纵行，斜行有没有棋子
        if (hasClash(chessBoard, depth, i)) {
            chessBoard[depth][i] = 1;
            eightQueen(chessBoard, depth + 1);
            chessBoard[depth][i] = 0;
        }
    }
}

// 计算当前位置是否符合要求
function hasClash(chessBoard ,row, col) {
    for(let i = row - 1; i >= 0; i--) {
        const rowHasClash = chessBoard[row][i] === 1;
        const colHasClash = chessBoard[i][col] === 1;
        // 斜线是否有冲突
        const directions = [
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1]
        ];
        const slashHasClash = directions.some(([xMark, yMark]) => {
            const newX = row + xMark * (i + 1);
            const newY = col + yMark * (i + 1);
            return chessBoard[newX] && chessBoard[newX][newY] === 1;
        })
        if(rowHasClash || colHasClash || slashHasClash) {
            return false;
        }
    }
    return true;
}

/********************************* 分割线 ***********************************/

let total = 0;  //统计八皇后的摆法
const result = Array(8); //全局或成员变量,下标表示行,值表示queen存储在哪一列
// 调用方式：cal8queens(0);
function cal8queens(row = 0) { 
    if (row == 8) { // 8个棋子都放置好了，打印结果
        total ++;
        console.log('total result::', total);
        for (let i = 0; i < 8; i++) {
            const item = Array(8).fill('*');
            item[result[i]] = 'Q';
            console.log(item);
        }
        return; // 8行棋子都放好了，已经没法再往下递归了，所以就return
    }

    for (let column = 0; column < 8; ++column) { // 每一行都有8中放法
        if (isOk(row, column)) { // 有些放法不满足要求
            result[row] = column; // 第row行的棋子放到了column列
            cal8queens(row + 1); // 考察下一行
        }
    }
}

// 判断row行column列放置是否合适
function isOk(row, column) {  
    let leftup = column - 1, rightup = column + 1;
    for (let i = row - 1; i >= 0; i--) { // 逐行往上考察每一行
        if (result[i] === column) return false; // 向上遍历，看同一列是否已经摆放了棋子
        if (leftup >= 0) { // 考察左上对角线：第i行leftup列有棋子吗？
            if (result[i] === leftup) return false;
        }
        if (rightup < 8) { // 考察右上对角线：第i行rightup列有棋子吗？
            if (result[i] === rightup) return false;
        }
        --leftup;
        ++rightup;
    }
    return true;
}


// 函数启动入口
function start() {
    // 使用二维数组摆放结果
    const chessBoard = getChessBoard(8);
    eightQueen(chessBoard, 0);
    console.log('Queuen Total Num::', totalCount);

    // 使用一维数组记录摆放结果
    // cal8queens(0);
}

start();