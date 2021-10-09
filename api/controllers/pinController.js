const Pin = require('../models/Pin')

module.exports = {

    async new(req, res) {
        const currentPin = new Pin(req.body)
        const verifyPin = await Pin.findOne({ title: currentPin.title })

        if (!verifyPin) {
            try {
                await currentPin.save()
                res.send(`Pin Saved`)
            } catch (err) {
                console.log(`Save failed pin : ${err.message}`);
            }
        } else {
            res.status(400).send(`This pin already exists`)
        }
    },

    async getAll(req, res) {
        const Pins = await Pin.find()
        res.status(200).send(Pins)
    }


}