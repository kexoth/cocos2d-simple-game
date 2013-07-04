var GameOver = cc.LayerColor.extend({

    _points: null,

    ctor:function (points) {
       this._super();
       this._points = points;
    },
//    ctor:function () {
//        this._super();
////        cc.associateWithNative(this, cc.Layer);
//    },

    onEnter:function () {
        
        this._super();
        
        if( 'touches' in sys.capabilities ) {
		    this.setTouchEnabled(true);
		}
		if( 'mouse' in sys.capabilities ) {
		    this.setMouseEnabled(true);
		}
        
        var director = cc.Director.getInstance();
        var winSize = director.getWinSize();
        var centerPos = cc.p(winSize.width/2, winSize.height/2);
        
        var message;
        if (!this._points) {
            message = "Kex's Simple Game";
        }
        else {
            message = "YOU DEAD!! \n\n" + this._points + " points";
        }
        
        var label = cc.LabelTTF.create(message, 'Papyrus', 48);
        label.setColor(cc.c3b(255, 64, 64));
        label.setPosition(centerPos);
        this.addChild(label);
        
        var label = cc.LabelTTF.create("tap anywhere to play", 'Papyrus', 24);
        label.setColor(cc.c3b(128, 32, 32));
        var position = cc.p(centerPos.x, 24);
        label.setPosition(position);
        this.addChild(label);
        
/*        
        this.runAction(cc.Sequence.create(
            cc.DelayTime.create(3),
            cc.CallFunc.create(function (node) {
                var scene = MainLayer.scene();
                cc.Director.getInstance().replaceScene(scene);
            }, this)
        ));
*/ 
    },
    
	newGame:function () {
	    var newgame_scene = new MainLayer.scene();
        var transition_scene = new PageTurn.forward(newgame_scene);
        cc.Director.getInstance().replaceScene(transition_scene);
    },
	
	onMouseUp:function (event) {
		this.newGame();
		return true;
	},
	onTouchesEnded:function (touches, event) {
		if (touches.length <= 0) return;
		this.newGame();
	}
    
});

GameOver.create = function (points) {
    var gameOver = new GameOver(points);

    if (gameOver && gameOver.init(cc.c3b(0, 0, 0))) {
        return gameOver;
    }
    return null;
}

GameOver.scene = function (points) {
    var scene = cc.Scene.create();
    var layer = GameOver.create(points);
    scene.addChild(layer);
    return scene;  
};