/**
 * 2019/8/7
 * 曹雅琴
 */
(function () {
    const HERO_WIDTH = 50;  // hero的宽度
    const HERO_HEIGHT = 50; // hero的高度
    const HERO_SPEED = 10; // hero的移动速度
    const MONSTER_WIDTH = 60; // monster的宽度
    const MONSTER_HRIGHT = 60; // monster的高度
    const KEY_LEFT = 37;
    const KEY_UP = 38;
    const KEY_RIGHT = 39;
    const KEY_DOWN = 40;

    function prepare() {
        const ctx = document.getElementById('content').getContext('2d');
        const heroImg = new Image();
        const monsterImg = new Image();

        const loadImgTask = (img, src) => {
            return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = src;
            })
        };

        const allImgLoadTask = Promise.all([
            loadImgTask(heroImg, './hero.png'),
            loadImgTask(monsterImg, './all.jpg')
        ]);

        return {
            getImgSource: function (cb) {
                allImgLoadTask.then(() => {
                    cb && cb(ctx, heroImg, monsterImg)
                })
            }
        }
    }

    function drawImg(context, heroImg, monsterImg) {
        var draw = function () {
            this.context.drawImage(
                this.img,
                this.imgPos.x,
                this.imgPos.y,
                this.imgPos.width,
                this.imgPos.height,
                this.rect.x,
                this.rect.y,
                this.rect.width,
                this.rect.height
            );
        }

        var hero = {
            img: heroImg,
            context: context,
            imgPos: {
                x: 0,
                y: 0,
                width: 32,
                height: 32
            },
            rect: {
                x: 20,
                y: 20,
                width: HERO_WIDTH,
                height: HERO_HEIGHT
            },
            draw: draw
        }

        var monster = {
            img: monsterImg,
            context: context,
            imgPos: {
                x: 858,
                y: 529,
                width: 32,
                height: 32
            },
            rect: {
                x: 100,
                y: 100,
                width: MONSTER_WIDTH,
                height: MONSTER_HRIGHT
            },
            draw: draw
        }

        hero.draw();
        monster.draw();

        document.onkeydown = function (event) {
            const e = event || window.event;
            const keyCode = e && e.keyCode;
            // 记录原来的英雄的位置
            const tempPos = {
                x: hero.rect.x,
                y: hero.rect.y,
                width: hero.rect.width,
                height: hero.rect.height
            }
            // 是否需要重绘的标志量
            let needToRedraw = false;
            switch (keyCode) {
                case KEY_LEFT:
                    if (hero.rect.x <= 0) {
                        alert('要出界了啦~~~')
                    } else if (isCrash(hero, monster, KEY_LEFT)) {
                        alert('要撞上大魔王啦！！！')
                    } else {
                        hero.rect.x -= HERO_SPEED;
                        needToRedraw = true;
                    }
                    break;
                case KEY_UP:
                    if (hero.rect.y <= 0) {
                        alert('要出界了啦~~~')
                    } else if (isCrash(hero, monster, KEY_UP)) {
                        alert('要撞上大魔王啦！！！')
                    } else {
                        hero.rect.y -= HERO_SPEED;
                        needToRedraw = true;
                    }
                    break;
                case KEY_RIGHT:
                    if (hero.rect.x >= (500 - HERO_WIDTH)) {
                        alert('要出界了啦~~~')
                    } else if (isCrash(hero, monster, KEY_RIGHT)) {
                        alert('要撞上大魔王啦！！！')
                    } else {
                        hero.rect.x += HERO_SPEED;
                        needToRedraw = true;
                    }
                    break;
                case KEY_DOWN:
                    if (hero.rect.y >= (300 - HERO_HEIGHT)) {
                        alert('要出界了啦~~~')
                    } else if (isCrash(hero, monster, KEY_DOWN)) {
                        alert('要撞上大魔王啦！！！')
                    } else {
                        hero.rect.y += HERO_SPEED;
                        needToRedraw = true;
                    }
                    break;
            }

            if (needToRedraw) {
                hero.context.clearRect(
                    tempPos.x,
                    tempPos.y,
                    tempPos.width,
                    tempPos.height
                );
                hero.draw();
            }
        }
    }

    /**
     * @param  {Object} hero
     * @param  {Object} monster
     * @param  {Number} direction
     */
    function isCrash(hero, monster, direction) {
        let isAround = false;
        // 判断各方向对应坐标轴上是否会碰撞
        if (direction == KEY_LEFT) {
            isAround = hero.rect.x > monster.rect.x && hero.rect.x - monster.rect.x <= MONSTER_WIDTH
        }
        if (direction == KEY_UP) {
            isAround = hero.rect.y > monster.rect.y && hero.rect.y - monster.rect.y <= MONSTER_HRIGHT
        }
        if (direction == KEY_RIGHT) {
            isAround = hero.rect.x < monster.rect.x && monster.rect.x - hero.rect.x <= HERO_WIDTH
        }
        if (direction == KEY_DOWN) {
            isAround = hero.rect.y < monster.rect.y && monster.rect.y - hero.rect.y <= HERO_HEIGHT
        }

        if (!isAround) {
            return isAround;
        }

        // 判断各方向垂直坐标轴上是否会碰撞
        if (direction == KEY_LEFT || direction == KEY_RIGHT) {
            let temp = hero.rect.y > monster.rect.y ? (hero.rect.y - monster.rect.y < MONSTER_HRIGHT) : (monster.rect.y - hero.rect.y < HERO_HEIGHT)
            isAround = temp && isAround;
        } else if (direction == KEY_UP || direction == KEY_DOWN) {
            let temp = hero.rect.x > monster.rect.x ? (hero.rect.x - monster.rect.x < MONSTER_WIDTH) : (monster.rect.x - hero.rect.x < HERO_WIDTH)
            isAround = temp && isAround;
        }
        return isAround;
    }

    var manager = prepare();
    manager.getImgSource(function (context, heroImg, monsterImg) {
        drawImg(context, heroImg, monsterImg)
    });
})()