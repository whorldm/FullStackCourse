/**
 * 2019/8/7
 * 曹雅琴
 */
(function () {
    const HERO_WIDTH = 40;  // hero的宽度
    const HERO_HEIGHT = 40; // hero的高度
    const HERO_SPEED = 10; // hero的移动速度
    const HERO_BLOOD = 200; // 英雄的血量
    const HERO_ATTACK = 50; // 英雄的攻击值
    const MONSTER_WIDTH = 40; // monster的宽度
    const MONSTER_HRIGHT = 40; // monster的高度
    const MONSTER_BLOOD = 200; // monster的血量
    const MONSTER_ATTACK = 10; // monster的攻击值
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
        var hero = new SuperHero(context, heroImg, { x: 20, y: 20 })
        var blackMonster = new SuperMonster(context, monsterImg, { x: 100, y: 100 });
        var redMonster = new RedMonster(context, monsterImg, { x: 200, y: 200 });
        var monsterList = [];

        hero.draw();
        blackMonster.draw();
        redMonster.draw();
        monsterList.push(blackMonster);
        monsterList.push(redMonster);

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

            switch (keyCode) {
                case KEY_LEFT:
                    hero.rect.x -= HERO_SPEED;
                    if (hero.isOverBorder()) {
                        hero.rect.x += HERO_SPEED;
                        console.log('即将越界')
                        return;
                    }
                    if (hero.isCrashMonster(monsterList)) {
                        hero.rect.x += HERO_SPEED;
                        return;
                    }
                    break;
                case KEY_UP:
                    hero.rect.y -= HERO_SPEED;
                    if (hero.isOverBorder()) {
                        hero.rect.y += HERO_SPEED;
                        console.log('即将越界')
                        return;
                    }
                    if (hero.isCrashMonster(monsterList)) {
                        hero.rect.y += HERO_SPEED;
                        return;
                    }
                    break;
                case KEY_RIGHT:
                    hero.rect.x += HERO_SPEED;
                    if (hero.isOverBorder()) {
                        hero.rect.x -= HERO_SPEED;
                        console.log('即将越界')
                        return;
                    }
                    if (hero.isCrashMonster(monsterList)) {
                        hero.rect.x -= HERO_SPEED;
                        return;
                    }
                    break;
                case KEY_DOWN:
                    hero.rect.y += HERO_SPEED;
                    if (hero.isOverBorder()) {
                        hero.rect.y -= HERO_SPEED;
                        console.log('即将越界')
                        return;
                    }
                    if (hero.isCrashMonster(monsterList)) {
                        hero.rect.y -= HERO_SPEED;
                        return;
                    }
                    break;
            }
            // 重绘英雄
            hero.redraw(tempPos);
        }
    }

    var manager = prepare();
    manager.getImgSource(function (context, heroImg, monsterImg) {
        drawImg(context, heroImg, monsterImg)
    });

    /**
     * 原型方法
     */
    function draw() {
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
        let str = "";
        if (this.bloodValue) {
            str = "血量:" + this.bloodValue;
        } else {
            str = "攻击:" + this.attackValue
        }
        this.context.strokeText(str, this.rect.x, this.rect.y - 5);
        this.context.fontSize = "10px";
    }
    function redraw(oldPos) {
        this.context.clearRect(
            oldPos.x,
            oldPos.y,
            oldPos.width,
            oldPos.height
        );
        // 清除文字
        this.context.clearRect(
            oldPos.x - 5,
            oldPos.y - 15,
            40,
            15
        )
        this.draw();
    }
    // 是否越过边界
    function isOverBorder() {
        const maxWidth = 500 - this.rect.width;
        const maxHeight = 300 - this.rect.height;
        if (this.rect.x < 0 || this.rect.y < 0 || this.rect.y > maxHeight || this.rect.x > maxWidth) {
            return true;
        } else {
            return false;
        }
    }
    // 英雄与魔王是否相撞
    function isCrashMonster(monsters) {
        if (!monsters || monsters.length <= 0) {
            return false;
        }
        const hero_left = this.rect.x;
        const hero_top = this.rect.y;
        const hero_right = this.rect.x + this.rect.width;
        const hero_bottom = this.rect.y + this.rect.height;

        let wouldCrash = false;
        for (let i = 0; i < monsters.length; i++) {
            if(monsters[i].bloodValue <= 0) {
                continue;
            }
            let monster_left = monsters[i].rect.x;
            let monster_top = monsters[i].rect.y;
            let monster_right = monsters[i].rect.x + monsters[i].rect.width;
            let monster_bottom = monsters[i].rect.y + monsters[i].rect.height;
            if (hero_bottom <= monster_top || hero_left >= monster_right || hero_top >= monster_bottom || hero_right <= monster_left) {
                wouldCrash = false;
            } else {
                wouldCrash = true;
                this.attack(monsters[i]);
                break;
            }
        }   
        return wouldCrash;
        // const monster_left = monster.rect.x;
        // const monster_top = monster.rect.y;
        // const monster_right = monster.rect.x + monster.rect.width;
        // const monster_bottom = monster.rect.y + monster.rect.height;

        // let wouldCrash = true;
        // if (hero_bottom <= monster_top || hero_left >= monster_right || hero_top >= monster_bottom || hero_right <= monster_left) {
        //     wouldCrash = false;
        // }
        // return wouldCrash;
    }
    // 攻击魔王
    function attackMonster(monster) {
        monster.bloodValue -= this.attackValue;
        monster.context.clearRect(
            monster.rect.x - 5,
            monster.rect.y - 15,
            40,
            15
        )
        monster.context.strokeText("血量:" + monster.bloodValue, monster.rect.x, monster.rect.y - 5);
        monster.context.fontSize = "10px";
        if (monster.bloodValue <= 0) {
            monster.context.clearRect(
                monster.rect.x,
                monster.rect.y,
                monster.rect.width,
                monster.rect.height
            )
        }
    }

    /**
     * 英雄类
     */
    function SuperHero(context, imgUrl, initPos) {
        this.context = context;
        this.img = imgUrl;
        // this.bloodValue = HERO_BLOOD;
        this.attackValue = HERO_ATTACK;
        this.imgPos = {
            x: 0,
            y: 0,
            width: 32,
            height: 32
        };
        this.rect = {
            x: initPos.x,
            y: initPos.y,
            width: HERO_WIDTH,
            height: HERO_HEIGHT
        };
    }
    SuperHero.prototype.draw = draw;
    SuperHero.prototype.redraw = redraw;
    SuperHero.prototype.attack = attackMonster;
    SuperHero.prototype.isOverBorder = isOverBorder;
    SuperHero.prototype.isCrashMonster = isCrashMonster;

    /**
     * 魔王基类(黑色)
     */
    function SuperMonster(context, imgUrl, initPos) {
        this.context = context;
        this.img = imgUrl;
        this.bloodValue = MONSTER_BLOOD;
        // this.attackValue = MONSTER_ATTACK;
        this.imgPos = {
            x: 858,
            y: 529,
            width: 32,
            height: 32
        };
        this.rect = {
            x: initPos.x,
            y: initPos.y,
            width: MONSTER_WIDTH,
            height: MONSTER_HRIGHT
        };
    }
    SuperMonster.prototype.draw = draw;
    SuperMonster.prototype.redraw = redraw;
    SuperMonster.prototype.isOverBorder = isOverBorder;

    /**
     * 红魔王类
     */
    function RedMonster(context, imgUrl, initPos) {
        SuperMonster.call(this, context, imgUrl, initPos);
        this.imgPos = {
            x: 858,
            y: 462,
            width: 32,
            height: 32
        };
    }
    RedMonster.prototype = Object.create(SuperMonster.prototype);
})()