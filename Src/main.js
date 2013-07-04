var cocos2dApp = cc.Application.extend({

	config:document['ccConfig'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },

    applicationDidFinishLaunching:function () {
        var director = cc.Director.getInstance();
        director.setDisplayStats(this.config['showFPS']);
        director.setAnimationInterval(1.0 / this.config['frameRate']);
        // 1

        winSize = director.getWinSize();
        centerPos = cc.p( winSize.width/2, winSize.height/2 );

        cc.log("loading started");

        cc.LoaderScene.preload(g_ressources, function(){
            cc.log("loading finished!");
            director.replaceScene(new this.startScene);
        }, this);
//        director.runWithScene(loader_scene);

        return true;
    }
});

// 2
var director;
var winSize;
var centerPos;
var myApp = new cocos2dApp(GameOver.scene);