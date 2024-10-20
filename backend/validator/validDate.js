const moment = require('moment');

const areValidDates = (startDate, endDate) => {
    return moment(endDate, 'DD/MM/YYYY').isAfter(moment(startDate, 'DD/MM/YYYY'));
};

module.exports = {
    areValidDates
}