cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {

    },

    onEnable:function(){
        var game = cc.find("Event/Game").getComponent('Game');
        game.resume();
        console.log("resume");
    },

    onDisable:function(){
        var game = cc.find("Event/Game").getComponent('Game');
        game.pause();
        console.log("pause");
    },

    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
