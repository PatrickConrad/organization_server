import { IOrgMod, TemplateStyles } from "./types/declarations"

export const defaultStyles = {
    screenBackgroundColor: 'white',
    screenWidth: '100vw',
    screenHeight: '100vh',
    titleBoxWidth: '100vw',
    titleBoxHeight: '100px',
    titleBoxDisplayType: 'flex',
    titleBoxAlignItems: 'center',
    titleBoxJustifyContent: 'center',
    titleBoxFlexDirection: 'row',
    titleFontSize: '40px',
    titleColor: 'black',
    identifierBoxHeight: '40px',
    identifierBoxWidth: '100vw',
    identifierBoxDisplayType: 'flex',
    identifierBoxAlignItems: 'center',
    identifierBoxJustifyContent: 'center',
    identifierBoxFlexDirection: 'row',
    selectUserListBackgroundColor: 'transparent',
    selectUserBoxListFlexDirection: 'row',
    selectUserBoxListAlign: 'center',
    selectUserBoxListJustify: 'center',
    selectUserBoxBackgroundColor: 'transparent',
    selectUserBoxBorderType: 'solid',
    selectUserBoxBorderSize: '.5px',
    selectUserBoxBorderColor: 'black',
    selectUsernameTextColor: 'black',
    selectUsernameFontSize: '25px',
    consentsBoxHeight: '50px',
    consentsBoxWidth: '100vw',
    consentsBoxDisplayType: 'flex',
    consentsBoxAlignItems: 'center',
    consentsBoxJustify: 'center',
    consentsBoxFlexDirection: 'row',
    consentAckBoxDisplay: 'flex',
    consentAckBoxFlexDirection: 'row',
    consentAckBoxAlign: 'center',
    consentAckBoxJustify: 'center',
    consentAckFontSize: '20px',
    consentAckFontColor: 'black',
    buttonsBoxHeight: '50px',
    buttonsBoxWidth: '100vw',
    buttonsBoxDisplay: 'flex',
    buttonsBoxFlexDirection: 'row',
    buttonsBoxAlign: 'center',
    buttonsBoxJustify: 'center',

    nextButtonBackgroundColor: 'white',
    nextButtonFontColor: 'black', 
    nextButtonBorderSize: '.5px',
    nextButtonBorderType: 'solid',
    nextButtonBorderColor: 'black',
    
    backButtonBackgroundColor: 'white',
    backButtonFontColor: 'black',
    backButtonBorderSize: '.5px',
    backButtonBorderType: 'solid',
    backButtonBorderColor: 'black',

    submitButtonBackgroundColor: 'white',
    submitButtonFontColor: 'black',
    submitButtonBorderSize: '.5px',
    submitButtonBorderType: 'solid',
    submitButtonBorderColor: 'black',

    passwordBoxHeight: '50px',
    passwordBoxWidth: '100vw',
    passwordBoxDisplayType: 'flex',
    passwordBoxAlign: 'center',
    passwordBoxJustify: 'center',
    passwordBoxFlexDirection: 'row',

    consentBoxHeight: '50px',
    consentBoxWidth: '100vw',
    consentBoxDisplayType: 'flex',
    consentBoxAlign: 'center',
    consentBoxFlexDirection: 'row',
    consentBoxJustify: 'center',
    consentItemFontSize: '20px',
    consentItemsFontColor: 'black'
}

export const scopeDescription = {
    profile: "Allows access to your personal user information such as name and date of birth.",
    authorization: "Allows organization to use your Vboms security information to sign-up or into an account on the organization's application",
    email: "Allows access to contact or use your email address.",
    phone: "Allows access to contact or use your phone number.",
}

const consentOption = (scopeName: string, scopeDescription: string, styles: TemplateStyles)=> {
    return (`<div style="height:${styles.consentBoxHeight}px; width: ${styles.consentBoxWidth}vw; display: ${styles.consentBoxDisplayType}; align-items:${styles.consentBoxAlign}; justify-content: ${styles.consentsBoxJustify}; flex-direction: ${styles.consentBoxFlexDirection};">
        <p style="font-size: ${styles.consentItemFontSize}; color: ${styles.consentItemsFontColor}">${scopeName}: ${scopeDescription}</p>
    </div>`)
}

