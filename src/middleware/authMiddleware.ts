import { NextFunction, Request, Response } from 'express';
import mongoose, {models, ObjectId} from 'mongoose';
import { helpers } from '../helpers';
import {utils} from '../utils';
import {IdData, OrgAccessData, VerifiedToken, Payload, Midware, Encrypted, Scope} from '../types/declarations'




export const authMiddleware = {
    //check authorization
    getData: async (req: Request, res: Response, next: NextFunction)=>{
        try{
            // console.log("userEncryptedSecret: ", utils.keys.encryptPassword('eea8e4f15a8c0bc4c7900e4c4c16075d1a7e824806b8074b00e149bc9efba953'))
            const code = req.body.code as string;
            const orgId = req.query.orgId as string;
            const scopes = req.query.scopes as Scope[];
            const redirect = req.query.redirect as string;
            const secret = req.query.secret as string;
            const getData = await helpers.organizationDecryption(code)

            console.log({query: req.query})
            console.log({getData})
            if(!getData.success || !getData.info || !secret) {
                return res.status(401).json({
                    success: false,
                    message: 'Cannot decrypt data'
                })
            }
            const userInfo: IdData = getData.info
            console.log({userInfo})
            const oId = new mongoose.Types.ObjectId(orgId)
            console.log(oId.toString())
            const organization = await models.Organization.findById(oId).select('+secret');
            console.log({organization})
            console.log({redirects: organization.redirects})
            if(!redirect || !organization.redirects.includes(redirect)){
                'not included'
                return res.status(404).json({
                    success: false,
                    message: "Invalid redirect url"
                })
            }
           
            const getSecret: Encrypted = JSON.parse(organization.secret);
            console.log({getSecret})
            const decryptedSecret = utils.keys.decryptData(getSecret, 'access')
            console.log({decryptedSecret})
            const match = utils.keys.confirmPassword(decryptedSecret, secret);
            if(!match) {
                console.log({match})
                return res.status(401).json({
                    success: false,
                    message: 'Secret does not match'
                })
            }
            
            const midware: Midware = {
                ...req.body.midware,
                data: userInfo,
                scopes,
                organizations: organization,
            }
            console.log({midware})
            req.body.midware = midware;
            return next()
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: 'Internal midware error'
            })
        }

    },
    updateOrg: async (req: Request, res: Response, next: NextFunction)=>{
        try{

        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: 'Internal midware error'
            })
        }
    },
    checkAccess: async (req: Request, res: Response, next: NextFunction)=>{
        try{
            //use cookie after redirect from auth server and pass it the access token
            //only use this check for consent screen 
            const accessToken = utils.cookies.getCookie(req, 'access') as string;
            const verified = utils.jwts.verifyToken(accessToken, 'access') as VerifiedToken;
            const pl = verified.payload as Payload
            if(!verified.isVerified || verified.expired || !pl.id) {
                return res.status(401).json({
                    success: false,
                    message: "No access"
                })
            }
            const data:IdData = {
                ...req.body.midware.data
            }

            data.id = pl.id as string;

            const midware: Midware = {
                ...req.body.midware,
            }

            midware.data = data;

            req.body.midware = {...req.body.midware, midware};
            next()
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    },
    hasAccess: async (req: Request, res: Response, next: NextFunction)=>{
        try{
            console.log("TESTING Has Access")
            const accessToken = utils.cookies.getCookie(req, 'access') as string;
            console.log({accessToken})
            if(!accessToken) {
                return res.status(401).json({
                    success: false,
                    message: "You do not have permission to perform this action"
                })
            }
            const verified = utils.jwts.verifyToken(accessToken, 'access') as VerifiedToken;
            const pl = verified.payload as Payload
            if(!verified.isVerified || verified.expired || !pl.id) {
                return res.status(401).json({
                    success: false,
                    message: "No access"
                })
            }
            

            const midware: Midware = {
                ...req.body.midware,
                accessId: pl.id
            }
            console.log({userId: pl.id})

            req.body.midware = midware;

            next()
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    },
    isAdmin: async (req: Request, res: Response, next: NextFunction)=>{
        try{

            const orgToken = utils.cookies.getCookie(req, 'verifyEmail') as string;
            const userId = req.body.midware.accessId
            if(!orgToken){
                const ownedOrgs = await models.Organization.find({owner: userId});
                const adminOrgs = await models.Organization.find({admins: userId}) 
                const orgs = [...ownedOrgs, ...adminOrgs]
                const midware: Midware = {
                    ...req.body.midware,
                    organizations: [...orgs]
                }
                req.body.midware = {...req.body.midware, ...midware};
                next()
            }
            const verified = utils.jwts.verifyToken(orgToken, 'email') as VerifiedToken;
            if(!verified || !verified.isVerified || verified.expired) {
                return res.status(401).json({
                    success: false,
                    message: "Access to this organization does not exist"
                })
            }
            const pl = verified.payload as Payload;
            const orgId = pl.id;
            const org = await models.Organization.findById(orgId).select('+owner').select('+admins').select('+emailPin').select('+phonePin').select('+unverifiedEmail').select('+unverifiedPhone');
            if(!org.admins && org.owner !==userId){
                return res.status(401).json({
                    success: true,
                    message: "User does not have access"
                })
            }
            if(org.owner !== userId){
                const isAdmin = org.admins.includes(userId);
                if(!isAdmin){
                    return res.status(401).json({
                        success: false,
                        message: "No control access"
                    })
                }
                const midware: Midware = {
                    ...req.body.midware,
                    organizations: org
                }
                req.body.midware = {...midware};
                return next()
            }
            const midware: Midware = {
                ...req.body.midware,
                organizations: org
            }
            req.body.midware = {...midware};
            return next()

        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: "internal error"
            })
        }
    },
    isOwner: async (req: Request, res: Response, next: NextFunction)=>{
        try{
            const orgId = req.params.id;
            const accessToken = utils.cookies.getCookie(req, 'access') as string;
            const verified = utils.jwts.verifyToken(accessToken, 'access') as VerifiedToken;
            const pl = verified.payload as Payload
            if(!verified.isVerified || verified.expired || !pl.id) {
                return res.status(401).json({
                    success: false,
                    message: "No access"
                })
            }
            const data:IdData = {
                id:pl.id as string,
                phoneVerified: false,
                emailVerified: false
            }
            if(!orgId){
                const orgs = await models.Organization.find({owner: pl.id});
                const midware: Midware = {
                    data,
                    organizations: [...orgs]
                }
                req.body.midware = midware;
                next()
            }
            const org = await models.Organization.findById(orgId);
            if(org.owner !== data.id){
                return res.status(401).json({
                    success: true,
                    message: "User does not have access"
                })
            }

            const midware: Midware = {
                data,
                organizations: org
            }
            req.body.midware = {...req.body.midware, midware};
            next()

        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: "internal error"
            })
        }
    }
}