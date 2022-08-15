#Organization Service

- to start initialize npm and install required packages
## npm install

- add required environment variables in src/config/config.env for:
NODE_ENV (should be "development" or "production") ,
PORT,
DB_PROTOCOL,
DB_IP,
DB_NAME,
PASSWORD_SALT_ROUNDS (default if not set in built in function from src/utils/keys)

- in src/config/config.env create vars and set expiration times for: 
EMAIL_TOKEN_EXPIRES,
ORGANIZATION_INVITE_EXPIRES,
USER_SERVICE_TOKEN_EXPIRES,

- in src/config/config.env create vars and generate passphrases for: 
EMAIL_TOKEN_PASSPHRASE,
ORGANIZATION_AUTH_TOKEN_PASSPHRASE,
ORGANIZATION_INVITE_TOKEN_PASSPHRASE,
USER_SERVICE_TOKEN_PASSPHRASE,
ACCESS_ENCRYPTION_KEY,
ORGANIZATION_PHONE_TOKEN_PASSPHRASE,
ORGANIZATION_EMAIL_TOKEN_PASSPHRASE,

- in root create a serverKeys folder with two sub folders privateKeys and publicKeys
## use built in function in src/utils/keys to generate private and public keys that auto save in proper folders
- create private keys for:
#### EmailPrivateKey,
#### OrganizationAuthPrivateKey,
#### OrganizationInvitePrivateKey,
#### PhonePrivateKey,
#### UserPrivateKey,
- create private keys for:
#### AccessPublicKey,
#### EmailPublicKey,
#### OrganizationAuthPublicKey,
#### PhonePublicKey
#### UserPublicKey
