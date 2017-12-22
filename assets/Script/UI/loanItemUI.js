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
        amount : cc.Label,
        deadline : cc.Label,

    },

    // use this for initialization
    onLoad: function () {

    },

    getYearMonthWeek: function(day) {
        var month_day_count = [31, 28, 31,
            30, 31, 30,
            31, 31, 30,
            31, 30, 31]
        var yr_count = 0 
        var day2yr_tg = NaN;
        var day2month_tg_idx = 0;
        var d_year = 0
        var d_month = 0
        var week_count = 0
        for (var d = 0; d < day; d++) {
            if (this.isLeapYear(yr_count)) {
                day2yr_tg = 366
                month_day_count[1] = 29
            } else {
                day2yr_tg = 365
                month_day_count[1] = 28
            }
            d_year++
            d_month++
            if ((d_year % day2yr_tg) == 0) {
                yr_count++
                d_year = 0
            }
            if (d % 7 == 0) {
                week_count++
            }
            if ((d_month % month_day_count[day2month_tg_idx]) == 0) {
                day2month_tg_idx = (day2month_tg_idx + 1) % 12
                d_month = 0
                week_count = 1
            }
        }
        return { year: yr_count, month: day2month_tg_idx+1, week: week_count }
    },
    isLeapYear: function (yr) {
        return (yr % 400 == 0) || ((yr % 100 != 0) && (yr % 4 == 0))
    },
    init:function(money, deadline, i){
        var date = this.getYearMonthWeek(deadline)
        var year = date.year
        var month = date.month
        var week = date.week
        this.deadline.string = "截止时间" + year + '年 ' + month + '月\n' + '第 ' + week + ' 周'
        this.amount.string = "$" + Math.floor(money);
        this.index = i;
    },
    back:function(){
        this.js.back(this.index);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
