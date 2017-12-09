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
    canShow:function(){
        var errormsg = "";
        var pc = cc.find('Company/PersonControl').getComponent('PersonControl');
        if(pc.currentNum_ == 0){
            errormsg = "无可解雇员工";
        }
        return errormsg;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
