import { ownerControllers } from './ownerControllers';
import { adminControllers } from './adminControllers';
import { authControllers } from './authControllers';
import {organizationControllers} from './organizationControllers'
import {consentScreenController}from './consentScreenControllers'
export const controllers = {
    organizationControllers,
    consentScreenController,
    authControllers,
    adminControllers,
    ownerControllers
}