import {utils} from '../utils';
import path from 'path';
import { ObjectId } from 'mongoose';
import {IdData} from '../types/declarations';

export const organizationDecryption = (data: string) => {
    try{
        const key = utils.keys.readKey('OrganizationAuthPrivateKey', path.join(__dirname, '../../serverKeys/privateKeys'))
        const decrypted: IdData = JSON.parse(utils.keys.decryptWithPrivate(key, data));
        return {success: true, info: decrypted}
    }
    catch(err: any){
        return {success: false}
    }
}