import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import {models} from '../models';
import {utils} from '../utils';
import mongoose from 'mongoose'
import {Midware, IdData, AddOrgBody, UpdateOrg, IOrgMod, TemplateStyles} from '../types/declarations'
import { defaultStyles } from "../constants";


export const organizationControllers = {
    addOrganization: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const midware: Midware = req.body.midware
            console.log({midware})
            const userId = midware.accessId as string;
            const accessBody: AddOrgBody = req.body;
            console.log({body: req.body})
            
            const pin = utils.keys.getPin();
            console.log({pin}); //send pin to email
            const hashedPin = utils.keys.encryptPassword(`${pin}`);
            const org = new models.Organization({
                orgName: accessBody.orgName, 
                unverifiedEmail: accessBody.orgEmail,
                scopes: accessBody.scopes,
                redirects: accessBody.redirects,
                emailPin: hashedPin,
                owner: userId,
                styles: JSON.stringify(accessBody.styles?accessBody.styles:defaultStyles)
            });
            console.log({org})
            await org.save();
            const updateToken = utils.jwts.signToken({id: org._id.toString(), hostname: req.hostname, type: 'email'})
            res.cookie(
                'verifyEmail',
                updateToken.token,
                utils.cookies.setOptions(updateToken.expires, 'client')
            )
            return res.status(201).json({
                success: true,
                orgStatus: 'verifying'
            })
        }
        catch(err){
            next(err)
        }
    },
    updateOrganization: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const newOrg: UpdateOrg = req.body.organization;
            const midware: Midware = req.body.midware;
            const {id} = midware.data as IdData;
            const org = midware.organizations as IOrgMod;
            org.orgName = newOrg.orgName??org.orgName;
            if(newOrg.orgEmail && newOrg.orgPhone) {
                return res.status(400).json({
                    success: false,
                    message: "Cannot update both phone and email at the same time"
                })
            }
            if(newOrg.orgEmail){
                const pin = utils.keys.getPin()
                console.log({pin}); //send email here with pin to orgEmail
                const hashedPin = utils.keys.encryptPassword(`${pin}`);
                org.emailPin = hashedPin
                org.unverifiedEmail = newOrg.orgEmail
            }
            if(newOrg.orgPhone){
                const pin = utils.keys.getPin()
                console.log({pin}); //send email here with pin to orgPhone
                const hashedPin = utils.keys.encryptPassword(`${pin}`);
                org.phonePin = hashedPin
                org.unverifiedPhone = newOrg.orgPhone
            }
            org.scopes = !newOrg.scopes?org.scopes:[...newOrg.scopes]
            org.redirects = !newOrg.redirects?org.redirects:[...newOrg.redirects]
            const updateToken = utils.jwts.signToken({id, hostname: req.hostname, type: newOrg.orgEmail?'email':'phone' })
            if(!updateToken || !updateToken.token){
                return res.status(203).json({
                    success: true,
                    type: newOrg.orgEmail?'verify-email':newOrg.orgPhone?'verify-phone':'verified'
                })
            }
            res.cookie(
                newOrg.orgEmail?'verifyEmail':'verifyPhone',
                updateToken.token,
                utils.cookies.setOptions(updateToken.expires, newOrg.orgEmail?'email':'phone')
            )
            await org.save()
            return res.status(203).json({
                success: true,
                type: newOrg.orgEmail?'verify-email':newOrg.orgPhone?'verify-phone':'verified'
            })
        }
        catch(err){
            next(err)
        }
    },
    updateOrganizationStyles: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const midware: Midware = req.body.midware;
            const {id} = midware.data as IdData;
            const org = midware.organizations as IOrgMod;
            org.styles = req.body.styles;
            
            await org.save()
            return res.status(203).json({
                success: true
            })
        }
        catch(err){
            next(err)
        }
    },
    getOrganization: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const midware: Midware = req.body.midware;
            const org = midware.organizations as IOrgMod;
            return res.status(201).json({
                success: true,
                organization: {
                    organization_secret: org.secret, 
                    organization_id: org._id,
                    scopes: org.scopes,
                    redirectws: org.redirects,
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
    getOrganizations: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const midware: Midware = req.body.midware;
            const orgs = midware.organizations as IOrgMod[];
            const setOrgs = orgs.map(o=>{
                return {
                    organization_secret: o.secret, 
                    organization_id: o._id,
                    scopes: o.scopes,
                    redirectws: o.redirects,
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