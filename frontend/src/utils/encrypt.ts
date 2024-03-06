import aesjs from 'aes-js'

export type SignInInputType = 
{
    password: string,
    iv : string    
}

// Secret key of the algorithm
const secretKey = '4hv7e32D3njG6nPF7GnGpKJaJW4MNzUB'
const key = aesjs.utils.utf8.toBytes(secretKey);

/**
 * Creates the object that is going to be submited for the login.
 * For the password, it encrypts it for the submission.
 * @param password non-encrypted password
 */
export function createLoginSubmitionObject(password: string) : SignInInputType
{    
    // Generate the random iv (iv MUST be random from client side)
    const iv: any = new Uint8Array(16);
    crypto.getRandomValues(iv);
    const ivString = aesjs.utils.hex.fromBytes(iv);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, iv);
    const passwordBytes = aesjs.utils.utf8.toBytes(password);
    const passwordEncryptedBytes = aesCtr.encrypt(passwordBytes);
    const passwordEncryptedString = aesjs.utils.hex.fromBytes(passwordEncryptedBytes);        
    
    return { password:  passwordEncryptedString, iv: ivString };
}