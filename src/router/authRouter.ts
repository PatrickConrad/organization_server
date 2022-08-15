import { authControllers } from './../controllers/authControllers';
import { middleware } from './../middleware/index';
import { controllers } from '../controllers';
import express from 'express';
const router = express.Router();

router.post('/organization-authorization', middleware.authMiddleware.getData, controllers.authControllers.authorizeNewOrgUser)
router.post('/update-access', middleware.authMiddleware.hasAccess, controllers.authControllers.updateAccess)
router.post('/update-refresh', middleware.authMiddleware.hasAccess, controllers.authControllers.updateRefresh)

export const authRouter = router



