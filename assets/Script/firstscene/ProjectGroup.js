var eState = cc.Enum({ develop :0, test : 1, operative : 2,});
var eIncomeWay = cc.Enum({ oneoff : 0, period : 1, });
cc.Class({
    extends: cc.Component,

    properties: {
        node:{
            default:null,
            override:true,
            type:cc.Node
        },
        persons_:{   
            default:[],
            type:[cc.Prefab]
        },
        maintainers_:{   
            default:[],
            type:[cc.Prefab]
        },
        project_:{   
            default:null,
            type:cc.Prefab
        },
        state_:{   
            default:0,
            type:eState
        },
        incomeWay_:{   
            default:0,
            type:eIncomeWay
        },
        usernum_:{   
            default:0,
            type:cc.Integer,
        },
        testCount_:0.,

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


    begin:function(project,persons){
        this.project_=project;
        for(let i=0;i<persons.length;i++){
            this.persons_[i]=persons[i];
            this.persons_[i].begin();
        }
        this.state_=develop;
    },

    stop:function(){
        for(let i=0;i<this.persons_.length;i++){
            this.persons_[i].stop();
        }
    },

    chance:function(probability)
    {
        var temp = Math.random();
        return temp <= probability;
    },

    generateBugLevel:function(){
        var temp = Math.random();
        if(temp > 0.5)
        {
            return 2;
        }
        else if(temp <= 0.5 && temp >0.2)
        {
            return 1;
        }
        else{
            return 0;
        }
    },

    generateBurstBugLevel:function(){
        var temp = Math.random();
        if(temp > 0.9)
        {
            return 2;
        }
        else if(temp <= 0.9 && temp >0.6)
        {
            return 1;
        }
        else{
            return 0;
        }
    },

    work:function(){
        switch(this.state_){
            case 0:
                var n=this.persons_.length;
                var manager=0;
                var maxmanager=0;
                for(let i=0;i<this.persons_.length;i++){
                    manager=this.persons_[i].manager_;
                    if(maxmanager<manager){
                        maxmanager=manager;
                    }
                }
                manager=maxmanager;
                for(let i=0;i<this.persons_.length;i++){
                    this.persons_[i].develop(manager,n,this.project_, true);
                }
                break;
            case 1:
                var n=this.persons_.length;
                var manager=0;
                var maxmanager=0;
                for(let i=0;i<this.persons_.length;i++){
                    manager=this.persons_[i].manager_;
                    if(maxmanager<manager){
                        maxmanager=manager;
                    }
                }
                manager=maxmanager;
                var sumF = 0.;
                for(let i=0;i<this.persons_.length;i++){
                    sumF += this.persons_[i].develop(manager,n,this.project_, false);
                }
                this.testCount_ += sumF;
                if(this.testCount_ >= 3)
                {
                    var num = this.testCount_ / 3;
                    this.testCount_ -= 3 * (this.testCount_ / 3);
                    for(let i = 0 ; i < num ; i++)
                    {
                        if(this.chance(0.75))
                        {
                            this.project_.removeBug(this.generateBugLevel(), 1);
                        }
                        if(this.change(0.5))
                        {
                            this.project_.findBug(this.generateBugLevel(), 1);
                        }
                    }
                }
                break;
                
            case 2:
            //市场相关
                event=new cc.Event.EventCustom('GETUSERCHANGE', true);
                event.detail.lastusernum=this.usernum_;
                this.node.dispatchEvent(event);
                this.usernum_=event.detail.back;
                event=new cc.Event.EventCustom('MONEYADD', true);
                event.detail.money=0;
                if(this.incomeWay_==0){
                    if(event.detail.back-event.detail.lastusernum>0){
                        event.detail.money=(event.detail.back - event.detail.lastusernum ) * this.project_.getPrice();
                    }
                }
                else{
                    event.detail.money=this.usernum_ * this.project_.getPrice();
                }
                event=new cc.Event.EventCustom('GETDATE', true);
                this.node.dispatchEvent(event);
                var nowday=event.detail.back;
                var t=this.project_.getTimeFromPublish(nowday);
                //因为现在影响力和已经爆发的bug还有关，所以这里需要传入this.burstBugs_
                this.project_.updateM(t, this.burstBugs_);
            //维护人员减少bug
                var n=this.maintainers_.length;
                var manager=0;
                var maxmanager=0;
                for(let i=0;i<this.maintainers_.length;i++){
                    manager=this.maintainers_[i].manager_;
                    if(maxmanager<manager){
                        maxmanager=manager;
                    }
                }
                manager=maxmanager;
                var sumF = 0.;
                for(let i=0;i<this.maintainers_.length;i++){
                    sumF += this.maintainers_[i].develop(manager,n,this.project_, false);
                }
                this.testCount_ += sumF;
                if(this.testCount_ >= 6)
                {
                    var num = this.testCount_ / 6;
                    this.testCount_ -= 6 * (this.testCount_ / 6);
                    for(let i = 0 ; i < num ; i++)
                    {
                        if(this.chance(0.9))
                        {
                            if(this.bugBurstPeriod_.length > 0)
                            {
                                //如果从已爆发的bug中找到了bug ，那么直接结束
                                this.bugBurstPeriod_.splice(0, 1);
                                continue;
                            }

                            this.project_.removeBug(this.generateBugLevel(), 1);
                        }
                        if(this.change(0.2))
                        {
                            this.project_.findBug(this.generateBugLevel(), 1);
                        }
                    }
                }
                //bug是否爆出
                this.bugDay_ += 7;
                if(this.bugDay_ > this.bugBurstPeriod_)
                {
                    this.bugDay_ = 0;
                    this.bugBurstPeriod_ = Math.random() * 100;
                    this.burstBugs_.push(this.generateBurstBugLevel());
                }
                break;

        }
    },

    generateBug:function(){
        var F=this.project_.currentFunction_;
        var T=this.project_.getPeriod()/7;
        var i=this.project_.currentInnovation_;
        var HB,MB,LB;
        var B0=F*T/25;
        var minNum=B0 / (1 + (0.1*I / F));
        var maxNum=B0 * (1 + (0.1*I / F));
        var B=parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        var HBA=parseInt(Math.random()*(15-5+1)+5,10);
        var MBA=parseInt(Math.random()*(40-20+1)+20,10)+HBA;
        while(B!=0){
            B0=Math.random()*100;
            if(B0<HBA){
                HB++;
            }
            else if(B0<MBA){
                MB++;
            }
            else{
                LB++;
            }
            B--;
        }
    },



    evolve:function(){
        this.removeAllperson();
        switch(this.state){
            case 0:
                this.generateBug();
                this.state=1;
                event=new cc.Event.EventCustom('TEST', true);
                event.detail.group=this;
                this.node.dispatchEvent(event);
                break;
            case 1:
                this.state=2;
                event=new cc.Event.EventCustom('PUBLISH', true);
                event.detail.group=this;
                this.node.dispatchEvent(event);
                event=new cc.Event.EventCustom('GETDATE', true);
                this.node.dispatchEvent(event);
                var nowday=event.detail.back;
                this.project_.finishDay_=nowday;
                //开始运营，那么此时需要开始bug爆出,bugDay_表示距离上一次bug爆发过了多少天
                this.bugDay_ = 0;
                //burstBugs 是一个爆出的bug的数组，初始为0，在维护人员减少bug时，优先减少这个数组里的bug
                //同时这个数组里的bug影响 影响力因子
                this.burstBugs_ = [];
                //生成一个1~100的数字，表示bug爆出的周期
                this.bugBurstPeriod_ = Math.random() * 100;
                break;
        }
    },

    isDevelopEnd:function(){
        return this.state==0&&this.project.isDevelopEnd();
    },

    isDevelopEnough:function(){
        return this.state==0&&this.project.isDevelopEnough();
    },

    isFinished:function(){
        return this.project_.isFinished();
    },

    isOverdue:function(){
        return this.project_.isOverdue();
    },

    isConsign:function(){
        return this.project.isConsigned();
    },

    getProject:function(){
        return this.project_;
    },

    getReward:function(){
        return this.project_.getReward();
    },

    removePerson:function(person){
        person.stop();
        for(let i=0;i<this.persons_.length;i++){
            if(this.persons_[i].index_==person.index_){
                this.persons_.splice(i,1);
                break;
            }
        }
        if(this.state==2){
            for(let i=0;i<this.maintainers_.length;i++){
                if(this.maintainers_[i].index_==person.index_){
                    this.maintainers_.splice(i,1);
                    break;
                }
            }
        }
    },

    addPerson:function(person,isSale){
        person.begin();
        if(isSale){
            this.maintainers_.push(person);
        }
        else{  
            this.persons_.push(person);
        }
    },

    removeAllPerson:function(){
        for(let i=0;i<this.persons_.length;i++){
            this.persons_[i].stop();
        }
        for(let i=0;i<this.maintainers_.length;i++){
            this.maintainers_[i].stop();
        }
        this.maintainers_=[];
        this.persons_=[]
    },

    setReward:function(reward){
        this.project_.setReward(reward);
    },

    setIncomeWay:function(way){
        this.incomeWay_ = way
    },
    
    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