const getConsentView = (org: IOrgMod, styles: TemplateStyles) => {
    const getScopes = ()=> org.scopes.map(s=>{
        return consentOption(s, scopeDescription[s], styles)
    })
    const scopeString = getScopes().join('')
    const consentView = `<div style="height:${styles.consentsBoxHeight}; width: ${styles.consentsBoxWidth}; display: ${styles.consentsBoxDisplayType}; align-items:${styles.consentsBoxAlignItems}; justify-content: ${styles.consentsBoxJustify} flex-direction: ${styles.consentsBoxFlexDirection};">
            ${scopeString}
            <div style="display: ${styles.consentAckBoxDisplay}; flex-direction: ${styles.consentAckBoxFlexDirection}; align-items: ${styles.consentAckBoxAlign}; justify-content: ${styles.consentAckBoxJustify}">
                <input styles="" type='checkbox' name='consent' id='consent'/>
                <label styles="font-size:${styles.consentAckFontSize}; color: ${styles.consentAckFontColor}" for='consent'>Check here to consent</label>
                <div style="height:${styles.buttonsBoxHeight}; width: ${styles.buttonsBoxWidth}; display: ${styles.buttonsBoxDisplay}; flex-direction: ${styles.buttonsBoxFlexDirection}; align-items: ${styles.buttonsBoxAlign}; justify-content: ${styles.buttonsBoxJustify}">
                    <button style="background-color: ${styles.nextButtonBackgroundColor}; color: "${styles.nextButtonFontColor} border: ${styles.nextButtonBorderSize} ${styles.nextButtonBorderType} ${styles.nextButtonBorderColor}" onclick="goToLoginScreen()">Next</button>
                </div>
            </div>
        </div>`
    return consentView 
}

const logoutView= (org: IOrgMod, styles: TemplateStyles, authType: string)=> {
    return `<div style="height:${styles.identifierBoxHeight}; width: ${styles.identifierBoxWidth}; display: ${styles.identifierBoxDisplayType??'flex'}; align-items:${styles.identifierBoxAlignItems??'center'}; justify-content:${styles.identifierBoxJustifyContent??'center'}; flex-direction: ${styles.identifierBoxFlexDirection??'row'};">
            <h1 style="font-size: ${styles.titleFontSize}; color: ${styles.titleColor??'black'}">${org.orgName.charAt(0).toUpperCase()+org.orgName?.slice(1)+' '}+${authType==='login'?'Login':'Sign-up'}</h1>
        </div>
        <div style="height:${styles.passwordBoxHeight}; width: ${styles.passwordBoxWidth}vw; display: ${styles.passwordBoxDisplayType}; align-items:${styles.passwordBoxAlign}; justify-content: ${styles.passwordBoxJustify}; flex-direction: ${styles.passwordBoxFlexDirection};">
            <h1 style="font-size: ${styles.titleFontSize}; color: ${styles.titleColor??'black'}">${org.orgName.charAt(0).toUpperCase()+org.orgName?.slice(1)+' '}+${authType==='login'?'Login':'Sign-up'}</h1>
        </div>
        <div style="height:${styles.buttonsBoxHeight}; width: ${styles.buttonsBoxWidth}; display: ${styles.buttonsBoxDisplay}; flex-direction: ${styles.buttonsBoxFlexDirection}; align-items: ${styles.buttonsBoxAlign}; justify-content: ${styles.buttonsBoxJustify}">
            <button style="background-color: ${styles.backButtonBackgroundColor}; color: "${styles.backButtonFontColor} border: ${styles.backButtonBorderSize} ${styles.backButtonBorderType} ${styles.backButtonBorderColor}" onclick="goBackToConsentScreen()">Back</button>
            <button style="background-color: ${styles.submitButtonBackgroundColor}; color: "${styles.submitButtonFontColor} border: ${styles.submitButtonBorderSize} ${styles.submitButtonBorderType} ${styles.submitButtonBorderColor}" onclick="submit()">${authType==='login'?'Login':'Sign Up'}</button>
        </div>`
}

