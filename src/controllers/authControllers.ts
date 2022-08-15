import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import { models } from "../models";
import {utils} from '../utils';
import ErrorResponse from "../utils/errorResponse";
import {RequestBody, User, VerifiedToken, Payload, Midware, Role, IOrgMod} from '../types/declarations'


export const authControllers = {
    authorizeNewOrgUser: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const body: RequestBody = req.body;
            console.log({body})
            const midware: Midware = body.midware;
            if(!midware.data) {
                return res.status(404).json({
                    success: false,
                    message: "No data"
                })
            }
            console.log({midware})
            const org = midware.organizations as IOrgMod;
            const users = org.users as User[];
            const exists = users?.find(u=>u.id === midware.data?.id);
            if(!exists){
                const userRoles: Role[] = ['user']
                const newUser: User = {id: midware.data.id, roles: userRoles}
                org.users = [...users, newUser];
                await org.save()
            }
            const data = {
                isAuth: false,
                accessToken: '',
                refreshToken: '',
                firstName: '',
                lastName: '',
                phoneVerified: false,
                phoneNumber: '',
                phoneCarrierEmail: '',
                emailVerified: true,
                email: ''
            };
            if(midware.scopes && midware.scopes.length>=1 && midware.scopes.includes('authorization')) {
                data.isAuth = true;
                data.accessToken = midware.data.accessToken?midware.data.accessToken:'';
                data.refreshToken = midware.data.refreshToken?midware.data.refreshToken:'';
            }
            if(midware.scopes && midware.scopes.length>=1 && midware.scopes.includes('profile')) {
                const userToken = utils.jwts.signToken({id: midware.data.id, hostname: req.hostname, type: 'access'});
                if(!userToken.token) return next(new ErrorResponse("No token generated", 500));
                const res = await axios.get('http://localhost:8091/api/v1/users/getProfile', {
                    headers: {
                        'Authorization': `Bearer ${userToken.token}`
                    }
                });
                if(!res.data || !res.data.success) return next(new ErrorResponse("No response data from user server", 500));
                data.firstName = res.data.user?.firstName;
                data.lastName = res.data.user?.lastName;
            }
            if(midware.scopes && midware.scopes.length>=1 && midware.scopes.includes('phone')) {
                data.phoneVerified = midware.data?.phoneVerified;
                data.phoneNumber = midware.data.phoneNumber as string;
                data.phoneCarrierEmail = midware.data.phoneCarrierEmail as string;
            }
            if(midware.scopes && midware.scopes.length>=1 && midware.scopes.includes('email')) {
                data.emailVerified = midware.data.emailVerified;
                data.email = midware.data.email as string;
            }
            return res.status(201).json({
                success: true,
                user: data
            })
        }
        catch(err){
            next(err)
        }
    },
    checkAccess: async (req: Request, res: Response, next: NextFunction) => {
        try{
            //use this to send access and refresh tokens and check org auth
            
            console.log('first')
        }
        catch(err){
            next(err)
        }
    },
    updateRefresh: async (req: Request, res: Response, next: NextFunction) => {
        try{
            console.log('first')
        }
        catch(err){
            next(err)
        }
    },
    updateAccess: async (req: Request, res: Response, next: NextFunction) => {
        try{
            console.log('first')
        }
        catch(err){
            next(err)
        }
    }
}