const moment = require('moment');
const { areValidDates } = require('../validator/validDate');

const convertToDateObject = (dateString) => {
    return moment(dateString, 'DD/MM/YYYY').toDate();
};

const convertToCustomFormat = (dateObject) => {
    return moment(dateObject).format('DD/MM/YYYY');
};

const updateEducation = (existingEducation, newEducation) => {
    existingEducation = existingEducation.filter(existingEdu =>
        newEducation.some(newEdu =>
            newEdu.degree === existingEdu.degree && newEdu.institution === existingEdu.institution
        )
    );

    newEducation.forEach(newEdu => {
        const existingEdu = existingEducation.find(existingEdu =>
            existingEdu.degree === newEdu.degree && existingEdu.institution === newEdu.institution
        );
        if (existingEdu) {
            if (newEdu.startDate && newEdu.endDate) {
                if (!areValidDates(newEdu.startDate, newEdu.endDate)) {
                    throw new Error('Invalid date range for education');
                }
            }
            existingEdu.startDate = convertToDateObject(newEdu.startDate);
            existingEdu.endDate = convertToDateObject(newEdu.endDate);
            existingEdu.description = newEdu.description;
        } else {
            existingEducation.push({
                degree: newEdu.degree,
                institution: newEdu.institution,
                startDate: convertToDateObject(newEdu.startDate),
                endDate: convertToDateObject(newEdu.endDate),
                description: newEdu.description,
            });
        }
    });

    return existingEducation;
};

const updateExperience = (existingExperience, newExperience) => {
    existingExperience = existingExperience.filter(existingExp =>
        newExperience.some(newExp => newExp._id && newExp._id.equals(existingExp._id))
    );

    newExperience.forEach(newExp => {
        const existingExp = existingExperience.find(existingExp => existingExp._id && existingExp._id.equals(newExp._id));

        if (existingExp) {
            const startDateToCheck = newExp.startDate ? newExp.startDate : existingExp.startDate;
            const endDateToCheck = newExp.endDate ? newExp.endDate : existingExp.endDate;

            if (startDateToCheck && endDateToCheck) {
                if (!areValidDates(startDateToCheck, endDateToCheck)) {
                    throw new Error('End date must be after start date');
                }
            }
            existingExp.title = newExp.title !== undefined ? newExp.title : existingExp.title;
            existingExp.company = newExp.company !== undefined ? newExp.company : existingExp.company;
            existingExp.startDate = convertToDateObject(newExp.startDate);
            existingExp.endDate = convertToDateObject(newExp.endDate);
            existingExp.description = newExp.description !== undefined ? newExp.description : existingExp.description;
        } else {
            existingExperience.push({
                title: newExp.title,
                company: newExp.company,
                startDate: convertToDateObject(newExp.startDate),
                endDate: convertToDateObject(newExp.endDate),
                description: newExp.description,
            });
        }
    });

    return existingExperience;
};

const formatUpdatedCV = (updatedCV) => {
    return {
        ...updatedCV.toObject(),
        education: updatedCV.education ? updatedCV.education.map(edu => {
            const formattedEdu = {};
            if (edu.degree) formattedEdu.degree = edu.degree;
            if (edu.institution) formattedEdu.institution = edu.institution;
            if (edu.startDate) formattedEdu.startDate = convertToCustomFormat(edu.startDate);
            if (edu.endDate) formattedEdu.endDate = convertToCustomFormat(edu.endDate);
            if (edu.description) formattedEdu.description = edu.description;
            return formattedEdu;
        }) : [],
        experience: updatedCV.experience ? updatedCV.experience.map(exp => {
            const formattedExp = {};
            if (exp.title) formattedExp.title = exp.title;
            if (exp.company) formattedExp.company = exp.company;
            if (exp.startDate) formattedExp.startDate = convertToCustomFormat(exp.startDate);
            if (exp.endDate) formattedExp.endDate = convertToCustomFormat(exp.endDate);
            if (exp.description) formattedExp.description = exp.description;
            return formattedExp;
        }) : []
    };
};

const formatEducation = (education) => {
    return education.map(edu => ({
        degree: edu.degree,
        institution: edu.institution,
        startDate: convertToCustomFormat(edu.startDate),
        endDate: convertToCustomFormat(edu.endDate),
        description: edu.description
    }));
};

const formatExperience = (experience) => {
    return experience.map(exp => ({
        title: exp.title,
        company: exp.company,
        startDate: convertToCustomFormat(exp.startDate),
        endDate: convertToCustomFormat(exp.endDate),
        description: exp.description
    }));
};

const formatCVResponse = (cv) => {
    return {
        id: cv._id,
        description: cv.description,
        education: formatEducation(cv.education),
        experience: formatExperience(cv.experience),
        skills: cv.skills,
        visible: cv.visible,
        user: {
            id: cv.user.userId,
            firstname: cv.user.firstname,
            lastname: cv.user.lastname,
            email: cv.user.email,
            phone: cv.user.phone,
            address: cv.user.address
        }
    };
};



module.exports = {
    convertToDateObject,
    convertToCustomFormat,
    updateEducation,
    updateExperience,
    formatUpdatedCV,
    formatEducation,
    formatExperience,
    formatCVResponse
};