import { middleware } from './../middleware/index';
import { controllers } from '../controllers';
import express from 'express';
const router = express.Router();

router.patch('/update-roles/:id', middleware.authMiddleware.hasAccess, middleware.authMiddleware.isAdmin, controllers.adminControllers.updateUserRoles);
router.patch('/remove-user/:id', middleware.authMiddleware.hasAccess, middleware.authMiddleware.isAdmin, controllers.adminControllers.removeOrgUser);
router.patch('/verify/:type', middleware.authMiddleware.hasAccess, middleware.authMiddleware.isAdmin, controllers.adminControllers.verifyPin);
router.patch('/add-private-user/:id', middleware.authMiddleware.hasAccess, middleware.authMiddleware.isAdmin, controllers.adminControllers.addPrivateUser)
router.get('/as-admin/:id', middleware.authMiddleware.hasAccess, middleware.authMiddleware.isOwner, controllers.adminControllers.getAdminOrganization);
router.get('/get-all-admin', middleware.authMiddleware.hasAccess, middleware.authMiddleware.isOwner, controllers.adminControllers.getAdminOrganizations);

export const adminRouter = router



