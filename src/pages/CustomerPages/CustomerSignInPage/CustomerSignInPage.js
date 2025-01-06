
import React from "react";
import { Text, View } from "react-native";
import { Formik } from "formik";
import firestore, { collection, getFirestore, query, where, getDocs } from "@react-native-firebase/firestore"
import auth, { deleteUser, sendEmailVerification} from "@react-native-firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";

import styles from "./CustomerSignInPage.style"
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { showMessage } from "react-native-flash-message";

const CustomerSignInPage = ({ navigation }) => {
    const customerData = {
        email: "",
        password: "",
        phoneNumber: "",
        name: "",
        surname: "",
        city: "",
        district: "",
    }

    function setupRecaptcha() {
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          size: 'invisible', // reCAPTCHA'nın görünür olmasını istemiyorsanız 'invisible' yapabilirsiniz
          callback: (response) => {
            console.log("reCAPTCHA doğrulandı:", response);
          }
        }, auth);
      
        recaptchaVerifier.render();
      }

    async function handleFormSubmit(formValues, { resetForm }) {
        try {

            //Firebase Authentication ile kullanıcı oluşturma
            const userCredential = await auth().createUserWithEmailAndPassword(formValues.email, formValues.password)
            const userRecord = userCredential.user;

            //Email doğrulama mesajı gönderme
            await sendEmailVerification(userRecord)

            //Firebase Firestore ile kullanıcı bilgilerini kaydetme
            //Eklenmek istenen kullanıcının telefon numarası ile daha önce kayıtlı bir kullanıcı olup olmadığını kontrol etme
            const db = getFirestore();
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("phoneNumber", "==", formValues.phoneNumber));
            const querySnapshot = await getDocs(q);
            //Telefon numarası mevcut ise kullanıcıyı ekleme ve hata mesajı göster
            if (!querySnapshot.empty) {
                showMessage({
                    message: "Bu telefon numarası ile kayıtlı bir kullanıcı bulunmaktadır!",
                    type: "danger",
                })
                deleteUser(auth().currentUser)
                return;
            } else {
                //Telefon numarası mevcut değil ise kullanıcıyı ekle
                await firestore().collection("users").doc(userRecord.uid).set({
                    email: formValues.email,
                    role: "customer",
                    phoneNumber: formValues.phoneNumber,
                    name: formValues.name,
                    surname: formValues.surname,
                    city: formValues.city,
                    district: formValues.district,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                })
                setupRecaptcha();
                showMessage({
                    message: "Kullanıcı Başarıyla Kaydedildi",
                    type: "success",
                })
                navigation.navigate("CustomerLoginPage")
                resetForm();
            }




        } catch (error) {
            console.log(error)
            deleteUser(auth().currentUser)
            showMessage({
                message: "Kullanıcı Kaydedilirken Bir Hata Oluştu!",
                type: "danger",
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
                                placeholder="Telefon Numarası.."
                                onChange={handleChange("phoneNumber")}
                                value={values.phoneNumber}
                                keyboardType="numeric" />

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