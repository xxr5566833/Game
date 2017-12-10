var Project = require("Project");
var TenderGroup = require("TenderGroup");
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
        //初始化招标数组
        this.groups_ = [];
        //初始化周期数组
        this.periods_ = [];
        this.initDays_ = [];
        for(let i = 0 ; i < this.maxKindNum_ ; i ++)
        {
            var period = this.generatePeriod(i);
            this.periods_.push(period);
            var event = new EventCustom("GETDATE", true);
            this.node.dispatchEvent(event);
            var date = event.detail.back;
            this.initDays_.push(date);
        }
    },

    initTender:function(categoryid, initday){
        var choose = this.bidProjects_[categoryid];
        var rand = Math.random();
        var project = new Project();
        var level = 0;
        for(let i = 0 ; i < choose.length ; i++)
        {
            var proj = choose[i];
            if(rand >= proj.minRange && rand < proj.maxRange)
            {
                //根据proj的属性，初始化project的属性
                project.init(proj, 2);
                level = proj.level_.level;
                break;
            }
        }
        //首先获得可以参与竞标的公司列表
        var temp = [];
        if(level == 0)
        {
            temp.concat(this.companyList_[0]);
            temp.concat(this.companyList_[1]);
        }
        else if(level == 5){
            temp.concat(this.companyList_[5]);
            temp.concat(this.companyList_[4]);
        }
        else{
            temp.concat(this.companyList_[level - 1]);
            temp.concat(this.companyList_[level]);
            temp.concat(this.companyList_[level + 1]);
        }
        //从中随机选出7个公司
        var maxcount = 7;
        var resultCompany = [];
        for(let i = 0 ; i < maxcount ; i++)
        {
            var length = temp.length;
            var rand = Math.floor(Math.random() * length);
            resultCompany.push(temp[rand]);
            temp.splice(rand, 1);
        }
        var group = new TenderGroup();
        group.node = this.node;
        group.init(project, resultCompany, initday);

    },
    //检查是否可以发出竞标事件，如果可以，那么发出竞标事件，如果有可以开始竞标的，那么开始竞标
    tender:function(){
        var event = new EventCustom("GETDATE", true);
        this.node.dispatchEvent(event);
        var date = event.detail.back;
        for(let i = 0 ; i < this.maxKindNum_ ; i++)
        {
            var day = date - this.initDays_[i];
            if(day >= this.periods_[i])
            {
                this.initTender(i, date);
                var period = this.generatePeriod;
                this.periods_[i] = period;
                this.initDays_[i] = date;
            }
        }
        var del = [];
        for(let i = 0 ; i < this.groups_.length ; i++)
        {
            var group = this.groups_[i];
            if(group.canBid(date))
            {
                group.bid();
                this.groups_.splice(i, 1);
                i--;
            }
        }
    },

    generatePeriod:function(categoryid){
        var min = this.categories[categoryid].minPeriod_;
        var max = this.categories[categoryid].maxPeriod_;
        var period = Math.floor((Math.random() * (max - min) + min) * 30);
    },

    initCompanyList:function(companylist)
    {
        this.companyList_ = companylist;
    },

    initBidProjects:function(bidprojects)
    {
        this.bidProjects_ = bidprojects;
    },
    
    initProjectCategory:function(categories)
    {
        this.categories = categories;
        this.maxKindNum_ = categories.length;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
