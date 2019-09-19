function Body({ x, y }, context, img) {
    this.img = img;
    this.context = context;
    this._moveSpeed = 20;
    this.alive = true;
    this.imgPos = {};
    this.rect = {
        x,
        y,
        width: 40,
        height: 40
    };
}

Body.prototype = {
    drawBlood: function () {
        this.context.font = '12px "微软雅黑"';
        this.context.fillStyle = 'red';
        this.context.fillText('血量:' + this._bloodValue,
            this.rect.x,
            this.rect.y,
            this._moveSpeed * 2, 5);
    },

    draw: function () {
        if (!this.checkAlive()) {
            return;
        }
        this.drawBlood();
        this.context
            .drawImage(
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
    },

    redraw: function ({x, y}) {
        this.context.clearRect(
            x,
            y,
            this.rect.width,
            this.rect.height
        )
        this.context.clearRect(
            x + this.rect.height - this.rect.width,
            y + this.rect.width + this.rect.height / 2,
            this._moveSpeed * 2, 
            5
        )
        this.draw();
    },

    isOverBorder: function ({ x, y }) {
        const maxWidth = 500 - this.rect.width;
        const maxHeight = 500 - this.rect.height;
        if (x < 0 || y < 0 || y > maxHeight || x > maxWidth) {
            return true;
        } else {
            return false;
        }
    },

    checkAlive: function () {
        if (this._bloodValue <= 0) {
            this.alive = false;
        }
        return this.alive;
    },

    getRect: function () {
        return this.rect;
    },

    getAttackValue: function () {
        return this._attackValue;
    },

    attack: function (body) {
        this._bloodValue -= body.getAttackValue() - this._defenseValue;
    },
}

window.Body = Body;