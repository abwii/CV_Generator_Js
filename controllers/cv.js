const CVModel = require("../models/CV");
const UserModel = require('./../models/User');
const { verifyCV } = require('../validator/cv');
const { areValidDates } = require('../validator/validDate')
const { validateEducationDate, validateExperienceDate } = require('../validator/cvDateConverter');
const { convertToDateObject, formatUpdatedCV, formatCVResponse} = require('../utils/cv');

module.exports = {
    findAllCV: (req, res) => {
        CVModel.find({ visible: true })
            .populate('user', 'firstname lastname email phone address')
            .then((cvs) => {
                if (cvs.length === 0) {
                    return res.status(404).send({
                        message: 'No visible CVs found'
                    });
                }
                const formattedCVs = cvs.map(cv => formatCVResponse(cv));
                res.send(formattedCVs);
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message
                });
            });
    },

    findCVById: (req, res) => {
        const cvId = req.params.id;
        CVModel.findById({ _id: cvId, visible: true })
            .populate('user', 'firstname lastname email phone address')
            .then((cv) => {
                if (!cv) {
                    return res.status(404).send({
                        message: 'CV not found or not visible'
                    });
                }
                res.send(formatCVResponse(cv));
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message
                });
            });
    },

    createMyCV: async (req, res) => {
        try {
            const existingCV = await CVModel.findOne({ user: req.body.user });
            if (existingCV) {
                return res.status(400).send({
                    message: 'User has already created a CV'
                });
            }

            verifyCV(req.body);

            const user = await UserModel.findById(req.body.user);
            if (!user) {
                return res.status(400).send({
                    message: 'User does not exist'
                });
            }

            validateEducationDate(req.body.education);
            validateExperienceDate(req.body.experience);

            const newCV = new CVModel({
                user,
                title: req.body.title,
                description: req.body.description,
                education: req.body.education,
                experience: req.body.experience,
                skills: req.body.skills,
                softSkills: req.body.skills,
                languages: req.body.skills,
                visible: req.body.visible
            });

            await newCV.save();
            res.status(201).send(formatCVResponse(newCV));

        } catch (error) {
            res.status(400).send({
                message: error.message || 'Something went wrong'
            });
        }
    },

    updateMyCV: async (req, res) => {
        try {
            const cvId = req.params.id;
            const existingCV = await CVModel.findById(cvId);

            if (!existingCV) {
                return res.status(404).send('Cannot find CV to update');
            }

            const newCV = { ...req.body };
            const updateFields = {};

            if (newCV.titre && newCV.titre !== existingCV.titre) {
                updateFields.titre = newCV.titre;
            }
            if (newCV.description && newCV.description !== existingCV.description) {
                updateFields.description = newCV.description;
            }
            if (newCV.skills && JSON.stringify(newCV.skills) !== JSON.stringify(existingCV.skills)) {
                updateFields.skills = newCV.skills;
            }
            if (newCV.skills && JSON.stringify(newCV.softSkills) !== JSON.stringify(existingCV.softSkills)) {
                updateFields.softSkills = newCV.softSkills;
            }
            if (newCV.skills && JSON.stringify(newCV.languages) !== JSON.stringify(existingCV.languages)) {
                updateFields.languages = newCV.languages;
            }
            if (newCV.visible !== undefined && newCV.visible !== existingCV.visible) {
                updateFields.visible = newCV.visible;
            }

            if (newCV.education) {
                existingCV.education = existingCV.education.filter(existingEdu =>
                    newCV.education.some(newEdu => newEdu._id && newEdu._id.equals(existingEdu._id))
                );
            
                newCV.education.forEach(newEdu => {
                    const existingEdu = existingCV.education.find(existingEdu => existingEdu._id && existingEdu._id.equals(newEdu._id));
            
                    if (existingEdu) {
                        const startDateToCheck = newEdu.startDate ? newEdu.startDate : existingEdu.startDate;
                        const endDateToCheck = newEdu.endDate ? newEdu.endDate : existingEdu.endDate;
            
                        if (startDateToCheck && endDateToCheck) {
                            if (!areValidDates(startDateToCheck, endDateToCheck)) {
                                throw new Error('End date must be after start date');
                            }
                        }
            
                        existingEdu.degree = newEdu.degree !== undefined ? newEdu.degree : existingEdu.degree;
                        existingEdu.institution = newEdu.institution !== undefined ? newEdu.institution : existingEdu.institution;
                        existingEdu.startDate = convertToDateObject(newEdu.startDate);
                        existingEdu.endDate = convertToDateObject(newEdu.endDate);
                        existingEdu.description = newEdu.description !== undefined ? newEdu.description : existingEdu.description;
                    } else {
                        existingCV.education.push({
                            degree: newEdu.degree,
                            institution: newEdu.institution,
                            startDate: convertToDateObject(newEdu.startDate),
                            endDate: convertToDateObject(newEdu.endDate),
                            description: newEdu.description,
                        });
                    }
                });
            
                return existingCV.education;
            }            

            if (newCV.experience) {
                existingCV.experience = existingCV.experience.filter(existingExp =>
                    newCV.experience.some(newExp => newExp._id && newExp._id.equals(existingExp._id))
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

            const updatedCV = await CVModel.findByIdAndUpdate(cvId, { $set: updateFields }, { new: true });

            if (!updatedCV) {
                return res.status(404).send(`Cannot update CV with id=${cvId}`);
            }

            res.status(200).send(formatUpdatedCV(updatedCV));
        } catch (error) {
            res.status(500).send(error.message || `Cannot update CV with id=${cvId}`);
        }
    },

    deleteMyCV: (req, res) => {
        const cvId = req.params.id;
        CVModel.findByIdAndDelete(cvId)
            .then((cv) => {
                res.send({
                    message: `CV with id=${cv.id} was successfully deleted`
                });
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot delete CV with id=${cvId}`);
            });
    }
};