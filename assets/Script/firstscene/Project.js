var projectstate=require('global').projectState;
cc.Class({
    extends: cc.Component,

    properties: {
        //cocos creator对于自己定义的复杂类型不支持，所以这里分开写了
        requireUi_:{
            visible:false,
            default:0,
        },
        requireFunc_:{
            visible:false,
            default:0,
        },

        currentUi_:{
            visible:false,
            default:0,
        },
        currentFunc_:{
            visible:false,
            default:0,
        },

        state_:projectstate.received,
        category_:"",
        reward_:0,
        deadline_:0,
        company_:{
            default:null,
            type:cc.Node,
        },
        receiveDay_:0,
        finishDay_:0,
        content_:"",
        
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
    augment:function(attribute,increment){
        console.log(attribute+"增加了1");
        switch(attribute){
            case 'ui':
            this.currentUi_+=increment;
            break;
            case 'func':
            this.currentFunc_+=increment;
            break;
            default:
            throw "error attribute" + attribute;
            break;
        }
        console.log("现在属性");
        console.log(this.currentUi_);
        console.log(this.currentFunc_);
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    isFinished: function() {
        return this.requireUi_<=this.currentUi_
        &&this.requireFunc_<=this.currentFunc_;
    },
    isOverdue: function() {
        var date=cc.find('Date').getComponent('Date');
        var currentday=date.getDate();
        return currentday>(this.receiveDay_+this.deadline_);
    },
    setRequire:function(require){
        this.requireUi_=require.ui;
        this.requireFunc_=require.func;
    },
    getRequire:function(){
        var require=new Object();
        require.func=this.requireFunc_;
        require.ui=this.requireUi_;
        return require;
    },
    getCurrent:function(){
        var current=new Object();
        current.func=this.currentFunc_;
        current.ui=this.currentUi_;
        return current;      
    },
    setState:function(state){
        this.state_=state;
    },
    getState:function(){
        return this.state_;
    },
    setCategory:function(type){
        this.category_=type;
    },
    getCategory:function(){
        return this.category_;
    },
    setReward:function(reward){
        this.reward_=reward;
    },
    getReward:function(){
        return this.reward_;
    },
    setDeadline:function(deadline){
        this.deadline_=deadline;
    },
    getDeadline:function(){
        return this.deadline_;
    },
    setReceiveDay:function(receiveday){
        this.receiveDay_=receiveday;
    },
    getReceiveDay:function(){
        return this.receiveDay_;
    },
    setFinishDay:function(finishDay){
        this.finishDay_=finishDay;
    },
    getFinishDay:function(){
        return this.finishDay_;
    },
    setContent:function(content){
        this.content_=content;
    },
    getContent:function(content){
        return this.content_;
    },
    /*调试用的init函数，便于初始化一个project */
    init:function(project){
        this.setCategory(project.category);
        this.setRequire(project.require);
        this.setDeadline(project.deadline);
        this.setReward(project.reward);
        this.setContent(project.content);
        this.state_=projectstate.notReceived;
        console.log('任务产生完毕！');
    },
    // },
});
