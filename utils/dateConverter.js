const moment = require('moment');

const convertToDateObject = (dateString) => {
    return moment(dateString, 'DD/MM/YYYY').toDate();
};

const convertToCustomFormat = (dateObject) => {
    return moment(dateObject).format('DD/MM/YYYY');
};

module.exports = {
    convertToDateObject,
    convertToCustomFormat
};
