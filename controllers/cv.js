const CVModel = require("../models/CV");
const UserModel = require('./../models/User');
const { verifyCV } = require('../validator/cv');
const { validateEducationDate, validateExperienceDate } = require('../validator/cvDateConverter');
const { updateEducation, updateExperience, formatUpdatedCV, formatCVResponse} = require('../utils/cv');

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
                description: req.body.description,
                education: req.body.education,
                experience: req.body.experience,
                skills: req.body.skills,
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

            if (newCV.description && newCV.description !== existingCV.description) {
                updateFields.description = newCV.description;
            }
            if (newCV.skills && JSON.stringify(newCV.skills) !== JSON.stringify(existingCV.skills)) {
                updateFields.skills = newCV.skills;
            }
            if (newCV.visible !== undefined && newCV.visible !== existingCV.visible) {
                updateFields.visible = newCV.visible;
            }

            if (newCV.education) {
                existingCV.education = updateEducation(existingCV.education, newCV.education);
                updateFields.education = existingCV.education;
            }

            if (newCV.experience) {
                existingCV.experience = updateExperience(existingCV.experience, newCV.experience);
                updateFields.experience = existingCV.experience;
            }

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