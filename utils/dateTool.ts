const dateTool = {
    // 格式化时间为 xxxx年xx月xx日 星期x
    formatDate(date: Date, showDay?: boolean, showWeek?: boolean): string{
        const weeks = ['日', '一', '二', '三', '四', '五', '六'];
        const year = date.getFullYear();
        let month: string | number = date.getMonth() + 1;
        if(month < 10){
            month = `0${month}`;
        }
        let newDate = `${year}年${month}月`;
        if(showDay){
            let day: string | number = date.getDate();
            if(day < 10){
                day = `0${day}`;
            }
            newDate = `${newDate}${day}日`;
        }
        if(showWeek){
            const week = weeks[date.getDay()];
            newDate = `${newDate} 星期${week}`;
        }
        return newDate;
    },
    // 格式化时间为 xxxx-xx-xx
    formatLineDate(date: Date, showDay?: boolean): string{
        const year = date.getFullYear();
        let month: string | number = date.getMonth() + 1;
        if(month < 10){
            month = `0${month}`;
        }
        let newDate;
        if(showDay){
            let day: string | number = date.getDate();
            if(day < 10){
                day = `0${day}`;
            }
            newDate = `${year}-${month}-${day}`;
        }else{
            newDate = `${year}-${month}`;
        }
        return newDate;
    },
    // 格式化当前时间的上个月时间为 xxxx-xx
    formatLineLastMonthDate(date: Date): string{
        if(date.getDate() <= 15){
            date.setMonth(date.getMonth() - 1);
        }
        date.setDate(0);
        return this.formatLineDate(date);
    },
    // 格式化当前时间的上一年时间为 xxxx-xx
    formatLineLastYearDate(date: Date): string{
        date.setFullYear(date.getFullYear() - 1);
        date.setMonth(date.getMonth() + 1);
        return this.formatLineLastMonthDate(date);
    },
    // 获取上个季度 2018Q4
    getCurJidu(date: Date): string{
        let year = date.getFullYear();
        const month = date.getMonth();
        let jidu: number;
        if(month >= 0 && month <= 2){
            year = year - 1;
            jidu = 4;
        }else if(month > 2 && month <= 5){
            jidu = 1;
        }else if(month > 5 && month <= 8){
            jidu = 2;
        }else{
            jidu = 3;
        }
        return `${year}Q${jidu}`;
    },
    // 获取前8个季度 2018Q4
    getLastEightJidu(date: Date): string{
        let tempYear = date.getFullYear();
        let tempMonth = date.getMonth();
        const count: number = tempMonth + 3;
        if(count > 11){
            tempMonth = count - 11;
            tempYear = tempYear - 1;
        }else{
            tempMonth = count;
            tempYear = tempYear - 2;
        }
        date.setFullYear(tempYear, tempMonth);
        return this.getCurJidu(date);
    },
    // 将年-月-日时间转换为 Date 实例
    // daraStr => '2018-05-27'
    getDate(dateStr: string): Date {
        let temp: Array<string | number> = dateStr.split('-');
        // new Date 需要将参数转换为 number 类型
        temp[0] = Number(temp[0]);
        // 因为月份是从 0 开始的，所以需要将月份同意减 1
        temp[1] = Number(temp[1]) - 1;
        temp[2] = Number(temp[2]);
        const date = new Date((temp[0] as number), (temp[1] as number), (temp[2] as number));
        return date;
    },
    // 获取开始-结束指定时间内的时间数组
    getDiffDate(start: string, end: string): string[]{
        let startTime = this.getDate(start);
        const endTime = this.getDate(end);
        let dateArr = [];
        // 根据时间对比起始时间，并循环遍历
        while((endTime.getTime() - startTime.getTime()) >= 0){
            const year = startTime.getFullYear();
            let month: string | number = startTime.getMonth();
            let day: string | number = startTime.getDate();
            
            // 将开始时间增加一天，用于循环遍历
            startTime = new Date(year, (month as number), day + 1);

            month = month + 1;
            if(month < 10){
                month = `0${month}`;
            }
            if(day < 10){
                day = `0${day}`;
            }
            const dateStr = `${year}-${month}-${day}`;
            dateArr.push(dateStr);
        }   
        return dateArr;
    },
    // 获取当前月第一天的当前星期的第一天日期
    getFirstWeekDay(date: Date): string{
        // 设置一个月中的第一天 date 实例
        date.setDate(1);
        let week: string | number = date.getDay();
        // 默认设置周一的日期，周内其他日进行判断，重设
        if(week === 0){
            date.setDate(-5);
        }else if(week !== 1){
            date.setDate(2 - week);
        }
        // 输出当前月第一天的当前星期的第一天日期
        const year: number = date.getFullYear();
        let month: string | number = date.getMonth() + 1;
        let day: string | number = date.getDate();
        if(month < 10){
            month = `0${month}`;
        }
        if(day < 10){
            day = `0${day}`;
        }
        return `${year}-${month}-${day}`;
    },
    // 获取当前月最后一天的当前星期的最后一天日期
    getLastWeekDay(date: Date): string{
        const nextMonth = date.getMonth() + 1;
        const nextMonthFirstDate: any = new Date(date.getFullYear(), nextMonth, 1);
        const oneDay = 1000 * 60 * 60 * 24;
        const curMonthLastDate = new Date(nextMonthFirstDate - oneDay);
        let lastDateWeek: number = curMonthLastDate.getDay();
        let lastDateDay: number = curMonthLastDate.getDate();
        // 默认设置周日的日期，周内其他日进行判断，重设
        if(lastDateWeek === 0){
            date = curMonthLastDate;
        }else{
            date.setDate(lastDateDay + 7 - lastDateWeek);
        }

        // 输出当前月最后一天的当前星期的最后一天日期
        const year = date.getFullYear();
        let month: string | number = date.getMonth() + 1;
        let day: string | number = date.getDate();
        if(month < 10){
            month = `0${month}`;
        }
        if(day < 10){
            day = `0${day}`;
        }
        return `${year}-${month}-${day}`;
    }
};

export default dateTool;

