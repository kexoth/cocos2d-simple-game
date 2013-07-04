// Defining
var GameManager = function () {

this.delegate = null;
 };



GameManager.prototype.doSomething = function () {

if(this.delegate) this.doSomethingDelegate();
 };
 

// Initializing
var g = new GameManager();

g.delegate = this;
 XXXLayer.prototype.doSomethingDelegate = function () {}