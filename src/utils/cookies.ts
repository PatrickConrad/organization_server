import {Request} from 'express'
import { CookieOptions } from 'express';

export const cookies = {
    setOptions: (exp: number ,type?: string ) => {
        try{
            const cookieOptions: CookieOptions = {
                expires: new Date(exp),
                secure: true,
                httpOnly: true,
                sameSite: 'strict'
            }
            if(process.env.NODE_ENV==='development' && type === 'client'){
                cookieOptions.secure = false;
                cookieOptions.sameSite = 'lax';
                cookieOptions.httpOnly = false;
                console.log({cookieOptions})
                return cookieOptions;
            }
            if(process.env.NODE_ENV==='development'){
                cookieOptions.secure = false;
                cookieOptions.sameSite = 'lax';
                return cookieOptions;
            }
            if(type==='access'){
                cookieOptions.sameSite = 'lax'
            }

            //if type exists special handlers here 
            if(type === 'client'){
                cookieOptions.httpOnly = false;
                return cookieOptions
            }
            //return default options if enviornment is not development or no special type handlers
            console.log({cooks: cookieOptions})
            return cookieOptions;
        }
        catch(error){
            return {}
        }
    },
    getCookie: (req: Request, cookieName: string) => {
        if(req && req.headers.cookie){
            const stringCookies = req.headers.cookie.split(';')
            if(!cookieName) return stringCookies
            const hasCookie = stringCookies.find(c=> {
                return c.includes(cookieName)
            } )
            return !hasCookie ? false: hasCookie?.split('=')[1].replace(/%3D/g, '=').replace(/%2B/g, '+').replace(/%2F/g, '/');
        }
    }   
}