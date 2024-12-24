
import React from "react";
import { Text, View } from "react-native";
import { Formik } from "formik";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

import styles from "./CustomerSignInPage.style"
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { showMessage } from "react-native-flash-message";

const CustomerSignInPage = ({navigation}) => {
    const customerData = {
        email: "",
        password: "",
        name: "",
        surname: "",
        city: "",
        district: "",
    }

    async function handleFormSubmit(formValues, {resetForm}) {
        try {
            const userCredential = await auth()
                .createUserWithEmailAndPassword(formValues.email, formValues.password)
            const user=userCredential.user;

            await firestore().collection("users").doc(user.uid).set({
                email:formValues.email,
                role:"customer",
                createdAt:firestore.FieldValue.serverTimestamp(),
            })

            showMessage({
                message:"Kullanıcı Başarıyla Kaydedildi",
                type:"success",
            })
            navigation.navigate("CustomerLoginPage")
            resetForm();
            
        } catch (error) {
            console.log(error)
            showMessage({
                message:"Kullanıcı Kaydedilirken Bir Hata Oluştu!",
                type:"danger",
            })
        }
    }

    return (
        <View style={styles.conteiner}>

            <View style={styles.line}></View>
            <Text style={styles.title}>MÜŞTERİ KAYIT</Text>
            <View style={styles.line}></View>

            <View style={styles.input_conteiner}>
                <Formik
                    initialValues={customerData}
                    onSubmit={handleFormSubmit}>
                    {({ values, handleChange, handleSubmit }) => (
                        <>
                            <Input
                                placeholder="Email.."
                                onChange={handleChange("email")}
                                value={values.email} />

                            <Input
                                placeholder="Parola.."
                                onChange={handleChange("password")}
                                value={values.password} />

                            <Input
                                placeholder="İsim.."
                                onChange={handleChange("name")}
                                value={values.name} />

                            <Input
                                placeholder="Soyisim.."
                                onChange={handleChange("surname")}
                                value={values.surname} />

                            <Input
                                placeholder="Bulunduğun Şehir.."
                                onChange={handleChange("city")}
                                value={values.city} />

                            <Input
                                placeholder="Bulunduğun İlçe.."
                                onChange={handleChange("district")}
                                value={values.district} />

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

export default CustomerSignInPage