import { middleware } from './../middleware/index';
import { controllers } from '../controllers';
import express from 'express';
const router = express.Router();

router.patch('/add-admin/:id', middleware.authMiddleware.hasAccess, middleware.authMiddleware.isOwner, controllers.ownerControllers.addAdmin);
router.patch('/remove-admin/:id', middleware.authMiddleware.hasAccess, middleware.authMiddleware.isOwner, controllers.ownerControllers.removeAdmin);
router.patch('/delete-organization/:id', middleware.authMiddleware.hasAccess, middleware.authMiddleware.isOwner, controllers.ownerControllers.deleteOrganization);
router.patch('/get-owned/:id', middleware.authMiddleware.hasAccess, middleware.authMiddleware.isOwner, controllers.ownerControllers.getOwnedOrganization);
router.patch('/get-all-owned/', middleware.authMiddleware.hasAccess, middleware.authMiddleware.isOwner, controllers.ownerControllers.getOwnedOrganizations);


export const ownerRouter = router



