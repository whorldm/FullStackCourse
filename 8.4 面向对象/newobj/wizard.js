var Body = window.Body;

function Wizard({ x, y }, context, img) {
    Body.call(this, { x, y }, context, img);
    this.imgPos = {
        x: 858,
        y: 462,
        width: 32,
        height: 32
    };
    this.attackAble = true;
    this._bloodValue = 1000;
    this._attackValue = 170;
    this._defenseValue = 40;
}

Wizard.prototype = Object.create(Body.prototype);

window.Wizard = Wizard;