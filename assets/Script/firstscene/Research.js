cc.Class({
    extends: cc.Component,

    properties: {
        S_:0,       // 科研点数
        abilityScience_:0,  // 当前科研人员的科研能力值
        /* 科技编号从1开始 */
        name_:[],   // 科技名
        state_:[],  // 解锁状态(0为locked，1为unlocked)
        pre_:[],    // 前置科技编号(无需前置则为0)
        cost_:[],   // 解锁需花费的科研点
    },

    // use this for initialization
    onLoad: function () {
        this.state_.push(1);     // 0号科技状态恒为unlocked
    },

    unlock: function(no) {  // 传入要解锁的科技编号，返回 0(解锁成功) 1(科研点数不够) 2(前置科技未解锁)
        if(this.S_ < this.cost_[no])
            return 1;
        if(this.state[this.pre[no]]==0)
            return 2;
        this.state[no]=1;
        this.S_-=this.cost_[no];
        return 0;
    },

    setResearch: function(science) {    // 设置科研人员时传入其science值，取消时传入0
        this.abilityScience_ = science;
    },

    addS1: function() {      // 暴击时随机增加1~3
        this.S_ += 1+2*Math.random;
    },

    addS2: function() {     // 每周根据科研人员数值随机增加
        this.S_ += this.abilityScience_/10 * (0.9+0.2*Math.random);
    }
});
