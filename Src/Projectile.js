var Projectile = cc.Sprite.extend({

//    ctor:function(){
//        this._super();
//        cc.associateWithNative(this, cc.Sprite);
//    },

    init:function (type) {

        var bRet = false;

        var texture2D = cc.TextureCache.getInstance().addImage(type.file);

        if (this.initWithTexture(texture2D,type.frame)) {

            this.runAction(cc.RepeatForever.create(cc.RotateBy.create(0.25, 360)));

            bRet = true;
        }
        return bRet;
    },
    collideRect : function() {
//        var a = this.getContentSize();
//        var p = this.getPosition();
//        return cc.rect(p.x - a.width / 2, p.y - a.height / 2, a.width, a.height);
        var box = this.getBoundingBox();
//        cc.log("BOX: " + JSON.stringify(box));
        return cc.rect(box.x, box.y, box.width * 0.75 , box.width * 0.75);
    }
});

Projectile.TypeEnum = Object.freeze({
    SHURIKEN: {file: s_projectile, frame:cc.rect(0,0,20,20)},
    RAINBOW_BALL: {file: s_rainbowball, frame:cc.rect(0,0,20,20)}
});

Projectile.create = function (type) {
    var projectile = new Projectile();

    if (projectile && projectile.init(type)) return projectile;

    return null;
};