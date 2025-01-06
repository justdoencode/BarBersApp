
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth"


const CustomerHomePage =()=>{

    let state=""
    const user=auth().currentUser;
    if(user){
        if(user.emailVerified){
            state="Email Doğrulanmış Hesap"
        }else{
            state="Email Doğrulanmamış Hesap!"
        }
    }
    return(
        <SafeAreaView>
            <Text>{state}</Text>
        </SafeAreaView>
    )
}

export default CustomerHomePage;