import { middleware } from './../middleware/index';
import { controllers } from '../controllers';
import express from 'express';
const router = express.Router();

router.post('/add-organization', middleware.authMiddleware.hasAccess, controllers.organizationControllers.addOrganization);
router.get('/get-organization/id', middleware.authMiddleware.hasAccess, controllers.organizationControllers.addOrganization);
router.post('/add-organization', middleware.authMiddleware.hasAccess, controllers.organizationControllers.addOrganization);


export const orgRouter = router