const loggedInView = (username: string, styles: TemplateStyles, authType: string)=> {
    return `<div style="background-color: ${styles.selectUserListBackgroundColor??'transparent'}; width: 70vw; height: 70vh; display: flex; flex-direction: ${styles.selectUserBoxListFlexDirection??'row'}; align-times: ${styles.selectUserBoxListAlign??'center'}; justify-content: ${styles.selectUserBoxListJustify??'center'}; overflow-y:auto; overflow-x:auto;">
                <div style="background-color: ${styles.selectUserBoxBackgroundColor??'transparent'} border: ${styles.selectUserBoxBorderSize??'.5px'} ${styles.selectUserBoxBorderType??'solid'} ${styles.selectUserBoxBorderColor??'black'}">
                    <p style="color: ${styles.selectUsernameTextColor??'black'}; font-size: ${styles.selectUsernameFontSize??'18px'}">
                        ${username}
                    </p>
                </div>
                <div style="height:${styles.buttonsBoxHeight}; width: ${styles.buttonsBoxWidth}; display: ${styles.buttonsBoxDisplay}; flex-direction: ${styles.buttonsBoxFlexDirection}; align-items: ${styles.buttonsBoxAlign}; justify-content: ${styles.buttonsBoxJustify}">
                    <button style="background-color: ${styles.submitButtonBackgroundColor}; color: "${styles.submitButtonFontColor} border: ${styles.submitButtonBorderSize} ${styles.submitButtonBorderType} ${styles.submitButtonBorderColor}" onclick="submit()">${authType==='login'?'Login':'Sign Up'}</button>
                </div>
            </div>`
}

export const setConsentView = (hasAccess: boolean, org: IOrgMod, styles: TemplateStyles, authType: 'login'|'signup', username?: string) => {
    const user = username??'';
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${org.orgName.charAt(0).toUpperCase()+org.orgName?.slice(1)}</title>
            </head>
            <body>
            
                <div style="height: ${styles.screenHeight}; width: ${styles.screenWidth}; background-color: ${styles.screenBackgroundColor}">
                    <div style="height:${styles.titleBoxHeight??'100px'}; width: ${styles.titleBoxWidth?? '100vw'}; display: ${styles.titleBoxDisplayType??'flex'}; align-items:${styles.titleBoxAlignItems??'center'}; justify-content:${styles.titleBoxJustifyContent??'center'}; flex-direction: ${styles.titleBoxFlexDirection??'row'};">
                        <h1 style="font-size: ${styles.titleFontSize??'40px'}; color: ${styles.titleColor??'black'}">${org.orgName.charAt(0).toUpperCase()+org.orgName?.slice(1)+' '}+${authType==='login'?'Login':'Sign-up'}</h1>
                    </div>
                    <div id="consents">
                        ${getConsentView(org, styles)}
                    </div>
                    <div id="userView">
                        ${!hasAccess?logoutView(org, styles, authType):loggedInView(user, styles, authType)}
                    </div>
                </div>

                <script>
                    const goToLoginScreen = (e)=> {
                        document.getElementById('consents').style.display = 'none';
                        document.getElementById('userView').style.display = '${styles.consentsBoxDisplayType}';
                    }
                    const goBackToConsentScreen = (e)=> {
                        document.getElementById('consents').style.display = '${styles.consentsBoxDisplayType}';
                        document.getElementById('userView').style.display = 'none';
                    }
    
                    const setIdentifier = (e) => {
                        user.identifier = e.target.value
                    }
                    const setPassword = (e) => {
                        user.password = e.target.value
                    }
                    const submit = async (e) => {
                        const res = await fetch( 'http://localhost:8090/api/v1/organization-auth'; {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            redirect: 'follow',
                            body: JSON.stringify(user)
                        });
                        return res.json(); // parses JSON response into native JavaScript objects;
                        }
                        if(!res.data.)
                          
                    }
                
                </script>
            </body>
            </html>`
}