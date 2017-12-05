var Project = require("Project");
cc.Class({
    extends: Project,

    properties: {
        deadline_:0,
        index_:0,
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

    isOverdue:function(){
        if(this.getPeriod()>deadline_){
            return true;
        }
        return false;
    },

    setDeadline:function(deadline){
        this.deadline_=deadline;
    },

    getDeadline:function(){
        return this.deadline_;
    },

    setIndex:function(index){
        this.deadline_=deadline;
    },

    getIndex:function(){
        return this.index_
    },

    init:function(project){
        this.content_=project.content; 
        this.reward_=project.reward; 
        this.deadline_=project.deadline; 
        this.category_=project.category; 
        this.name_=project.name; 
        this.requireUi_=project.requireUi; 
        this.requireFunc_=project.requireFunc; 
        this.level_=project.level; 
        this.index_ = project.index;
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
