const router = require("express").Router()
const Roles = require("./roles-model");

router.get("/roles", (req, res) => {
    Roles.getAll()
    .then(roles => {
        res.status(200).json(roles);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});




module.exports = router;