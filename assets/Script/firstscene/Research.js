cc.Class({
    extends: cc.Component,

    properties: {
        S_:0,       // 科研点数
        coefS1_:0,  // 受1号科技影响
        coefS2_:0,  // 12
        coef:{
            type:Object,
            default:null
        },
        // 科技编号从1开始
        name_:[],       // 科技名
        lv_:[],         // 科技等级(0为未解锁)
        preId_:[],      // 前置科技编号(无需前置则为0)
        preLv_:[],      // 前置科技等级
        costs_:[],      // 解锁各级需花费的科研点(二维数组)
    },
    add: function(id, name, preId, preLv, costs){
        this.name_[id]=name;
        this.lv_[id]=0; 
        this.preId_[id]=preId;
        this.preLv_[id]=preLv;
        this.costs_[id]=costs;
    },

    // use this for initialization
    onLoad: function () {
        this.S_=0;
        this.coefS1_=0;this.coefS2_=0;  // 12
        coef=new Object();
        // 带*的表示未找到在外部用该参数的地方
        // Person
        coef.F=1;   // 功能 受2,6,7,8影响
        coef.P=1;   // 性能 6,8,9
        coef.E=1;   // 体验 3,31,35,36
        coef.I=1;   // 创新 32,34
        coef.CP=1;  // 暴击概率 11
        coef.CR=1;  // 暴击倍率
        coef.EM=1;  // 雇佣金 15 *
        coef.MA=1;  // 管理能力 16 *
        coef.SC=1;  // 体力消耗 17 *
        // Market
        coef.M=1;   // 市场影响力 33,36 *
        // Account
        coef.IN=1;  // 收入 19,23
        coef.OUT=1; // 支出 18,21
        coef.PM=1;  // 项目启动金 14 *

        this.add(1,"基础数学",0,0,[10,20,40,80,160]);
        this.add(2,"抽象代数",1,3,[40,50,70,100,200]);
        this.add(3,"解析几何",1,3,[40,50,70,100,200]);
        this.add(6,"数理逻辑",1,1,[40,90,150,220,300]);
        this.add(7,"程序设计",0,0,[10,20,40,80,160]);
        this.add(8,"数据结构",7,1,[40,50,70,100,200]);
        this.add(9,"算法设计",[7,8],[2,1],[40,50,70,100,200]);
        this.add(10,"操作系统",[7,8],[5,3],[300,420,550,700,900]);   // 解锁项目
        this.add(11,"计算机网络",10,1,[300,420,550,700,900]);        // 解锁项目
        this.add(12,"数据库设计",8,3,[40,90,150,220,300]);
        this.add(13,"基础管理",0,0,[10,20,40,80,160]);
        this.add(14,"项目管理",13,1,[40,50,70,100,200]);
        this.add(15,"人事管理",13,1,[40,50,70,100,200]);
        this.add(16,"软件工程",[14,15],[2,2],[100,120,150,200,300]);
        this.add(17,"组织行为学",13,3,[30,40,60,90,130]);
        this.add(18,"运筹学",17,2,[40,90,150,220,300]);
        this.add(19,"基础经济学",0,0,[10,20,40,80,160]);
        this.add(20,"市场分析",[19,1],[2,1],[40,50,70,100,200]);
        this.add(21,"经济政策",19,3,[40,50,70,100,200]);
        this.add(31,"艺术鉴赏",0,0,[10,20,40,80,160]);
        this.add(32,"策划设计",31,1,[40,50,70,100,200]);
        this.add(33,"宣传设计",[31,36],[5,1],[40,50,70,100,200]);
        this.add(34,"产品设计",31,2,[300,420,550,700,900]);
        this.add(35,"体验设计",31,2,[300,420,550,700,900]);
        this.add(36,"动画设计",31,4,[40,90,150,220,300]);
    },

    unlock: function(id) {  // 传入要解锁的科技编号，返回 0(解锁成功) 1(科研点数不够) 2(前置科技未解锁) 3(该科技已满级)
        console.log("升级"+id+"号科研")
        var lv=this.lv_[id];
        if(lv>4){
            console.log("该科研等级已达最高")
            return 3;
        }
        var cost=this.costs_[id][lv+1];
        if(this.S_ < cost){
            console.log("科研点数不够升级")
            return 1;
        }
        var preIds=this.preId_[id];
        if(preIds[0]!=0){
            for(var i=0;i<preIds.length;i++){
                if(this.lv_[preIds[i]]<this.preLv_[id][i]){
                    console.log("前置科技未解锁")
                    return 2;
                }
            }
        }
        this.lv_[id]++;
        console.log(id+"号科技等级升至："+this.lv_[id]);
        this.S_ -= cost;
        switch(id){
        case 1:
            this.coefS1_ += 0.02;
            break;
        case 2:
            this.coef.F *= 1.02;
            break;
        case 3:
            this.coef.E *= 1.02;
            break;
        case 6:
            this.coef.F *= 1.01;
            this.coef.P *= 1.02;
            break;
        case 7:
            this.coef.F *= 1.01;
            break;
        case 8:
            this.coef.F *= 1.01;
            this.coef.P *= 1.01;
            break;
        case 9:
            this.coef.P *= 1.05;
            break;   
        case 11:
            this.coef.CP *= 1.05;
            this.coef.CR *= 1.2;
            break; 
        case 12:
            this.coefS2_ += 1;
            break;
        case 13:
            event = new EventCustom("ADDLIMIT",true);  
            this.node.dispatchEvent(event);
            return;
        case 14:
            this.coef.PM *= 0.95;
            break;
        case 15:
            event = new EventCustom("ADDLIMIT",true);  
            this.node.dispatchEvent(event);
            if(this.lv_[id]==5)
                this.coef.EM *= 0.5;
            return;
        case 16:
            this.coef.MA *= 1.05;
            break;    
        case 17:
            this.coef.SC *= 0.9;
            break;    
        case 18:
            this.coef.OUT *= 0.97;
            break;   
        case 19:
            this.coef.IN *= 1.01;
            break;   
        case 21:
            this.coef.OUT *= 0.98;
            break;   
        case 31:
            this.coef.E *= 1.01;
            break;
        case 32:
            this.coef.I *= 1.02;
            break;
        case 33:
            this.coef.M *= 1.5;
            break;
        case 34:
            this.coef.I *= 1.15;
            break;
        case 35:
            this.coef.E *= 1.15;
            break;
        case 36:
            this.coef.E *= 1.03;
            this.coef.M *= 1.5;
            break;
        }
        event = new EventCustom("UPDATACOEF",true);  
        event.detail.coef=this.coef;  
        this.node.dispatchEvent(event);
        return 0;
    },

    addS1: function() {             // 暴击时随机增加1~3
        console.log("科研点数："+this.S_);
        this.S_ += 1+2*Math.random();
        console.log("科研点数："+this.S_);
    },

    addS2: function(Science) {      // 每周根据科研人员数值随机增加
        Science=100;
        console.log("科研点数："+this.S_);
        this.S_ += Science/10 * (0.9+0.2*Math.random());
        console.log("科研点数："+this.S_);
    },

    addS3: function(Function) {     // 开发完成时增加
        Function=100;
        console.log("科研点数："+this.S_);
        this.S_ += this.S_*this.coefS1_ + Function/10*this.coefS2_;
        console.log("科研点数："+this.S_);
    }
});
