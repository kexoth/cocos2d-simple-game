
var Enemy = cc.Sprite.extend({
    _hp:null,
    _speed:null,

//    ctor:function(){
//        this._super();
//        cc.associateWithNative(this, cc.Sprite);
//    },

    init:function (type) {

        var bRet = false;

        var texture2D = cc.TextureCache.getInstance().addImage(type.file);

        if (this.initWithTexture(texture2D,type.frame)) {
//            cc.log("this" + JSON.stringify(this));
            this._hp = type.hp;
            this._speed = type.speed;
            bRet = true;
        }
        return bRet;
    },
    decreaseHP:function () {

        this._hp--;

//        cc.log("HP: " + this._hp);

        var isDead;
        if (this._hp == 0)
            isDead = true;
        else
            isDead = false;

        switch(this._hp)
        {
            case 1:
                this.setColor(cc.c3b(128,0,0));
                break;
            case 2:
                this.setColor(cc.c3b(128,0,128));
                break;
            case 3:
                this.setColor(cc.c3b(0,0,128));
                break;
            case 4:
                this.setColor(cc.c3b(0,128,0));
                break;
            default:
                break
        }

        return isDead;
    },
    getEnemySpeed:function () {
        return this._speed;
    },
    collideRect : function () {
//        var a = this.getContentSize();
//        var p = this.getPosition();
//        return cc.rect(p.x - a.width / 2, p.y - a.height / 2, a.width, a.height);
        var box = this.getBoundingBox();
        return cc.rect(box.x, box.y, box.width * 0.75, box.width * 0.75);
    }/*,
    evolveWeight: function () {
        var step = 0.0001;

        var index_to_decrease = Enemy.TypeWeight.indexOf(getBiasedRandomItem(Enemy.TypeWeight, Enemy.TypeWeight));
        var min = Math.min.apply(Math, Enemy.TypeWeight);
        var index_to_increase = Enemy.TypeWeight.indexOf(min);

        Enemy.TypeWeight[index_to_increase] += step;
        Enemy.TypeWeight[index_to_decrease] -= step;
        cc.log("Weight: " + Enemy.TypeWeight);
    }*/
});

Enemy.TypeEnum = Object.freeze({
    ANT: {file: s_monster1, speed: 7, hp: 1, frame:cc.rect(0,0,80,40)},
    PHOENIX: {file: s_monster2, speed: 10, hp: 2, frame:cc.rect(0,0,60,45)},
    COBRA: {file: s_monster3, speed: 7, hp: 2, frame:cc.rect(0,0,60,63)},
    DRAGON: {file: s_monster4, speed: 10, hp: 5, frame:cc.rect(0,0,75,33)}
});

Enemy.WeightPerLevel = Object.freeze([
    [1.00, 0.00, 0.00, 0.00],
    [0.75, 0.20, 0.05, 0.00],
    [0.50, 0.30, 0.15, 0.05],
    [0.40, 0.40, 0.15, 0.05],
    [0.25, 0.50, 0.20, 0.05],
    [0.25, 0.30, 0.30, 0.10],
    [0.20, 0.20, 0.50, 0.10],
    [0.20, 0.20, 0.30, 0.30],
    [0.10, 0.10, 0.40, 0.40]
]);

Enemy.getEnemyTypeForLevel = function (level) {
    var types = [];

    for (var typeKey in Enemy.TypeEnum) {
        types.push(typeKey);
    }
    var typeKey = null;
    if (Enemy.WeightPerLevel.length > level ) {

        typeKey = getBiasedRandomItem(types, Enemy.WeightPerLevel[level]);
    }
    else {
        typeKey = getBiasedRandomItem(types, Enemy.WeightPerLevel[Enemy.WeightPerLevel.length - 1]);
    }

    var type = Enemy.TypeEnum[typeKey];

    return type;
};

Enemy.create = function (level) {

    var type = Enemy.getEnemyTypeForLevel(level);

    cc.log("type:" +  JSON.stringify(type));
    var enemy = new Enemy();

    if (enemy && enemy.init(type)) return enemy;

    return null;
};