import {TemplateStyles} from '../types/declarations';
import { defaultStyles } from '../constants';

export const styles = {
    setConsentStyles: (styles?: string) => {
        const useStyles: TemplateStyles = styles?JSON.parse(styles):defaultStyles
        const setStyles = {
            screenBackgroundColor: useStyles.screenBackgroundColor??'white',
            screenWidth: useStyles.screenWidth??'100vw',
            screenHeight: useStyles.screenHeight??'100vh',
            titleBoxWidth: useStyles.titleBoxWidth??'100vw',
            titleBoxHeight: useStyles.titleBoxHeight??'100px',
            titleBoxDisplayType: useStyles.titleBoxDisplayType??'flex',
            titleBoxAlignItems: useStyles.titleBoxAlignItems??'center',
            titleBoxJustifyContent: useStyles.titleBoxJustifyContent??'center',
            titleBoxFlexDirection: useStyles.titleBoxFlexDirection??'row',
            titleFontSize: useStyles.titleFontSize??'40px',
            titleColor: useStyles.titleColor??'black',
            identifierBoxHeight: useStyles.identifierBoxHeight??'40px',
            identifierBoxWidth: useStyles.identifierBoxWidth??'100vw',
            identifierBoxDisplayType: useStyles.identifierBoxDisplayType??'flex',
            identifierBoxAlignItems: useStyles.identifierBoxAlignItems??'center',
            identifierBoxJustifyContent: useStyles.identifierBoxJustifyContent??'center',
            identifierBoxFlexDirection: useStyles.identifierBoxFlexDirection??'row',
            selectUserListBackgroundColor: useStyles.selectUserListBackgroundColor??'transparent',
            selectUserBoxListFlexDirection: useStyles.selectUserBoxListFlexDirection??'row',
            selectUserBoxListAlign: useStyles.selectUserBoxListAlign??'center',
            selectUserBoxListJustify: useStyles.selectUserBoxListJustify??'center',
            selectUserBoxBackgroundColor: useStyles.selectUserBoxBackgroundColor??'transparent',
            selectUserBoxBorderType: useStyles.selectUserBoxBorderType??'solid',
            selectUserBoxBorderSize: useStyles.selectUserBoxBorderSize??'.5px',
            selectUserBoxBorderColor: useStyles.selectUserBoxBorderColor??'black',
            selectUsernameTextColor: useStyles.selectUsernameTextColor??'black',
            selectUsernameFontSize: useStyles.selectUsernameFontSize??'25px',
            consentsBoxHeight: useStyles.consentsBoxHeight??'50px',
            consentsBoxWidth: useStyles.consentsBoxWidth??'100vw',
            consentsBoxDisplayType: useStyles.consentsBoxDisplayType??'flex',
            consentsBoxAlignItems: useStyles.consentsBoxAlignItems??'center',
            consentsBoxJustify: useStyles.consentsBoxJustify??'center',
            consentsBoxFlexDirection: useStyles.consentsBoxFlexDirection??'row',
            consentAckBoxDisplay: useStyles.consentAckBoxDisplay??'flex',
            consentAckBoxFlexDirection: useStyles.consentAckBoxFlexDirection??'row',
            consentAckBoxAlign: useStyles.consentAckBoxAlign??'center',
            consentAckBoxJustify: useStyles.consentAckBoxJustify??'center',
            consentAckFontSize: useStyles.consentAckFontSize??'20px',
            consentAckFontColor: useStyles.consentAckFontColor??'black',
            buttonsBoxHeight: useStyles.buttonsBoxHeight??'50px',
            buttonsBoxWidth: useStyles.buttonsBoxWidth??'100vw',
            buttonsBoxDisplay: useStyles.buttonsBoxDisplay??'flex',
            buttonsBoxFlexDirection: useStyles.buttonsBoxFlexDirection??'row',
            buttonsBoxJustify: useStyles.buttonsBoxJustify??'center',
            buttonsBoxAlign: useStyles.buttonsBoxAlign??'center',
            
            nextButtonBackgroundColor: useStyles.nextButtonBackgroundColor??'white',
            nextButtonFontColor: useStyles.nextButtonFontColor??'black', 
            nextButtonBorderSize: useStyles.nextButtonBorderSize??'.5px',
            nextButtonBorderType: useStyles.nextButtonBorderType??'solid',
            nextButtonBorderColor: useStyles.nextButtonBorderColor??'black',
            
            backButtonBackgroundColor: useStyles.backButtonBackgroundColor??'white',
            backButtonFontColor: useStyles.backButtonFontColor??'black',
            backButtonBorderSize: useStyles.backButtonBorderSize??'.5px',
            backButtonBorderType: useStyles.backButtonBorderType??'solid',
            backButtonBorderColor: useStyles.backButtonBorderColor??'black',
        
            submitButtonBackgroundColor: useStyles.submitButtonBackgroundColor??'white',
            submitButtonFontColor: useStyles.submitButtonFontColor??'black',
            submitButtonBorderSize: useStyles.submitButtonBorderSize??'.5px',
            submitButtonBorderType: useStyles.submitButtonBorderType??'solid',
            submitButtonBorderColor: useStyles.submitButtonBorderColor??'black',
        
            passwordBoxHeight: useStyles.passwordBoxHeight??'50px',
            passwordBoxWidth: useStyles.passwordBoxWidth??'100vw',
            passwordBoxDisplayType: useStyles.passwordBoxDisplayType??'flex',
            passwordBoxAlign: useStyles.passwordBoxAlign??'center',
            passwordBoxJustify: useStyles.passwordBoxJustify??'center',
            passwordBoxFlexDirection: useStyles.passwordBoxFlexDirection??'row',
            consentBoxHeight: useStyles.consentBoxHeight??'50px',
            consentBoxWidth: useStyles.consentBoxWidth??'100vw',
            consentBoxDisplayType: useStyles.consentBoxDisplayType??'flex',
            consentBoxAlign: useStyles.consentBoxAlign??'center',
            consentBoxFlexDirection: useStyles.consentBoxFlexDirection??'row',
            consentBoxJustify: useStyles.consentBoxJustify??'center',
            consentItemFontSize: useStyles.consentItemFontSize??'20px',
            consentItemsFontColor: useStyles.consentItemsFontColor??'black',
        }

        return setStyles
    }
}