import { Encrypted, EncryptionKey } from './../types/declarations';
import crypto, {generateKeyPairSync, publicEncrypt, privateDecrypt} from 'crypto';
import fs from 'fs';

const  generateSalt = (rounds: number) => {
    if (rounds >= 15) {
        throw new Error(`${rounds} is greater than 15,Must be less that 15`);
    }
    if (typeof rounds !== 'number') {
        throw new Error('rounds param must be a number');
    }
    if (rounds == null) {
        rounds = 12;
    }
    return crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
};

const hasher = (password: string, salt: string) => {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value: string = hash.digest('hex');
    return value
};

export const keys = {
    getPin: () => {
        return Math.floor(100000+Math.random()*900000);
      },
    getSecret: (num?: number) => {
        return crypto.randomBytes(num?num:32).toString('hex')
    }, 
    encryptWithPublic: (key: string, data: string)=> {
        const encryptBuffer = Buffer.from(data);
        const enc =  publicEncrypt(key , encryptBuffer)
        console.log("Text to be encrypted:");
        console.log(data);
        console.log("cipherText:");
        console.log(enc.toString());
        return enc.toString()
    },
    decryptWithPrivate: (key: string, data: string) => {
        const decryptBuffer = Buffer.from(data, 'hex');
        const decrypted = crypto.privateDecrypt({
            key,
            passphrase: process.env.ORGANIZATION_AUTH_TOKEN_PASSPHRASE,
          }, decryptBuffer);
    
        //print out the decrypted text
        console.log("decripted Text:");
        console.log(decrypted.toString());
    
        return decrypted.toString(); 
    },
    readKey: (keyFileName: string, pathToFile: string) => {
        const key = fs.readFileSync(`${pathToFile}/${keyFileName}.pem`, 'utf8')
        return key;
    },
    encryptPassword: (password: string, type?: string, alg?: string) => {
        //useAlg to interpret a specific hash or set one as a env variable
        const useAlg = !alg?process.env.PASSWORD_HASHING_ALGORITHIM as string:process.env[`${type?.toUpperCase}_PASSWORD_HASHING_ALGORITHIM`] as string
        const rounds = !type?process.env.PASSWORD_SALT_ROUNDS as string: process.env[`${type.toUpperCase()}_PASSWORD_SALT_ROUNDS`] as string
        const salt = generateSalt(parseInt(rounds));
        const hash = hasher(password, salt);
        const hashedPassword = salt+hash
        return hashedPassword
    },
    confirmPassword: (password: string, hashedPassword: string, type?: string, alg?: string) => {
        //useAlg to interpret a specific hash or set one as a env variable
        const useAlg = !alg?process.env.PASSWORD_HASHING_ALGORITHIM as string:process.env[`${type?.toUpperCase}_PASSWORD_HASHING_ALGORITHIM`] as string
        const rounds = !type?process.env.PASSWORD_SALT_ROUNDS as string: process.env[`${type.toUpperCase()}_PASSWORD_SALT_ROUNDS`] as string
        const salt = hashedPassword.slice(0, parseInt(rounds));
        const hash = hashedPassword.slice(parseInt(rounds), hashedPassword.length);
        const testPass = hasher(password, salt);
        if(testPass === hash) return true;
        return false;
    },
    encryptData: (data: string, keyType: EncryptionKey, alg?: string, length?: number) => {
        const key = process.env[keyType.toUpperCase()+'_ENCRYPTION_KEY'] as string;
        const iv = crypto.randomBytes(!length?16:length);
        const cipher = crypto.createCipheriv(alg?alg:'aes-256-cbc', Buffer.from(key, 'hex'), iv);
        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        const info: Encrypted = { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
        return info
    },   
    decryptData: (data: Encrypted, keyType: EncryptionKey, alg?: string ) => {
        const iv = Buffer.from(data.iv, 'hex');
        console.log({iv})
        const encryptedText = Buffer.from(data.encryptedData, 'hex');
        console.log({encryptedText})
        const key = process.env[keyType.toUpperCase()+'_ENCRYPTION_KEY'] as string;
        console.log({key})
        const decipher = crypto.createDecipheriv(alg?alg:'aes-256-cbc', Buffer.from(key, 'hex'), iv);
        console.log({decipher})
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}