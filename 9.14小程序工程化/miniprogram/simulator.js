const automator = require('miniprogram-automator');
const path = require('path');

const miniprogram = automator.launch({
    projectPath: path.resolve(__dirname)
})
.then(miniprogram => {
    miniprogram
        .currentPage()
        .then(page => {
            return page
                .waitFor(1000)
                .then(() => page);
        })
        .then(page => page.$('multiplepic'))
        .then(element => {
            if(element) {
                console.log("测试成功")
            } else {
                console.log("测试失败")
            }
            // console.log('element:::',element)
        })
})