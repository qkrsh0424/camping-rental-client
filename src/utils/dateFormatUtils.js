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
        getDiffDateIncludeZero: function (startDate, endDate) {
            let diffTime = new Date(endDate) - new Date(startDate);
            let diffDay = diffTime / (1000 * 60 * 60 * 24);

            return Math.floor(diffDay);
        },
        dateFromDateAndHH_mm: function (date, time) {
            let pDateTime = `${moment(new Date(date)).format('yyyy-MM-DD')}T${time}:00`;
            return new Date(pDateTime);
        },
        getDiffHoursFromDates: function (fDate, sDate) {
            let firstDate = moment(new Date(fDate));
            let secondDate = moment(new Date(sDate));

            return Math.abs(secondDate.diff(firstDate, 'hours'));
        },
        getDiffHoursFromDatesAllowNegative: function (fDate, sDate) {
            let firstDate = moment(new Date(fDate));
            let secondDate = moment(new Date(sDate));

            return secondDate.diff(firstDate, 'hours');
        },
        getDiffDaysFromDates: function (fDate, sDate) {
            let firstDate = moment(new Date(fDate));
            let secondDate = moment(new Date(sDate));

            return Math.abs(secondDate.diff(firstDate, 'days'));
        },
        getDiffMillisecondFromDatesNegative: function (fDate, sDate) {
            let firstDate = moment(new Date(fDate));
            let secondDate = moment(new Date(sDate));

            return secondDate.diff(firstDate, 'millisecond');
        },
        getDiffDaysFromDatesNonZero: function (fDate, sDate) {
            let firstDate = moment(new Date(fDate));
            let secondDate = moment(new Date(sDate));

            let hours = Math.abs(secondDate.diff(firstDate, 'hours'));
            let days = Math.abs(secondDate.diff(firstDate, 'days'));

            if (hours % 24 > 0) {
                return days + 1;
            }

            return days;

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
        dateToYYMMDD: function (idate, invalidReturn) {
            var date = new Date(idate || '');
            if (!isValidDateObject(date)) {
                return invalidReturn;
            }
            return moment(date).format("YY.MM.DD");
        },
        dateToYYMMDDHHmmss: function (idate, invalidReturn) {
            var date = new Date(idate || '');
            if (!isValidDateObject(date)) {
                return invalidReturn;
            }
            return moment(date).format("YY.MM.DD HH:mm:ss");
        },
        isValidDate: (d) => {
            return d instanceof Date && !isNaN(d);
        }
    }
}

export {
    dateFormatUtils
}