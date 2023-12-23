const db = require("../models");
const Animal = db.animals;
const Op = db.Sequelize.Op;

// Create and Save a new Animal
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Animal
    const animal = {
      name: req.body.name,
      category: req.body.category,
      inside_zoo: req.body.inside_zoo ? req.body.inside_zoo : false
    };
  
    // Save Animal in the database
    Animal.create(Animal)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Animal."
        });
      });
  };

// Retrieve all Animals from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Animal.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Animals."
        });
      });
  };

// Find a single Animal with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Animal.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Animal with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Animal with id=" + id
        });
      });
  };

// Update a Animal by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Animal.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Animal was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Animal with id=${id}. Maybe Animal was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Animal with id=" + id
        });
      });
  };

// Delete a Animal with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Animal.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Animal was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Animal with id=${id}. Maybe Animal was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Animal with id=" + id
        });
      });
  };

// Delete all Animals from the database.
exports.deleteAll = (req, res) => {
    Animal.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Animals were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Animals."
        });
      });
  };

// Find all published Animals
exports.findAllPublished = (req, res) => {
    Animal.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Animals."
      });
    });
};