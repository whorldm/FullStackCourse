/**
 * 
 * @file 区间覆盖
 * @description 从n个区间中选出一部分区间，使得这部分区间满足两两不相交的问题
 */

function RegionCoverage (arr) {
    arr.sort((a, b) => {
        return a[1] - b[1];
    });
    console.log('sorted arr', arr);
    const result = [];
    let minRight = arr[0][1];
    result.push(arr[0]);
    for(let i = 1; i < arr.length; i++) {
        if(arr[i][0] >= minRight) {
            result.push(arr[i]);
            minRight = arr[i][1];
        }
    }
    console.log('result', result);
}

const testData = [
    [6, 8], [2, 4], [3, 5], [1, 5], [5, 9], [8, 10]
];
RegionCoverage(testData);
