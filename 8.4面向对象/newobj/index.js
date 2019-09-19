(function () {
    var prepare = window.prepare;
    var Hero = window.Hero;
    var Wizard = window.Wizard;
    var Monster = window.Monster;

    function gameLogic({ context, heroImg, monsterImg }) {
        var hero = new Hero({ x: 20, y: 20 }, context, heroImg);
        var monster = new Monster({ x: 100, y: 100 }, context, monsterImg);
        var wizard = new Wizard({ x: 190, y: 190 }, context, monsterImg);
        var monsterList = [];
        monsterList.push(monster);
        monsterList.push(wizard);
        hero.draw();
        monster.draw();
        wizard.draw();

        document.onkeydown = function(event) {
            var keyMap = {
                40: {x: 0, y: 1},
                38: {x: 0, y: -1},
                39: {x: 1, y: 0},
                37: {x: -1, y: 0}
            };
            if (keyMap[event.keyCode]) {
                hero.walk(keyMap[event.keyCode], monsterList);
            }
        }
    }
    
    prepare()
        .then(gameLogic);
})()