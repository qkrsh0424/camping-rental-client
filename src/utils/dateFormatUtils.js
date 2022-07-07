import moment from "moment";

const isValidDateObject = (date) => {
    if (Object.prototype.toString.call(date) === "[object Date]") {
        // it is a date
        if (isNaN(date)) { // d.getTime() or d.valueOf() will also work
            // date object is not valid
            return false
        } else {
            // date object is valid
            return true;
        }
    } else {
        // not a date object
        return false;
    }
}

const dateFormatUtils = () => {
    return {
        getDiffDate: function (startDate, endDate) {
            let diffTime = new Date(endDate) - new Date(startDate);
            let diffDay = diffTime / (1000 * 60 * 60 * 24);

            return Math.floor(diffDay) <= 0 ? 1 : Math.floor(diffDay);
        },
        getStartDate: function (date) {
            let cdate = new Date(date);
            cdate.setHours(0);
            cdate.setMinutes(1);
            cdate.setSeconds(0);
            return cdate;
        },
        getEndDate: function (date) {
            let cdate = new Date(date);
            cdate.setHours(23);
            cdate.setMinutes(58);
            cdate.setSeconds(0);
            return cdate
        },
        dateToYYMMDD: function (date) {
            var d = new Date(date)
            return moment(d).format("YY.MM.DD");
        },
        dateToYYMMDDHHmmss: function (idate, invalidReturn) {
            var date = new Date(idate || '');
            if (!isValidDateObject(date)) {
                return invalidReturn;
            }
            return moment(date).format("YY.MM.DD HH:mm:ss");
        },
        isValidDate: (d) =>{
            return d instanceof Date && !isNaN(d);
        }
    }
}

export {
    dateFormatUtils
}