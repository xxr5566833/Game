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
            type:cc.Integer
        },
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

    work:function(){
        switch(this.state_){
            case 0:
                var n=this.persons_.length;
                var manager=0;
                var maxmanager=0;
                for(let i=0;i<this.persons_.length;i++){
                    manager=this.persons_[i].getComponent().manager_;
                    if(maxmanager<manager){
                        maxmanager=manager;
                    }
                }
                manager=maxmanager;
                for(let i=0;i<this.persons_.length;i++){
                    this.persons_[i].getComponent().develop(manager,n,this.project_);
                }
                break;
            case 1:
                
                
                break;
            case 2:
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
                this.project_.updateM(t);
                break;
        }
    },

    generateBug:function(){

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
        this.persons_.push(person);
        if(isSale){
            this.maintainers_.push(person);
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
