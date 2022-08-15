import {Document, ObjectId} from "mongoose";


export type Role = 'user' | 'admin' | 'developer' | 'manager'

export type Scope = 'authorization' | 'email' | 'phone' | 'profile'

export interface User {
    id: string,
    roles?: Array<Role>,
}

export interface RequestBody {
    midware: Midware
}

export interface Encrypted {
    iv: string,
    encryptedData: string
}

export interface OrgAccessData {
    code: string,
    orgId: string,
    scopes: Array<Scope>,
    userId: string
}

export interface Profile {
    firstName: string,
    lastName: string
}

export interface PrivateUserRequest {
    email: string,
    roles: Role[]
}

export type VerifyPin = string
 
export interface IdData {
    id: string,
    phoneVerified: boolean,
    emailVerified: boolean,
    email?: string,
    username?: string,
    phoneNumber?: string,
    phoneCarrierEmail?: string,
    accessToken?: string,
    refreshToken?: string,
    profile?: Profile,
}

export interface Midware {
    data?: IdData,
    scopes?: Array<Scope>
    organizations?: IOrg | IOrg[],
    accessId?: string
}

export interface AddOrgBody {
    orgName: string,
    orgEmail: string,
    scopes: Scope[],
    orgPhone?: string,
    orgPhoneEmail?: string,
    redirects: string[]
}

export interface UpdateOrg {
    orgName?: string,
    orgEmail?: string,
    scopes?: Scope[],
    orgPhone?: string,
    orgPhoneEmail?: string,
    redirects?: Array<string>
}

export interface UpdateOrgUserRoles {
    roles: Role[],
}

export interface AdminBody {
    admin: Admin
}

export interface Admin {
    id: string
}

export interface Security {
    twoPointAuth: boolean,
    requirePhoneTwoPoint: boolean,
    requirePhone: boolean
}

export interface IOrg {
    orgName: string,
    orgEmail: string,
    orgPhone?: string,
    orgPhoneEmail?: string,
    owner: string,
    secret: string,
    scopes: Array<Scope>,
    redirects: Array<string>,
    users: User[] | [],
    admins?: Admin[],
    orgType: 'private' | 'public',
    emailPin?: string,
    emailVerified?: boolean,
    unverifiedEmail?: string,
    phonePin?: string,
    phoneVerified?: boolean,
    unverifiedPhone?: string,
    styles: string,
    security?: Security,
    
}

export interface IOrgMod extends IOrg, Document{}


export interface Redirect {
    redirect: string
}

export interface Options {
    alg: string,
    exp: string,
    aud?: string,
    sub?: ObjectId | string,
    iss: string,
    tai: string
}

export interface UserInfo {
    iss: string,
    azp: string,
    aud: string,
    sub: string,
    email: string,
    email_verified: string,
    at_hash: string,
    name: string,
    picture: string,
    given_name: string,
    family_name: string,
    locale: string,
    tai: number,
    exp: number
}

export interface Payload {
    id: ObjectId | string,
    username?: string
}

export interface VerifiedToken {
    isVerified: boolean,
    expired: boolean,
    payload: Payload | UserInfo,
    header: Options
}

export interface TemplateStyles {
    screenBackgroundColor: string,
    screenWidth: string,
    screenHeight: string,
    titleBoxWidth: string
    titleBoxHeight: string,
    titleBoxDisplayType: string,
    titleBoxAlignItems: string,
    titleBoxJustifyContent: string,
    titleBoxFlexDirection: string,
    titleFontSize: string,
    titleColor: string,
    identifierBoxHeight: string,
    identifierBoxWidth: string,
    identifierBoxDisplayType: string,
    identifierBoxAlignItems: string,
    identifierBoxJustifyContent: string,
    identifierBoxFlexDirection: string,
    selectUserListBackgroundColor: string,
    selectUserBoxListFlexDirection: string,
    selectUserBoxListAlign: string,
    selectUserBoxListJustify: string,
    selectUserBoxBackgroundColor: string,
    selectUserBoxBorderType: string,
    selectUserBoxBorderColor: string,
    selectUsernameTextColor: string,
    selectUsernameFontSize: string,
    selectUserBoxBorderSize: string,

    consentsBoxHeight: string,
    consentsBoxWidth: string,
    consentsBoxDisplayType: string,
    consentsBoxAlignItems: string,
    consentsBoxJustify: string,
    consentsBoxFlexDirection: string,
    consentAckBoxDisplay: string,
    consentAckBoxFlexDirection: string,
    consentAckBoxAlign: string,
    consentAckBoxJustify: string,
    consentAckFontSize: string
    consentAckFontColor: string,
    buttonsBoxHeight: string,
    buttonsBoxWidth: string,
    buttonsBoxDisplay: string,
    buttonsBoxFlexDirection: string,
    buttonsBoxAlign: string,
    buttonsBoxJustify: string,

    nextButtonBackgroundColor: string,
    nextButtonFontColor: string, 
    nextButtonBorderSize: string,
    nextButtonBorderType: string
    nextButtonBorderColor: string,
    
    backButtonBackgroundColor: string,
    backButtonFontColor: string,
    backButtonBorderSize: string,
    backButtonBorderType: string,
    backButtonBorderColor: string,

    submitButtonBackgroundColor: string,
    submitButtonFontColor: string,
    submitButtonBorderSize: string,
    submitButtonBorderType: string,
    submitButtonBorderColor: string

    passwordBoxHeight: string,
    passwordBoxWidth: string,
    passwordBoxDisplayType: string,
    passwordBoxAlign: string,
    passwordBoxJustify: string,
    passwordBoxFlexDirection: string

    consentBoxHeight: string,
    consentBoxWidth: string,
    consentBoxDisplayType: string,
    consentBoxAlign: string,
    consentBoxFlexDirection: string,
    consentBoxJustify: string,
    consentItemFontSize: string,
    consentItemsFontColor: string,


}

export interface AddOrgBody {
    orgName: string,
    orgEmail: string,
    scopes: Scope[],
    redirects: Array<string>,
    styles?: TemplateStyles
}

export interface UpdateOrg {
    orgName?: string,
    orgEmail?: string,
    scopes?: Scope[],
    orgPhone?: string,
    orgPhoneEmail?: string,
    redirects?: Array<string>
}

export type KeyType = 'access'|'refresh'|'access'|'login'|'phone'|'email' | 'organization_invite'

export interface SignJwt {
    type: KeyType, 
    id: ObjectId | string, 
    hostname: string, 
    ip?: string,
    alg?: string
}

export interface TokenType {
    key: string,
    passphrase: string,
    exp: string
}


export type EncryptionKey = 'organization' | 'userData' | 'verification' | 'access'

