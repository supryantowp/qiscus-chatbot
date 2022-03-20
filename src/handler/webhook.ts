import { Router } from 'express'
import Container from 'typedi';
import { EventHandler } from '../core/EventHandler';
import { NluService } from '../service/NluService';

const router = Router()

router.post('/', (req, res) => {
    const eventHandler = Container.get(EventHandler);
    const { payload } = req.body
    eventHandler.handleEvent(payload);
    return res.json({ success: true });
})

router.get('/', (req, res) => {
    return res.json({ msg: 'oke!' })
})

export default router