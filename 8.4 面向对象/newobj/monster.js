var Body = window.Body;

function Monster({ x, y }, context, img) {
    Body.call(this, { x, y }, context, img);
    this.imgPos = {
        x: 858,
        y: 529,
        width: 32,
        height: 32
    };
    this.attackAble = true;
    this._bloodValue = 1000;
    this._attackValue = 170;
    this._defenseValue = 40;
}

Monster.prototype = Object.create(Body.prototype);

window.Monster = Monster;