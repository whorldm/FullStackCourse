/**
 * @file 01背包问题
 * @description 假设背包可承受重量W，物品个数n，物品重量存储在数组items，物品价格存储在values，
 *              如何装物品才能在不超过背包的最大限重条件下，使得装入物品的总价值最高
 */ 

const n = 5; // 物品数量
const items = [2, 2, 4, 6, 3]; // 每个物品重量
const values = [3, 4, 8, 9, 6]; // 每个物品的价值
const packageWeight = 9; // 背包的限重
let maxWeight = 0; // 记录背包物品中的最大重量
let maxValue = 0; // 记录背包中装入物品总价值

/**
 * 递归树
 * @param {Number} index 考察物品的顺序，即物品在数组中的index
 * @param {Number} currentWeight 当前装入背包的物品总重量
 * @param {Number} currentValue 当前装入背包的物品总价值 
 */
function pack(index = 0, currentWeight = 0, currentValue = 0) {
    if(index === n || currentWeight === packageWeight) {
        maxValue = Math.max(currentValue, maxValue);
        return ;
    }

    pack(index + 1, currentWeight, currentValue);
    if(currentWeight + items[index] <= packageWeight) {
        pack(index + 1, currentWeight + items[index], currentValue + values[index]);
    }
}

// 但上述方式，我们在观察递归树的时候，可以看出有的分支是重复，不必递归的
// 所以加入备忘录，减少不必要的递归分支，优化时间效率
const flagArr = Array(5)
    .fill(0)
    .map(() => Array(10).fill(0));
function pack2 (index = 0, currentWeight = 0, currentValue = 0) {
    if(index === n || currentWeight === packageWeight) {
        maxValue = Math.max(currentValue, maxValue);
        return;
    }

    // 当考察物品顺序以及重量相同的情况下，排除总价值小的情况
    if(flagArr[index][currentWeight] < currentValue) return ;
    flagArr[index][currentWeight] = currentValue;

    pack(index + 1, currentWeight, currentValue);
    if(currentWeight + items[index] <= packageWeight) {
        pack(index + 1, currentWeight + items[index], currentValue + values[index]);
    }
}


/**
 * 动态规划
 * @param {Array} weightArr 物品的重量数组
 * @param {Array} valueArr 物品的价值数组
 * @param {Number} n 物品数量
 * @param {Number} packageWeight 背包的最大限重
 */
function pack3(weightArr, valueArr, n, packageWeight) {
    const status = Array(n).fill(0).map(() => Array(packageWeight + 1).fill(-1));
   // 构建二维数组(动态规划表)
    //       0    1   2   3   4   5   6   7   8   9
    // w=2 [[0,  -1,  3, -1, -1, -1, -1, -1, -1, -1],   3
    // w=2  [ 0, -1,  4, -1,  7, -1, -1, -1, -1, -1],    4
    // w=4  [ 0, -1,  4, -1,  8, -1, 12, -1, 15, -1],    8
    // w=6  [ 0, -1,  4, -1,  8, -1, 12, -1, 15, -1],    9
    // w=3  [ 0, -1,  4,  6,  8, 10, 12, 14, 15, 18]]    6
    
    // 第一个物品特殊处理
    status[0][0] = 0;
    if(weightArr[0] <= packageWeight) {
        status[0][weightArr[0]] = valueArr[0];
    }

    for(let i = 1; i < n; i++) {
        for(let j = 0; j <= packageWeight; j++) {
            if(status[i-1][j] >= 0) {
                status[i][j] = status[i-1][j];
            }
        }

        for(let j = packageWeight - weightArr[i]; j >= 0; j--) {
            if(status[i-1][j] >= 0) {
                let tempValue = status[i-1][j] + valueArr[i];
                if(tempValue > status[i][j + weightArr[i]]) {
                    status[i][j + weightArr[i]] = tempValue;
                }
                // status[i][j + weightArr[i]] = Math.max(status[i-1][j] + valueArr[i], status[i][j + weightArr[i]])
            }
        }
    }

    maxValue = Math.max(...status[n-1]);
}


// 测试用例入口
function start() {
    pack(0, 0, 0);

    // pack2(0, 0, 0);

    // pack3(items, values, n, packageWeight);
}

start();