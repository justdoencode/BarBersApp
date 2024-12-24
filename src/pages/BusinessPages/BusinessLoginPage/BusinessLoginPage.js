import React from "react";
import { Image, Text, View } from "react-native";
import { Formik } from "formik";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

import Input from "../../../components/Input/Input";
import styles from "./BusinessLoginPage.style"
import Button from "../../../components/Button/Button";
import { showMessage } from "react-native-flash-message";




const BusinessLoginPage = ({ navigation }) => {

    const initialValues = {
        email: "",
        password: "",
    }

    async function handleFormSubmit(formValues, { resetForm }) {
        try {
            const currentUser = await auth()
                .signInWithEmailAndPassword(formValues.email, formValues.password)

            const user = currentUser.user;

            const userDoc = await firestore().collection("users").doc(user.uid).get();
            if (userDoc.exists) {

                const userData = userDoc.data();

                if (userData.role == "business") {
                    navigation.navigate("BusinessHomePage")
                    resetForm();
                } else {
                    showMessage({
                        message: "Kullanıcı Rolünüz Bu Girişe Uygun Değil!",
                        type: "danger"
                    })
                }

            } else {
                showMessage({
                    message:"Kullanıcı Bulunamadı!",
                    type:"danger"
                })
            }
        } catch (error) {
            showMessage({
                message: "Giriş Yaparken Bir Hata Oluştu!",
                type: "danger"
            })
        }

    }
    return (
        <View style={styles.conteiner}>
            <View style={styles.image_conteiner}>
                <Image source={require("../../../asstes/business.png")} style={styles.image} />
            </View>
            <View style={styles.line}></View>
            <Text style={styles.title}>İŞLETME GİRİŞ</Text>
            <View style={styles.line}></View>

            <Formik initialValues={initialValues}
                onSubmit={handleFormSubmit}>

                {({ values, handleChange, handleSubmit }) => (
                    <View style={styles.input_conteiner}>

                        <Input
                            placeholder={"E mail.."}
                            onChange={handleChange("email")}
                            value={values.email}
                        />

                        <Input
                            placeholder={"Şifre.."}
                            secure={true}
                            onChange={handleChange("password")}
                            value={values.password} />

                        <Button title="Giriş" onPress={handleSubmit} />
                        <Button title="Kayıt" style="secondary" onPress={() => navigation.navigate("BusinessSignInPage")} />

                    </View>
                )}
            </Formik>

        </View>
    )
}

export default BusinessLoginPage;