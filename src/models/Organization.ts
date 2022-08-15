import mongoose, { ObjectId } from 'mongoose';
import {Scope, Security, User, IOrgMod} from '../types/declarations'


const ScopeSchema: mongoose.Schema = new mongoose.Schema<Scope>({ scope: { type: String, enum: ['email', 'phone', 'auth'] } });
const SecuritySchema: mongoose.Schema = new mongoose.Schema<Security>({twoPointAuth: {type: Boolean, default: false}, requirePhoneTwoPoint: {type: Boolean, default: false}, requirePhone: {type: Boolean, default: false}})
const UserSchema: mongoose.Schema = new mongoose.Schema<User>({id: {type: String}, roles: [{type: String, enum: ['user', 'admin', 'developer', 'manager']}]})
const OrgSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: [true, "Please provide a organization name"],
        lowercase: true
    },
    orgEmail: {
        type: String,
        lowercase: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    orgPhone: {
        type: String,
    },
    orgPhoneEmail: {
        type: String
    },
    owner: {
        type: String,
        required: [true, "Owner must be included"],
        select: false
    },
    secret: {
        type: String,
        select: false
    },
    scopes: [{
        type: String, 
        enum: ['email', 'phone', 'authorization'] 
    }],
    redirects: [{
        type: String
    }],
    users: [{
        type: UserSchema,
        select: false
    }], 
    admins: [{
        type: String,
        select: false
    }],
    orgType: {
        type: String,
        enum: ['private', 'public'],
        default: 'public',
        select: false
    },
    emailPin: {
        type: String,
        default: '',
        select: false
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    unverifiedEmail: {
        type: String,
        default: '',
        select: false,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    phonePin: {
        type: String,
        default: '',
        select: false
    },
    phoneVerified: {
        type: Boolean,
        default: false
    },
    unverifiedPhone: {
        type: String,
        default: '',
        select: false,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    securityRequirements: {
        type: SecuritySchema,
        select: false
    },
    styles: {
        type: String,
        require: [true, "Styles must be included for organization"]
    }
});

export const Organization = mongoose.model<IOrgMod>("Organization", OrgSchema);

