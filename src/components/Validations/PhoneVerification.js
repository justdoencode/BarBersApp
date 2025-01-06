import auth from "@react-native-firebase/auth"
import { RecaptchaVerifier } from "firebase/auth";


function setupRecaptcha() {
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible', 
      callback: (response) => {
        console.log("reCAPTCHA doğrulandı:", response);
      }
    }, auth);
  
    recaptchaVerifier.render();
  }