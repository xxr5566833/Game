cc.Class({
    extends: cc.Component,

    properties: {
        initDay_:0,
        totalPeopleNum_:1000.,
        A_:0.1,
        currentPeopleNum_:100.,
        a_:0.1,

    },

    

    Update:function(){
        this.totalPeopleNum_=Math.ceil(this.totalPeopleNum_*(1+0.01*this.A_));
        var temp=(1 + 0.01 * this.a_)*this.currentPeopleNum_;
        if(temp>this.totalPeopleNum_){
            this.currentPeopleNum_=temp;
        }
        else{
            this.currentPeopleNum_=this.totalPeopleNum_;
        }
    },

    getCurrentPeople:function(project){
        var m=project.getM();
        //var m0=1000*Math.sqrt(this.getTimeFromInit());
        var result = this.totalPeopleNum_*m/(m+this.currentPeopleNum_);
        cc.log(result+"**********秒销量**********")
        return result;
    },

    getTimeFromInit:function(){
        var event=new cc.Event.EventCustom('GETDATE', true);
        this.node.dispatchEvent(event);
        return event.back-this.initDay_;
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
        this.initDay_=0
        this.totalPeopleNum_=1000.
        this.A_=0.1
        this.currentPeopleNum_=0
        this.a_=0.1
    }

    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {

    //},
});
