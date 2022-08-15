import express from 'express';
import { orgRouter } from './orgRouter';
import { ownerRouter } from './ownerRouter';
import {consentRouter} from './consentScreenRouter';
import { authRouter } from './authRouter';
import { adminRouter } from './adminRouter';

const mainRouter = express.Router();
mainRouter.use('/consent', consentRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/organizations', orgRouter);
mainRouter.use('/admin', adminRouter);
mainRouter.use('/owner', ownerRouter);

export const router = mainRouter



