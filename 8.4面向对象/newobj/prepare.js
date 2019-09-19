(function () {
    function prepare() {
        const context = document.getElementById('content').getContext('2d');
        const heroImg = new Image();
        const monsterImg = new Image();

        const loadImgTask = (img, src) => {
            return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = src;
            })
        };

        return Promise
            .all([
                loadImgTask(monsterImg, './all.jpg'),
                loadImgTask(heroImg, './hero.png')
            ])
            .then(function () {
                return {
                    context,
                    monsterImg,
                    heroImg
                }
            });
    }

    window.prepare = prepare;
})()