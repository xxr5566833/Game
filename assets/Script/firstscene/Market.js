cc.Class({
    extends: cc.Component,

    properties: {
        initDay_:0,
        totalPeopleNum_:0.,
        A_:0.,
        currentPeopleNum_:0.,
        a_:0.,

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

    Update:function(){
        this.totalPeopleNum_=this.totalPeopleNum_*(1+0.01*this.A_);
        var temp=(1+0.01*this.A_)*this.currentPeopleNum_;
        if(temp>this.totalPeopleNum_){
            this.currentPeopleNum_=temp;
        }
        else{
            this.currentPeopleNum_=this.totalPeopleNum_;
        }
    },

    getCurrentPeople:function(project){
        if(this.currentPeopleNum_==0){
            var m=project.getM();
            var m0=1000*Math.sqrt(this.getTimeFromInit());
            return m/(m+m0)*this.currentPeopleNum_;
        }
        else{
            var temp=(1+0.01*this.A_)*this.currentPeopleNum_;
            if(temp>this.totalPeopleNum_){
                this.currentPeopleNum_=temp;
            }
            else{
                this.currentPeopleNum_=this.totalPeopleNum_;
            }
        }
    },

    getTimeFromInit:function(){
        event=new cc.Event.EventCustom('GETDATE', true);
        this.node.dispatchEvent(event);
        return event.detail.back-this.initDay_;
    },

    init:function(){
        
    },
    
    pause:function(){
        this.unschedule(this.Update);
    },

    resume:function(time){
        this.schedule(this.Update,time);
    },
    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {

    //},
});
