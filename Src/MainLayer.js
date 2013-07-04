
var audioEngine = cc.AudioEngine.getInstance();

var MainLayer = cc.LayerColor.extend({

    _player: null,
	_enemies: [],
	_projectiles: [],
	_enemiesDestroyed: 0,
    _timer: 0,
    _pauseButton: null,
    _gamePoints: null,

//	ctor:function(){
//		this._super();
//		cc.associateWithNative(this, cc.LayerColor);
////        this.init(cc.c4b(0, 125, 0, 255), winSize.width, winSize.height);
//	},

    onEnter:function () {
        this._super();
        if( 'touches' in sys.capabilities ) {
            this.setTouchEnabled(true);
        }
        if( 'mouse' in sys.capabilities ) {
            this.setMouseEnabled(true);
        }

        var first_position = cc.p(winSize.width/2, winSize.height/2);
        var end_position = cc.p(-winSize.width/2, winSize.height/2);
        var start_position = cc.p(1.5 * winSize.width, winSize.height/2);

        var background1 = cc.Sprite.create(s_background);
        background1.setScaleX(winSize.width / background1.getContentSize().width);
        background1.setScaleY(winSize.height / background1.getContentSize().height);

        background1.setPosition(first_position);
        this.addChild(background1);

        var background2 = cc.Sprite.create(s_background);
        background2.setScaleX(winSize.width / background2.getContentSize().width);
        background2.setScaleY(winSize.height / background2.getContentSize().height);

//        background2.setContentSize(cc.size(winSize.width * 2, winSize.height * 2));
        background2.setPosition(start_position);
        this.addChild(background2);

//        cc.log("Background Box Initial | X:" + background.getBoundingBox().origin.x + " Y:" + background.getBoundingBox().origin.y  + " WIDTH:" + background.getBoundingBox().size.width + " HEIGHT:" + background.getBoundingBox().size.height);

        var firstMove = cc.MoveTo.create(10, end_position);
        var firstMoveDone = cc.CallFunc.create(function (node) {
            var actionMove1 = cc.MoveTo.create(20, end_position);
            var actionMoveDone1 = cc.CallFunc.create(function (node) {
                background1.setPosition(start_position);
            }, this);
            var sequence1 = cc.Sequence.create(actionMove1, actionMoveDone1);
            var repeatForever1 = cc.RepeatForever.create(sequence1);
            background1.setPosition(start_position);
            background1.runAction(repeatForever1);
        }, this);
        var firstSequence = cc.Sequence.create(firstMove, firstMoveDone);

        var actionMove2 = cc.MoveTo.create(20, end_position);
        var actionMoveDone2 = cc.CallFunc.create(function (node) {
            background2.setPosition(start_position);
        }, this);
        var sequence2 = cc.Sequence.create(actionMove2, actionMoveDone2);
        var repeatForever2 = cc.RepeatForever.create(sequence2);

        background1.runAction(firstSequence);
        background2.runAction(repeatForever2);

        this.addPauseButton();

        this._player = this.effect(cc.p(100, winSize.height/2), s_player, s_player_plist, 10, "running", true);
        this._player.setPosition(this._player.getContentSize().width/2, winSize.height/2);
//		this.addChild(this._player);
    },

	onEnterTransitionDidFinish:function(){
		this._super();

        this._gamePoints = cc.LabelTTF.create('0000', 'Chalkduster', 24);
        this._gamePoints.setColor(cc.c3b(32, 32, 128));
        this._gamePoints.setContentSize(cc.size(100, 30));
        this._gamePoints.setPosition(cc.p(winSize.width - 100, winSize.height - 30));
        this._gamePoints.setHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.addChild(this._gamePoints);

//        cc.log("Player Box | X:" + player.getBoundingBox().origin.x + " Y:" + player.getBoundingBox().origin.y + " WIDTH:" + player.getBoundingBox().size.width + " HEIGHT:" + player.getBoundingBox().size.height);
        cc.log("KXLogZ");


        this.schedule(this.gameLogic, 1.0);
		this.scheduleUpdate();
	    audioEngine.playMusic(s_bgMusic, true);
//		audioEngine.playEffect(s_shootEffect);
		audioEngine.setEffectsVolume(0.2);
//		cc.log("FX Volume: " + audioEngine.getEffectsVolume());
	},

    onExit:function () {
        this._super();

        while (this._enemies.length > 0) {
//             cc.ArrayRemoveObjectAtIndex(this._enemies, this._enemies.length - 1);
            var to_delete = this._enemies.pop();
            to_delete.removeFromParent(true);
        }
        while (this._projectiles.length > 0) {
//            cc.ArrayRemoveObjectAtIndex(this._projectiles, this._projectiles.length - 1);
            var to_delete = this._projectiles.pop();
            to_delete.removeFromParent(true);
        }
        this._timer = 0;
        this._enemiesDestroyed = 0;
        this._gamePoints.setString('0');
    },
	addEnemy:function (level) {
//		var rangeMin = 1;
//		var rangeMax = 4;
//		cc.log("Monster with index:" + monsterType);
		// var s_monster = g_ressources[]; //eval("s_monster" + randomMonsterIndex);
/*
 		var monsterType = Math.floor(Math.random() * (rangeMax - 1 + rangeMin)) + rangeMin;
		var monsterName = eval("s_monster" + monsterType);
		var enemy = cc.Sprite.create(monsterName);

		enemy.type = monsterType;
*/
        var enemy = Enemy.create(level);

		// switch(randomMonsterIndex)
		// 		{
		// 		case 1:
		// 		 	enemy = cc.Sprite.create(s_monster1);
		// 		 	break;
		// 		case 2:
		// 		 	enemy = cc.Sprite.create(s_monster2);
		// 		 	break;
		// 		case 3:
		// 		 	enemy = cc.Sprite.create(s_monster3);
		// 		 	break;
		// 		case 4:
		// 		 	enemy = cc.Sprite.create(s_monster4);
		// 			break;
		// 		default:
		// 			enemy = cc.Sprite.create(s_monster1);
		// 		}
		
		var minY = enemy.getContentSize().height / 2;
		var maxY = winSize.height - enemy.getContentSize().height / 2 ;
		var rangeY = maxY - minY;
		var actualY = (Math.random() * rangeY) + minY;
		
		enemy.setPosition(winSize.width + enemy.getContentSize().width / 2, actualY);
		
//        cc.log("Start Enemy Position x:" + enemy.getPosition().x + " y:" + enemy.getPosition().y);

		this.addChild(enemy);
		
		var minDuration = enemy.getEnemySpeed();
		var rangeDuration = 2;
		var actualDuration = (Math.random() * rangeDuration) + minDuration;
//        cc.log("Enemy Move Duration: " + actualDuration + "| Enemy Speed:" + enemy.getEnemySpeed());
		
		var actionMove = cc.MoveTo.create(actualDuration, cc.p(-enemy.getContentSize().width/2, actualY));
		var actionMoveDone = cc.CallFunc.create(function (node) {
			cc.ArrayRemoveObject(this._enemies, node);
            cc.log("remove enemy from screen");
			node.removeFromParent(true);
			
			var gameover_scene = new GameOver.scene(this._enemiesDestroyed);
            var transition_scene = new PageTurn.backward(gameover_scene)
            cc.Director.getInstance().setDepthTest(true);
            cc.Director.getInstance().replaceScene(transition_scene);
            cc.Director.getInstance().setDepthTest(false);
//            cc.log("Enemy Reached End \n Enemy Position x:" + node.getPosition().x + " y:" + node.getPosition().y);
			
		}, this);
		var sequence = cc.Sequence.create(actionMove, actionMoveDone);

		enemy.runAction(sequence);
		
		enemy.setTag(1);
		this._enemies.push(enemy);
	},
	gameLogic:function (dt) {
        var level = Math.floor(this._timer / 30);
        cc.log("timer: " + this._timer  + "level: " + level);
        for(var i = 0; i <= (level / 5); i++) {
            this.addEnemy(level);
        }
        this._timer++;
    },
	locationTapped: function (location) {

        var pauseButtonRect = this._pauseButton.getBoundingBox();

        if (cc.rectContainsPoint(pauseButtonRect, location)){

            if (cc.Director.getInstance().isPaused()){
                this.resumeGame();
            }
            else {
                this.pauseGame();
            }
        }
        else {

            if (cc.Director.getInstance().isPaused())
                return;

            var projectile = Projectile.create(Projectile.TypeEnum.RAINBOW_BALL);
            var playerContentSize = this._player.getContentSize();
            var playerPosition = this._player.getPosition();
            projectile.setPosition(playerPosition.x + (playerContentSize.width/2), playerPosition.y + (playerContentSize.height/8));

            var offset = cc.pSub(location, projectile.getPosition());

            if (offset.x <= 0)	return;

            this.addChild(projectile);
            audioEngine.setEffectsVolume(0.2);
            audioEngine.playEffect(s_shootEffect);

            var realX = winSize.width + (projectile.getContentSize().width / 2);
            var ratio = offset.y / offset.x;
            var realY = (ratio * realX) + projectile.getPosition().y;
            var realDest = cc.p(realX, realY);

            var offset = cc.pSub(realDest, projectile.getPosition());
            var length = cc.pLength(offset);
            var velocity = 480.0;
            var realMoveDuration = length / velocity;

            var move_to = cc.MoveTo.create(realMoveDuration, realDest);
            var callback = cc.CallFunc.create(function (node) {
                cc.ArrayRemoveObject(this._projectiles, node);
                cc.log("remove projectile from screen");
                node.removeFromParent(true);
            }, this);
            var sequence = cc.Sequence.create(move_to,callback);

            projectile.runAction(sequence);

            projectile.setTag(2);
            this._projectiles.push(projectile);
        }
	},
	onMouseUp:function (event) {
		var location = event.getLocation();
		this.locationTapped(location);
	},
	onTouchesEnded:function (touches, event) {
		if (touches.length <= 0) return;
		
		var touch = touches[0];
		var location = touch.getLocation();
		this.locationTapped(location);
	},
	update:function (dt) {
		for (var i = 0; i < this._projectiles.length; i++){
			var projectile = this._projectiles[i];
			var projectileRect = projectile.collideRect();
			
			for (var j = 0; j < this._enemies.length; j++ ){
				var enemy = this._enemies[j];
				var enemyRect = enemy.collideRect();
				if (cc.rectIntersectsRect(projectileRect, enemyRect)) {
                    cc.ArrayRemoveObject(this._projectiles, projectile);
                    cc.log("remove projectile");
                    projectile.removeFromParent(false);

                    var burst_rect = cc.rectIntersection(projectileRect, enemyRect);
                    var burst_point = cc.p(burst_rect.x + (burst_rect.width / 2), burst_rect.y + (burst_rect.height / 2));
                    this.effect(burst_point, s_burst, s_burstPlist, 8, "burst", false);

                    if (enemy.decreaseHP()) {
                        this.effect(enemy.getPosition(), s_explosion, s_explosionPlist, 12, "explosion", false);
                        cc.ArrayRemoveObject(this._enemies, enemy);
                        cc.log("remove enemy");
                        enemy.removeFromParent(true);
                        this._enemiesDestroyed++;
                    }
				}
			}
		}
        this._gamePoints.setString("live:" + this._enemies.length  + "kills:" + this._enemiesDestroyed);
    },
    addPauseButton:function () {
        this.resumeGame();
    },
    pauseGame:function () {
        if (this._pauseButton){
            this._pauseButton.removeFromParent(true);
        }
        this._pauseButton = cc.Sprite.create(s_play);
        this._pauseButton.setPosition(cc.p(50,winSize.height - 50));
        this.addChild(this._pauseButton);
        cc.Director.getInstance().pause();
        for (var i = 0; i < this._enemies.length; i++) {
            this._enemies[i].setVisible(false);
        }
        for (var i = 0; i < this._projectiles.length; i++) {
            this._projectiles[i].setVisible(false);
        }
    },
    resumeGame:function () {
        if (this._pauseButton){
            this._pauseButton.removeFromParent(true);
        }
        this._pauseButton = cc.Sprite.create(s_pause);
        this._pauseButton.setPosition(cc.p(50,winSize.height - 50));
        this.addChild(this._pauseButton);
        cc.Director.getInstance().resume();
        for (var i = 0; i < this._enemies.length; i++) {
            this._enemies[i].setVisible(true);
        }
        for (var i = 0; i < this._projectiles.length; i++) {
            this._projectiles[i].setVisible(true);
        }
    },
    effect: function (location, img_name, plist_name, frames_count, img_prefix, repeat_forever) {
        var spriteFrameCache = cc.SpriteFrameCache.getInstance();
        var animationCache = cc.AnimationCache.getInstance();

        var animation = animationCache.getAnimation(img_prefix);


        if (!animation) {
            spriteFrameCache.addSpriteFrames(plist_name, img_name);
//        var spriteBatchNode = cc.SpriteBatchNode.create(img_name, 8);
//        this.addChild(spriteBatchNode);

            var animation_frames = [];

            for (var i = 1; i < frames_count; i++) {
                var sprite_frame = spriteFrameCache.getSpriteFrame(img_prefix + i + ".png");
                animation_frames.push(sprite_frame);
            }

            animation = cc.Animation.create(animation_frames, 0.1);//0.025);
            animationCache.addAnimation(animation, img_prefix);
        }

        var animate = cc.Animate.create(animation);

        var sprite = cc.Sprite.createWithSpriteFrameName(img_prefix + "0.png");
        cc.log("location:" + JSON.stringify(location));
        sprite.setPosition(location);
        this.addChild(sprite);

        if (repeat_forever) {
            repeatForever = cc.RepeatForever.create(animate);
            sprite.runAction(repeatForever);
        }
        else {
            var callback = cc.CallFunc.create(function (node) {
                node.removeFromParent(false);
            }, this);

            var sequence = cc.Sequence.create(animate, callback);
            sprite.runAction(sequence);
        }

        return sprite;
    }
});

MainLayer.create = function () {
    cc.log("KXLog: Create called");
	var sg = new MainLayer();
	if (sg && sg.init(cc.c4b(255,255,255,255))) {
        cc.log("KXLog: Layer created!");
		return sg;
	}
	return null;
};

MainLayer.scene = function () {
	var scene = cc.Scene.create();
	var layer = MainLayer.create();
	scene.addChild(layer);
	return scene;
};