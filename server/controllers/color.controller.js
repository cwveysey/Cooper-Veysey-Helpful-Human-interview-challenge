const db = require("../models");
const Color = db.colors;
const Op = db.Sequelize.Op;

// Configured per https://www.bezkoder.com/node-js-sequelize-pagination-mysql/
const getPagination = (page, size) => {
    const limit = size ? +size : 12;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

// Configured per https://www.bezkoder.com/node-js-sequelize-pagination-mysql/
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: colors } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, colors, totalPages, currentPage };
};

// Create and Save a new Color
exports.create = (req, res) => {
    // Validate request
    if (!req.body.hex_code) {
        res.status(400).send({
            message: "hex_code cannot be empty!"
        });
        return;
    }
    if (!req.body.group) {
        res.status(400).send({
            message: "group cannot be empty!"
        });
        return;
    }
    if (!req.body.rgb_string) {
        res.status(400).send({
            message: "rgb_string cannot be empty!"
        });
        return;
    }
    // Create a Color
    const color = {
        id: req.body.id,
        hex_code: req.body.hex_code,
        group: req.body.group,
        rgb_string: req.body.rgb_string
    };
    // Save Color in the database
    Color.create(color)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while creating the Color record."
            });
        });
};

// Retrieve all Colors from the database. Configured per https://www.bezkoder.com/node-js-sequelize-pagination-mysql/
exports.findAll = (req, res) => {
    const { page, size, group } = req.query;
    var condition = group ? { group: { [Op.iLike]: `%${group}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    Color.findAndCountAll({ where: condition, limit, offset }) 
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving colors."
            });
        });
};

// Find a single Color with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Color.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Color with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Color with id=" + id
            });
        });
};
// Update a Color by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Color.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Color was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Color with id=${id}. Maybe Color was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Color with id=" + id
            });
        });
};
// Delete a Color with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Color.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Color was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Color with id=${id}. Maybe Color was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Color with id=" + id
            });
        });
};
// Delete all Colors from the database.
exports.deleteAll = (req, res) => {
    Color.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Colors were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all colors."
            });
        });
};
// Find all published Colors
exports.findAllByGroup = (req, res) => {
    const group = req.params.group;
    var condition = group ? { group: { [Op.iLike]: `%${group}%` } } : null;
    Color.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving colors."
            });
        });
};