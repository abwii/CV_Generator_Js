const CVModel = require("../models/CVs");
UserModel = require('./../models/User');
const { verifyCV } = require('../validator/cv');

module.exports = {
    findAllCV: (req, res) => {
        CVModel.find()
            .then((cvs) => {
                res.send(cvs);
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message
                });
            })
    },
    findCVById: (req, res) => {
        const cvId = req.params.id;
        CVModel.findById(cvId)
        .then((cv) => {
            res.send(cv);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message
            });
        })
    },
    createMyCV: async (req, res) => {
        try {
            verifyCV(req.body);
            const user = await UserModel.findById(req.body.user);
            if (!user) {
                res.status(400).send({
                    message: 'User does not exist'
                });
            }
            const newCV = new CVModel({
                user,                             
                description: req.body.description,    
                education: req.body.education,        
                experience: req.body.experience,      
                skills: req.body.skills,              
                visible: req.body.visible
            });
            newCV.save();
            const { _id, description, education, experience, skills, visible, user: userCV } = newCV;
            res.status(201).send({
                id: _id,
                description,
                education,
                experience,
                skills,
                visible,
                user: {
                    id: userCV.userId,
                    firstname: userCV.name,
                    lastname: userCV.surname,
                    email: userCV.email,
                    phone: userCV.phoneNumber
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
                    message: `CV with id=${cv.id} was successfully delete`
                });
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot delete CV with id=${cvId}`);
            });
    }
};
