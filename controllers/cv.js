const CVModel = require("../models/CV");
UserModel = require('./../models/User');
const { verifyCV } = require('../validator/cv');
const { validateEducationDate, validateExperienceDate } = require('../validator/cvDateConverter');
const { convertToCustomFormat } = require('../utils/dateConverter');

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
                const formattedCVs = cvs.map(cv => ({
                    description: cv.description,
                    education: cv.education,
                    experience: cv.experience,
                    skills: cv.skills,
                    user: {
                        firstname: cv.user.firstname,
                        lastname: cv.user.lastname,
                        email: cv.user.email,
                        phone: cv.user.phone,
                        address: cv.user.address
                    }
                }));
    
                res.send(formattedCVs);
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message
                });
            })
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
            res.send({
                description: cv.description,
                education: cv.education,
                experience: cv.experience,
                skills: cv.skills,
                user: {
                    firstname: cv.user.firstname,
                    lastname: cv.user.lastname,
                    email: cv.user.email,
                    phone: cv.user.phone,
                    address: cv.user.address
                }
            });
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message
            });
        })
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
                res.status(400).send({
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

            const formattedEducation = newCV.education.map(edu => ({
                ...edu,
                startDate: convertToCustomFormat(edu.startDate),
                endDate: convertToCustomFormat(edu.endDate)
            }));
    
            const formattedExperience = newCV.experience.map(exp => ({
                ...exp,
                startDate: convertToCustomFormat(exp.startDate),
                endDate: convertToCustomFormat(exp.endDate)
            }));

            const { _id, description, skills, visible, user: userCV } = newCV;
            res.status(201).send({
                id: _id,
                description,
                education: formattedEducation,
                experience: formattedExperience,
                skills,
                visible,
                user: {
                    id: userCV.userId,
                    firstname: userCV.firstname,
                    lastname: userCV.lastname,
                    email: userCV.email,
                    phone: userCV.phone,
                    address: userCV.address
                }
            });

        } catch (error) {
            res.status(400).send({
                message: error.message || 'Something Wrong'
            });
        }
    },
    updateMyCV: async (req, res) => {
        const cvId = req.params.id;
        const cv = await CVModel.findById(cvId);
        if (!cv) {
            throw new Error('Cannot find CV to update');
        }
        const newCV = { ...cv, ...req.body };

        verifyCV(newCV);
        const { description, education, experience, skills, visible } = newCV;
        CVModel.findByIdAndUpdate(
            cvId,
            {
                description,
                education,
                experience,
                skills,
                visible
            },
            { new: true }
        )
            .then((updateMyCV) => {
                res.send(updateMyCV);
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot update CV with id=${cvId}`);
            });
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
