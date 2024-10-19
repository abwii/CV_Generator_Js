const moment = require('moment');

const convertToDateObject = (dateString) => {
    return moment(dateString, 'DD/MM/YYYY').toDate();
};

const convertToCustomFormat = (dateObject) => {
    return moment(dateObject).format('DD/MM/YYYY');
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
    formatUpdatedCV,
    formatEducation,
    formatExperience,
    formatCVResponse
};