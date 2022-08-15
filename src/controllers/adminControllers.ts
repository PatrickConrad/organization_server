import axios from 'axios';
import { NextFunction, Request, Response } from "express";
import { Document, ObjectId, plugin } from "mongoose";
import {models} from '../models';
import {utils} from '../utils';

import {IdData, IOrg, IOrgMod, PrivateUserRequest, VerifyPin, VerifiedToken, Payload, Midware} from '../types/declarations'


export const adminControllers = {
    updateOrganization: async (req: Request, res: Response, next: NextFunction) => {
        try{
            
        }
        catch(err){
            return next(err)
        }
    },
    updateUserRoles: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const midware: Midware = req.body.midware;
            const userId = midware.data as IdData;
            const org = midware.organizations as IOrg;
            return res.status(200).json({
                success: true,
                message: "working"
            })
        }
        catch(err){
            return next(err)
        }
    },
    addPrivateUser: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const midware: Midware = req.body.midware;
            const data = midware.data as IdData;
            const id = data.id;
            const org = midware.organizations as IOrgMod;
            const user: PrivateUserRequest = req.body.user;
            const privateToken = utils.jwts.signToken({id, hostname: req.hostname, type: 'organization_invite'})
            const resp = await axios.post('http://localhost:8090/api/v1/organization/invite-user', {email: user.email}, {
                headers: {
                    'Authorization': `Bearer ${privateToken.token}`
                }
            })
            
            if(!resp.data.success || !resp.data.user.id){
                return res.status(401).json({
                    sucess: false,
                    message: "Couldn't invite user"
                })
            }

            org.users = [...org.users, {
                id: resp.data.user.id,
                roles: user.roles,
            }],
            await org.save()
            return res.status(201).json({
                success: true,
                message: "Check Email for pin"
            })


        }
        catch(err){
            return next(err)
        }
    },
    verifyPin: async (req: Request, res: Response, next: NextFunction)=>{
        try{
            console.log({params: req.params})
            const pinType = req.params.type; 
            console.log({pinType})
            const pin: VerifyPin = req.body.pin;
            console.log({body: req.body})
            console.log({pin})
            const midware: Midware = req.body.midware;
            console.log({midware})
            const org = midware.organizations as IOrgMod;
            console.log({org})
            if(!pinType || pinType==='verifyEmail'&&(!org.emailPin || !org.unverifiedEmail)||pinType==='verifyPhone'&&(!org.phonePin || !org.unverifiedPhone)){
                console.log("error with pin")
                return res.status(404).json({
                    success: false,
                    message: "Missing information"
                })
            }
            const token = utils.cookies.getCookie(req, 'verifyEmail') as string;
            console.log(token)
            if(!token || !org){
                return res.status(401).json({
                    success: false,
                    message: "Can't access"
                })
            }
            const verifyToken = utils.jwts.verifyToken(token, 'email') as VerifiedToken;
            const pl = verifyToken.payload as Payload;

            if(verifyToken.expired || !verifyToken.isVerified){
                return res.status(401).json({
                    success: false,
                    message: "Access doesn't match"
                })
            }
            const hashedPin = pinType==='email'?org.emailPin:org.phonePin;
            const match = utils.keys.confirmPassword(pin, hashedPin as string);
            if(!match){
                return res.status(401).json({
                    success: false,
                    message: "Pin did not match"
                })
            }
            const secret = utils.keys.getSecret();
            const dbEncryptedSecret = utils.keys.encryptData(secret, 'access');
            console.log({dbEncryptedSecret})
            const encryptedSecret = utils.keys.encryptPassword(secret);
            console.log({encryptedSecret})
            org.emailVerified= pinType!=='email'?org.emailVerified:true
            org.orgEmail = pinType!=='email'?org.orgEmail:org.unverifiedEmail as string;
            org.unverifiedEmail = pinType!=='email'?org.unverifiedEmail:'';
            org.phoneVerified= pinType!=='phone'?org.phoneVerified:true;
            org.orgPhone = pinType!=='phone'?org.orgPhone:org.unverifiedPhone?.split('@')[0] as string;
            org.orgPhoneEmail = pinType!=='phone'?org.orgPhoneEmail:`@${org.unverifiedPhone?.split('@')[1] as string}`;
            org.unverifiedPhone = pinType!=='email'?org.unverifiedPhone:'';
            org.secret = JSON.stringify(dbEncryptedSecret)
            await org.save();
            return res.status(201).json({
                success: true,
                organization: {email: org.orgEmail, emailVerified: org.emailVerified, phone: org.orgPhone, phoneVerified: org.phoneVerified}
            })

        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: "internal error"
            })
        }
    },
    removeOrgUser: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const id = req.params.id;
            if(!id){
                return res.status(404).json({
                    success: false,
                    message: "Id not found"
                })
            }
            return res.status(404).json({
                success: false,
                message: "Not set up yet"
            })

        }
        catch(err){
            return next(err)
        }
    },
    getAdminOrganization: async (req: Request, res: Response, next: NextFunction) => {
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
            return next(err)
        }
    },
    getAdminOrganizations: async (req: Request, res: Response, next: NextFunction) => {
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
            return next(err)
        }
    } 
}