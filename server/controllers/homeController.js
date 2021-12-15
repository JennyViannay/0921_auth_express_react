import express from 'express';
import Joi from 'joi';
const router = express.Router(); 

// Dans ce controller, toutes les routes commencent par /home cf(routes/routings.js L:8)
router.get('/', async (req, res) => {
    req.status(200).json({message : 'Hello World'});
})

export default router;