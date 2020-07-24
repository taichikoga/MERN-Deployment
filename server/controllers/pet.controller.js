const { Pet } = require("../models/pet.model");

module.exports.index = (req, res) => {
    res.json({
        message: "Hello World"
    });
}

module.exports.createPet = (req, res) => {
    const { name, type, description, skill_1, skill_2, skill_3 } = req.body;
    Pet.create({
        name,
        type,
        description,
        skill_1,
        skill_2,
        skill_3
    })
        .then(pet => res.json(pet))
        .catch(err => res.status(400).json(err));
}

module.exports.getAllPets = (req, res) => {
    Pet.find()
        .then(pets => {
            pets.sort(function(a,b) {
                if(a.type < b.type) {
                    return -1;
                }
                if(a.type > b.type) {
                    return 1;
                }
                return 0;
            })
            res.json(pets);
        })
        .catch(err => res.json(err))
}

module.exports.getOnePet = (req, res) => {
    Pet.findOne({ _id: req.params.id })
        .then(pet => res.json(pet))
        .catch(err => res.json(err))
}

module.exports.updatePet = (req, res) => {
    Pet.findOneAndUpdate({_id: req.params.id}, req.body, { runValidators: true, new:true})
        .then(updatedPet => res.json(updatedPet))
        .catch(err => res.status(400).json(err))
}

module.exports.deletePet = (req, res) => {
    Pet.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}