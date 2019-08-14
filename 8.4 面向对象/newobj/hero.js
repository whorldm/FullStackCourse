var Body = window.Body;

function Hero({ x, y }, context, img) {
    Body.call(this, { x, y }, context, img);
    this.imgPos = {
        x: 0,
        y: 0,
        width: 32,
        height: 32
    };
    this._bloodValue = 500;
    this._attackValue = 70;
    this._defenseValue = 40;
}

Hero.prototype = Object.create(Body.prototype);

Hero.prototype.desire = function ({ x, y }) {
    return {
        x: this.rect.x + x * this._moveSpeed,
        y: this.rect.y + y * this._moveSpeed,
    };
};

Hero.prototype.walk = function (step, list) {
    var oldPos = {
        x: this.rect.x,
        y: this.rect.y
    }
    var newPos = this.desire(step);
    if (this.isOverBorder(newPos)) {
        return;
    }
    if(this.isCrashMonster(newPos, list)) {
        return;
    }
    Object.assign(this.rect, newPos);
    this.redraw(oldPos);
}

Hero.prototype.isCrashMonster = function ({ x, y }, monsters) {
    if (!monsters || monsters.length <= 0) {
        return false;
    }
    const hero_left = x;
    const hero_top = y;
    const hero_right = x + this.rect.width;
    const hero_bottom = y + this.rect.height;

    let wouldCrash = false;
    for (let i = 0; i < monsters.length; i++) {
        if (monsters[i]._bloodValue <= 0) {
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
}

window.Hero = Hero;