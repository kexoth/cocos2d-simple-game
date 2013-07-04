var dirArt = "Art/";
var dirSounds = "Sounds/";

var s_player = dirArt + "running.png";
var s_player_plist = dirArt + "running.plist";
var s_monster1 = dirArt + "ant.png";
var s_monster2 = dirArt + "phoenix.png";
var s_monster3 = dirArt + "cobra.png";
var s_monster4 = dirArt + "dragon.png";
var s_projectile = dirArt + "projectile.png";
var s_rainbowball = dirArt + "rainbow_ball.png";
var s_background = dirArt + "background.png";
var s_play = dirArt + "play.png";
var s_pause = dirArt + "pause.png";
var s_burst = dirArt + "burst.png";
var s_burstPlist = dirArt + "burst.plist";
var s_explosion = dirArt + "explosion.png";
var s_explosionPlist = dirArt + "explosion.plist";
 
var g_ressources = [
    {type:"image", src:s_monster1},
    {type:"image", src:s_monster2},
    {type:"image", src:s_monster3},
    {type:"image", src:s_monster4},
    {type:"image", src:s_projectile},
    {type:"image", src:s_rainbowball},
    {type:"image", src:s_player},
    {type:"plist", src:s_player_plist},
    {type:"image", src:s_background},
    {type:"image", src:s_play},
    {type:"image", src:s_pause},
    {type:"image", src:s_burst},
    {type:"plist", src:s_burstPlist},
    {type:"image", src:s_explosion},
    {type:"plist", src:s_explosionPlist}
];

var s_bgMusic = dirSounds + "background-music.mp3";
var s_bgMusicOgg = dirSounds + "background-music.ogg";
var s_bgMusicCaf = dirSounds + "background-music.caf";
 
var s_shootEffect = dirSounds + "pew-pew-lei.mp3";
var s_shootEffectOgg = dirSounds + "pew-pew-lei.ogg";
var s_shootEffectWav = dirSounds + "pew-pew-lei.wav";