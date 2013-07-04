GameManager.getInstance = function () {

if (!this._sharedGame) {

this._sharedGame = new GameManager();

if (this._sharedGame.init()) return this._sharedGame;

} else {

return this._sharedGame;
 }

return null;
 };

GameManager._sharedGame = null;