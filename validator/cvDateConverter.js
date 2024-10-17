const { areValidDates } = require('./validDate');
const { convertToDateObject } = require('../utils/dateConverter');

const validateEducationDate = (educationArray) => {
    educationArray.forEach(edu => {
        if (!areValidDates(edu.startDate, edu.endDate)) {
            throw new Error(`End date ${edu.endDate} must be after start date ${edu.startDate} in education.`);
        }

        edu.startDate = convertToDateObject(edu.startDate);
        edu.endDate = convertToDateObject(edu.endDate);
    });
};

const validateExperienceDate = (experienceArray) => {
    experienceArray.forEach(exp => {
        if (!areValidDates(exp.startDate, exp.endDate)) {
            throw new Error(`End date ${exp.endDate} must be after start date ${exp.startDate} in experience.`);
        }

        exp.startDate = convertToDateObject(exp.startDate);
        exp.endDate = convertToDateObject(exp.endDate);
    });
};

module.exports = {
    validateEducationDate,
    validateExperienceDate
};
