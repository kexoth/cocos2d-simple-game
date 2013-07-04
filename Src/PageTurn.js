var director = cc.Director.getInstance();
var time = 1.5;

var PageTurn = {};

PageTurn.backward = function (next_scene) {
    director.setDepthTest(true);
    return cc.TransitionPageTurn.create(time, next_scene, true);
    director.setDepthTest(false);
};

PageTurn.forward = function (next_scene) {
    director.setDepthTest(true);
    return cc.TransitionPageTurn.create(time, next_scene, false);
    director.setDepthTest(false);
};