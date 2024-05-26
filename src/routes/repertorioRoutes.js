
import { Router } from "express";
import { getHtml, getCanciones, agregarCanciones, updateCanciones, deleteCanciones } from "../controllers/repertorioControllers.js";

const router = Router()

router.get('/', getHtml)
router.get('/canciones', getCanciones)
router.post('/canciones', agregarCanciones)
router.put('/canciones/:id', updateCanciones)
router.delete('/canciones', deleteCanciones)

export default router