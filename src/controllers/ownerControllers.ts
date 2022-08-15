import { NextFunction, Request, Response } from "express";
import { Document, ObjectId } from "mongoose";
import {models} from '../models';
import {utils} from '../utils';
import {Midware, IOrgMod} from '../types/declarations'


export const ownerControllers = {
    addAdmin: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const admin = req.body.admin as string;
            const midware: Midware = req.body.midware;
            const org = midware.organizations as IOrgMod;
            org.admins = org.admins?[...org.admins, {id: admin}]:[{id: admin}];
            await org.save();
            return res.status(201).json({
                success: true,
                admins: org.admins
            })

        }
        catch(err){
            next(err)
        }
    },
    removeAdmin: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const adminId = req.body.admin as string;
            const midware: Midware = req.body.midware;
            const org = midware.organizations as IOrgMod;
            const newAdmins = org.admins?.filter(a=>a.id!==adminId)
            org.admins = newAdmins;
            await org.save();
            return res.status(201).json({
                success: true,
                admins: newAdmins
            })
        }
        catch(err){
            next(err)
        }
    },
    deleteOrganization: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const midware: Midware = req.body.midware;
            const org = midware.organizations as IOrgMod;
            await models.Organization.findByIdAndDelete(org._id);
            return res.status(201).json({
                success: true
            })
        }
        catch(err){
            next(err)
        }
    },
    getOwnedOrganization: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const midware: Midware = req.body.midware;
            const org = midware.organizations as IOrgMod;
            return res.status(201).json({
                success: true,
                organization: {
                    organization_secret: org.secret, 
                    organization_id: org._id,
                    scopes: org.scopes,
                    redirects: org.redirects,
                    phone: org.orgPhone,
                    phoneVerified: org.phoneVerified,
                    email: org.orgEmail,
                    emailVerified: org.emailVerified
                }
            })
        }
        catch(err){
            next(err)
        }
    },
    getOwnedOrganizations: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const midware: Midware = req.body.midware;
            const orgs = midware.organizations as IOrgMod[];
            const setOrgs = orgs.map(o=>{
                return {
                    organization_secret: o.secret, 
                    organization_id: o._id,
                    scopes: o.scopes,
                    redirects: o.redirects,
                    phone: o.orgPhone,
                    phoneVerified: o.phoneVerified,
                    email: o.orgEmail,
                    emailVerified: o.emailVerified
                }
            })
            return res.status(201).json({
                success: true,
                organizations: setOrgs
            })
        }
        catch(err){
            next(err)
        }
    } 
}