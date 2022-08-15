import { controllers } from '../controllers';
import express from 'express';
const router = express.Router();

router.get('/consent-screen', controllers.consentScreenController.getStyles);

export const consentRouter = router



