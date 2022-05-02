import moment from "moment";

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
        }
    }
}

export {
    dateFormatUtils
}