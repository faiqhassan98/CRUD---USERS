const { User, validate } = require('../model/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    // First Validate The Request
    // const { error } = validate(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }

    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        res.send(user);
    }
});

// get all users
router.get('/get', async (req, res) =>{
    let user = await User.find();
    res.send(user);
});

//get user by id

router.get('/getby-id/:_id', async (req,res) => {
    let user = await User.findById(req.params._id);
    console.log(user);
    res.send(user);
});

// user updated by id
router.put('/upd/:_id', async (req, res) => {
    let user = await User.findByIdAndUpdate(
        req.params._id,
        {
            $set: req.body
        },
        {
            new: true,
            runValidators: true
        }
    );
    await user.save();
    console.log(user);
    res.send(user);
});


// user delete by id
router.delete('/del/:_id', async (req, res) => {
    let delUser = await User.findByIdAndDelete(req.params._id);
    console.log(delUser);
    res.send(delUser);
});

module.exports = router;
