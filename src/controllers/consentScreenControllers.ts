import { setConsentView } from './../constants';
import { helpers } from './../helpers';
import { utils } from './../utils/index';
import { models } from '../models';
import { NextFunction, Request, Response } from "express";
import {defaultStyles} from '../constants';
import {TemplateStyles, VerifiedToken, Payload, Options, IOrgMod} from '../types/declarations'

export const consentScreenController = {
    getStyles: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const orgId = req.query.orgId as string;
            const redirect = req.query.redirect as string;
            const org = await models.Organization.findById(orgId) as IOrgMod;
            if(!redirect || redirect===undefined){
                return res.status(404).json({
                    success: false,
                    styles: 'false',
                    message: "Must specifiy redirect"
                })
            }
            if(!org.redirects.includes(redirect)){
                return res.status(404).json({
                    success: false,
                    styles: 'false',
                    message: "Unapproved redirect"
                })
            }
            
            res.status(200).json({
                styles: org.styles,
                success: true
            })
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: "Internal Error"
            })
        }
    }
}