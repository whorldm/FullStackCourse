/**
 * @file 01背包问题
 * @description 假设背包可承受重量W，物品个数n，物品重量存储在数组arr，如何装物品才能在不超过背包的最大限重下装更多的东西
 */ 
const n = 5; // 物品数量
const arr = [2, 2, 4, 6, 3]; // 每个物品重量
const packageWeight = 9; // 背包的限重
let maxWeight = Math.max(...arr); // 记录背包物品中的最大重量

/**
 *
 * @param {Number} index 考察物品的顺序，即数组中的位置
 * @param {Number} currentWeight 当前背包所装物品的重量
 */
function pack(index = 0, currentWeight = 0) {
    // 装满了或者已经考察完所有的物品
    if (currentWeight === packageWeight || index === n) {
        maxWeight = Math.max(maxWeight, currentWeight);
        return;
    }
    pack(index + 1, currentWeight); // 选择不装第index个物品
    if (currentWeight + arr[index] <= packageWeight) {
        pack(index + 1, currentWeight + arr[index]); // 选择装第index个物品
    }
}

// 加入备忘录功能，排除重复结果的递归，优化时间效率
const flagArr = Array(5)
    .fill(0)
    .map(() => Array(10).fill(false));
function pack1(index = 0, currentWeight = 0) {
    if (currentWeight === packageWeight || index === n) {
        maxWeight = Math.max(maxWeight, currentWeight);
        return;
    }

    if (flagArr[index][currentWeight]) return;
    flagArr[index][currentWeight] = true;

    pack1(index + 1, currentWeight);
    if (currentWeight + arr[index] <= packageWeight) {
        pack(index + 1, currentWeight + arr[index]);
    }
}

/**
 * 动态规划解决01背包问题
 * @param {*} weightArr 存储物品重量的数组
 * @param {*} n 物品的个数
 * @param {*} packageWeight 背包的限重
 */
function pack2(weightArr, n, packageWeight) {
    // 构建二维数组(动态规划表)
    //       0  1  2  3  4  5  6  7  8  9
    // w=2 [[1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    // w=2  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    // w=6  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    // w=4  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    // w=3  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1]]
    const status = Array(n)
        .fill(0)
        .map(() => Array(packageWeight + 1).fill(0));

    // 第一个物品特殊处理
    status[0][0] = 1;
    if (weightArr[0] <= packageWeight) {
        status[0][weightArr[0]] = 1;
    }

    // 动态规划
    for (let i = 1; i < n; i++) {
        for (let j = 0; j <= packageWeight; j++) {
            // 不把第i个物品放入背包
            if (status[i - 1][j] === 1) {
                status[i][j] = status[i - 1][j];
            }
        }
        for (let j = 0; j <= packageWeight - weightArr[i]; j++) {
            //把第i个物品放入背包
            if (status[i - 1][j] === 1) {
                status[i][j + weightArr[i]] = 1;
            }
        }
    }

    for (let i = packageWeight; i >= 0; --i) {
        if (status[n-1][i] === 1) {
            maxWeight = i;
        }
    }
}

// 背包问题动态规划——使用一维数组优化空间
function pack3(weightArr, n, packageWeight) {
    const status = Array(packageWeight+1).fill(0);

    status[0] = 1;
    if(weightArr[0] <= packageWeight) {
        status[weightArr[0]] = 1;
    }

    for(let i = 1; i < n; i++) {
        for(let j = packageWeight - weightArr[i]; j >= 0; j--) {
            if(status[j] === 1) {
                status[j + weightArr[i]] = 1;
            }
        }
    }  

    maxWeight = status.lastIndexOf(0);
}

// 测试用例入口
const start = () => {
    pack(0, 0);

    // pack1(0, 0);

    // pack2(arr, n, packageWeight);

    // pack3(arr, n, packageWeight);

    console.log("total weight:::", maxWeight);
};
