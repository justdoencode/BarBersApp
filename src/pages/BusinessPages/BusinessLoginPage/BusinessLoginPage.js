import React from "react";
import { Image, Text, View } from "react-native";
import Input from "../../../components/Input/Input";

import styles from "./BusinessLoginPage.style"
import Button from "../../../components/Button/Button";



const BusinessLoginPage = ({navigation}) => {
    return (
        <View style={styles.conteiner}>
            <View style={styles.image_conteiner}>
                <Image source={require("../../../asstes/business.png")} style={styles.image} />
            </View>
            <View style={styles.line}></View>
            <Text style={styles.title}>İŞLETME GİRİŞ</Text>
            <View style={styles.line}></View>

            <View style={styles.input_conteiner}>
                <Input placeholder={"E mail.."} />
                <Input placeholder={"Şifre.."} secure={true}/>
                <Button title="Giriş" />
                <Button title="Kayıt" style="secondary" onPress={()=>navigation.navigate("BusinessSignInPage")}/>

            </View>
        </View>
    )
}

export default BusinessLoginPage;