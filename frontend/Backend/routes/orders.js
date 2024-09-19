const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Orders = require('../module/orderSchema');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallorders', fetchuser, async (req, res) => {
    try {
        const orders = await Orders.find({ user: req.user.id });
        res.json(orders)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addorder', fetchuser, [
    body('ProductName', 'Enter a valid Product Name').isLength({ min: 5 }),
    body('status', 'status must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { ProductName, status, ProductImage } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const order = new Orders({
                ProductName, status, ProductImage, user: req.user.id
            })
            const savedOrder = await order.save()

            res.json(savedOrder)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateorder/:id', fetchuser, async (req, res) => {
    const { ProductName, status, ProductImage } = req.body;
    try {
        // Create a newOrder object
        const newOrder = {};
        if (ProductName) { newOrder.ProductName = ProductName };
        if (status) { newOrder.status = status };
        if (ProductImage) { newOrder.ProductImage = ProductImage };

        // Find the note to be updated and update it
        let order = await Orders.findById(req.params.id);
        if (!order) { return res.status(404).send("Not Found") }

        if (order.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        order = await Orders.findByIdAndUpdate(req.params.id, { $set: newOrder }, { new: true })
        res.json({ order });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deleteorder/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let order = await Orders.findById(req.params.id);
        if (!order) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (order.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        order = await Orders.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", order: order });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router