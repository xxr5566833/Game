cc.Class({
    extends: cc.Component,

    properties: {
        projects_:[cc.Prefab],

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
    createProject:function(){

    },
    reward:function(){
        return 100;
    },
    update:function(){
        var date=cc.find('Date').getComponent('Date');
        console.log('in projectGenerator'+date.timer_);
    }
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
