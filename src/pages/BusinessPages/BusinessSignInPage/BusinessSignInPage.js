
import React from "react";
import { Text, View } from "react-native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"
import { showMessage } from "react-native-flash-message";
import { Formik } from "formik";


import styles from "./BusinessSignInPage.style"
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";


const BusinessSignInPage = ({ navigation }) => {

    const businessData = {
        email: "",
        password: "",
        business_name: "",
        owner: "",
        city: "",
        district: "",
        address: "",
        phone_number: "",
    }



    async function handleFormSubmit(formValues, {resetForm}) {
        console.log(formValues)
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(formValues.email, formValues.password)
            const user = userCredential.user;

            await firestore().collection("users").doc(user.uid).set({
                email: formValues.email,
                role: "business",
                createdAt: firestore.FieldValue.serverTimestamp(),
            })

            showMessage({
                message: "Kullanıcı Başarıyla Kaydedildi",
                type: "success"
            })
            navigation.navigate("BusinessLoginPage")
            resetForm();

        } catch (error) {
            console.error(error)
            showMessage({
                message: "Kullanıcı Kaydedilirken Bir Hata Oluştu!",
                type: "danger"
            })
        }
    }


    return (
        <View style={styles.conteiner}>
            <View style={styles.line}></View>
            <Text style={styles.title}>İŞLETME KAYIT</Text>
            <View style={styles.line}></View>

            <View style={styles.input_conteiner}>
                <Formik initialValues={businessData}
                    onSubmit={handleFormSubmit}
                >
                    {({ values, handleChange, handleSubmit }) => (
                        <>
                            <Input
                                placeholder="Email adresi.."
                                onChange={handleChange("email")}
                                value={values.email} />

                            <Input
                                placeholder="Parola.."
                                onChange={handleChange("password")}
                                value={values.password} />

                            <Input
                                placeholder="İşletme Adı.."
                                onChange={handleChange("business_name")}
                                value={values.business_name} />

                            <Input
                                placeholder="İşletme Sahibi.."
                                onChange={handleChange("owner")}
                                value={values.owner} />

                            <Input
                                placeholder="İşletmenin Bulunduğu İl.."
                                onChange={handleChange("city")}
                                value={values.city} />

                            <Input
                                placeholder="İşletmenin Bulunduğu İlçe.."
                                onChange={handleChange("district")}
                                value={values.district} />

                            <Input
                                placeholder="Adres.."
                                multiline={true}
                                onChange={handleChange("address")}
                                value={values.address} />

                            <Input
                                placeholder="Randevu Telefon Numarası.."
                                onChange={handleChange("phone_number")}
                                value={values.phone_number}
                                keyboardType="numeric" />

                            <View style={styles.button_conteiner}>
                                <Button title="KAYDET" onPress={handleSubmit} />
                            </View>

                        </>
                    )}

                </Formik>

            </View>
        </View>
    )
}

export default BusinessSignInPage;