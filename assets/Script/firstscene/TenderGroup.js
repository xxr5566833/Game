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
    init:function(project, companylist, initday)
    {
        this.project_ = project;
        //表示自己是否报名
        this.flag_ = false;
        //表示是否派遣了黑客
        this.hacker = null;
        this.companyList_ = companylist;
        this.initDay_ = initday;
        //为了支持黑客系统，需要在这里初始化一些随机的参数,同时就把推荐出资算好
        this.a_ = Math.random() * 3;
        this.b_ = Math.random() * 3;
        this.expectedPrice_ = this.project_.level_.expectedPrice_;
        //初始化预估金
        var expectedprice = this.expectedPrice_
        //初始化a，b
        var a = this.a_;
        var b = this.b_;
        //计算每个公司的评分
        this.maxM_ = -1;
        this.maxIndex_ = -1;
        for(let i = 0 ; i < this.companyList_.length ; i++)
        {
            var company = this.companyList_[i];
            //0.5到3倍之间
            var fixprice = Math.random() * 2.5 + 0.5;
            company.m_ = (a * company.credit_ + b * expectedprice) / (fixprice + 1);
            if(company.m_ > this.maxM_)
            {
                this.maxM_ = company.m_;
                this.maxIndex_ = i;
            }
        }

        //调用ui发布信息
        var event = new CustomEvent("ANNOUNCE", true);
        event.detail.group = this;
        this.node.dispatchEvent(event);
    },
    enroll:function(){
        this.flag_ = true;
    },
    //派遣黑客
    dispatch:function(person){
        //设置好这个黑客的信息
        this.hacker_ = person;
    },
    canBid:function(nowday){
        //一周后就可以开始招标了
        return (nowday - this.initDay_) >= 7;
    },
    //窃取信息
    stealInformation:function(){
        var coding = this.hacker_.getAbility().coding_;
        var probability = 0;
        switch(this.project_.level_.level_)
        {
            case 0:
                probability = coding >= 50 ? 1 : coding * 0.02 ;  
                break;
            case 1:
                if(coding > 50)
                {
                    probability = coding >= 100 ? 1 : ( coding - 50 ) * 0.02;
                }
                break;
            case 2:
                if(coding > 100)
                {
                    probability = coding >= 300 ? 1 : ( coding - 100 ) * 0.005;
                }
                break;
            case 3:
                if(coding > 300)
                {
                    probability = coding >= 500 ? 1 : ( coding - 300 ) * 0.005;
                }
                break;
            case 4:
                if(coding > 500)
                {
                    probability = coding >= 1000 ? 1 : ( coding - 500 ) * 0.002;
                }
                break;
            case 5:
                if(coding > 1000)
                {
                    probability = coding >= 2000 ? 1 : ( coding - 2000 ) * 0.001;
                }
        }
        var rand = Math.random();
        if(probability >= rand)
        {
            //表示这个黑客能力很强，成功获取到了情报
            var event = new EventCustom("GETCREDIT", true);
            this.node.dispatchEvent(event);
            //你的信誉度获取
            var mycredit = event.detail.back;
            //计算的中间变量
            var temp1 = this.a_ * mycredit + this.b_ * this.expectedPrice_;
            var temp2 = this.maxM_ + 1;
            if(temp1 > temp2)
            {
                //说明最优出价有解，那么设置好这个最优出价
                this.bestPrice_ = temp1 / temp2 - 1; 
            }
            else{
                //-1表示不能胜出
                this.bestPrice_ = -1;
            }
        }
        else{
            //-2表示偷窃失败
            this.bestPrice_ = -2;
            if(Math.random() > 0.5)
            {
                //50%就是失败并被发现,信誉度降低10%
                event = new EventCustom("CREDITCHANGE", true);
                event.detail.change = - 0.1 * mycredit;
                this.node.dispatchEvent(event);
                //或许这里需要一些ui逻辑
            }
        }
        return this.bestPrice_;
    },
    //表示开始竞标
    bid:function(){
        if(!this.flag_)
        {
            //表示自己没有参加，
            //可能放点动画，也可能直接结束
            //那么此时需要增加获胜的公司的信誉
            var company = this.companyList_[this.maxIndex_];
            var growth = this.project_.level_.creditGrowth_;
            //这里还需要考虑任务的种类
            switch(this.project_.categories[0].categoryId_)
            {
                case 0:
                    growth = growth * 1.5;
                    break;
                case 1:
                    growth = growth * 2;
                    break;
            }

            company.credit_ += growth;
        }
        else{
            if(this.hacker_)
            {
                var event = new EventCustom("STEALBIDINFORMATION", true);
                var bestprice = this.stealInformation();
                event.detail.bestprice = bestprice;
                this.node.dispatchEvent(event);
                //把黑客获取到的信息展示给玩家

                //然后就需要让这个黑客休息了
                this.hacker_.state_ = 1;
            }
            var event = new EventCustom("GETPRICE", true);
            this.node.dispatchEvent(event);
            //获取玩家的出价
            var myprice = event.detail.back;
            //计算玩家的评分
            event = new EventCustom("GETCREDIT", true);
            this.node.dispatchEvent(event);
            var mycredit = event.detail.back;
            var resultm = ( this.a_ * mycredit + this.b_ * this.expectedPrice_ ) / ( myprice + 1);
            if(resultm > this.maxM_)
            {
                //你获胜了,那么你就需要开始做这个任务了...
                //播放动画什么的。。
                //在此之前需要设置一些这个任务的属性
                this.project_.setReward(myprice);
                //先获取定金
                event = new EventCustom("MONEYADD", true);
                event.detail.money = myprice * 0.2;
                event.detail.record = "定金";
                this.node.dispatchEvent(event);
                //表示要进入选人界面接受这个任务
                event = new EventCustom("RECEIVEPROJ", true);
                event.detail.project = this.project_;
                this.node.dispatchEvent(event); 
            }
            else{
                //你失败了，无法接受这个任务
                //播放动画
                //为获胜者增加荣誉值。
                var company = this.companyList_[this.maxIndex_];
                var growth = this.project_.level_.creditGrowth_;
                //这里还需要考虑任务的种类
                switch(this.project_.categories_[0].categoryId_)
                {
                    case 0:
                        growth = growth * 1.5;
                        break;
                    case 1:
                        growth = growth * 2;
                        break;
                }
    
                company.credit_ += growth;
            }
            //最后所有的参与者都增加根据其相应的荣誉值，但是自己公司没说加不加。。
            for(let i = 0 ; i < this.companyList_.length ; i++)
            {
                var company = this.companyList_[i];
                var growth = Math.random() * ( company.maxGrowth_ - company.minGrowth_ ) + company.minGrowth_;
                company.credit_ += growth;
            }
        }
    }



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
