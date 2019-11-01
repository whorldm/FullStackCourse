const https = require('https');

// 转换数据格式
function convert(listStr) {
    const body = JSON.stringify(listStr);
    var convertObj = {
        data: body.data.map(item => {
            let type = 'default';
            let imageList = [];

            if (item.image_list.length >= 3) {
                type = 'multiplePic';
                imageList = item.image_list.map(image => image.url);
            } else if (item.image_url) {
                type = 'singlePic';
                imageList = [item.image_url];
            }

            return { 
                "type": type,
                "data": {
                    "articleUrl": item.article_url,
                    "title": item.title,
                    "id": "i6727851773362438664",
                    "articleType": "video",
                    "imageList": imageList
                }
            };
        })
    };

    return convertObj;
}

// 获取头条列表数据
function getList() {
    return new Promise((resolve, reject) => {
        https.get(
            'https://m.toutiao.com/list/?tag=__all__&ac=wap&count=20&format=json_raw&as=A1255D5A97ECC75',
            (content) => {
                let listData = '';
                content.on('data', chunk => {
                    listData += chunk;
                })
                .on('end', () => {
                    resolve(listData);
                })
            }
        )
    });
}

module.exports = {
    convert: convert,
    getList: getList
}