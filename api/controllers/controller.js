const express = require('express');
const Signee = require('../model/model.js');
const path = require('path');
const csv = require('csv-express');

const app = express()
app.use(express.static(path.join(__dirname, 'public')));
let public = path.join(__dirname, 'public');
app.use('/', express.static(public));
app.set("view engine", "jade");
app.set("views", path.join(__dirname, "views"));

// Create and Save a new signee
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.content) {
    //     return res.status(400).send({
    //         message: "body content can not be empty"
    //     });
    // }

    // Create a signee
    const signee = new Signee({
        fullName: req.body.fullName,
        email: req.body.email
    });

    // Save signee in the database
    signee.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User Record."
            });
        });
};

// Retrieve and return all signees from the database.
exports.findAll = (req, res) => {
    Signee.find()
        .then(signees => {
            res.status(201).render('list',{title:"Orbit Finance Email List", signeeList:signees})
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving signees."
            });
        });
};

exports.getcsv = (req,res, next) => {
    let filename = "emails.csv";

    let dataArray;

    Signee.find().lean().exec()
        .then((signees) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename=' +filename);
            res.csv(signees, true);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving signees."
            });
        })
}

// Find a single signee with an ID
exports.findOne = (req, res) => {
    Signee.findById(req.params.signeeID)
        .then(signee => {
            if (!signee) {
                return res.status(404).send({
                    message: "Signee not found with id " + req.params.signeeID
                });
            }
            res.send(signee);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "signee not found with id " + req.params.signeeID
                });
            }
            return res.status(500).send({
                message: "Error retrieving signee with id " + req.params.signeeID
            });
        });
};