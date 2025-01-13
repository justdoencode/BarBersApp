
import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import { Formik } from "formik";
import firestore, { collection, getFirestore, query, where, getDocs } from "@react-native-firebase/firestore"
import auth, { deleteUser, sendEmailVerification } from "@react-native-firebase/auth";

import styles from "./CustomerSignInPage.style"
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { showMessage } from "react-native-flash-message";


import VerificationCodeInputModal from "../../../components/modal/VerificationCodeInputModal/VerificationCodeInputModal";

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

    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState(null);

    const userDataRef = useRef(null);

    const [userData, setUserData] = useState(null);

    //Kullanıcı kaydı işlemleri
    async function handleFormSubmit(formValues, { resetForm }) {
        try {

            //Eklenmek istenen kullanıcının telefon numarası ile daha önce kayıtlı bir kullanıcı 
            //olup olmadığını kontrol etme
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
                return;
            }
            //Telefon numarası mevcut değil ise kullanıcı ekleme işlemine devam et
            else {

                try {

                    //Kullanıcıyı email ve parola ile kaydetme
                    await auth().createUserWithEmailAndPassword(formValues.email, formValues.password)

                    //Telefon numarasına doğrulama kodu gönderme
                    VerifyPhoneNumber(formValues.phoneNumber)
                    authService.VerifyPhoneNumber(formValues.phoneNumber)

                } catch (error) {
                    console.log(error)
                    deleteUser(auth().currentUser)
                    showMessage({
                        message: "Kullanıcı Kaydedilirken Bir Hata Oluştu!",
                        type: "danger",
                    })
                }

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

    //Telefon numarasına doğrulama kodu gönderme
    async function VerifyPhoneNumber(phoneNumber) {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            console.log("Doğrulama kodu gönderildi:", confirmation);
            setConfirmationCode(confirmation);
            //Telefon doğrulama kodunun girileceği modalı açma
            setInputModalVisible(true);
        } catch (error) {
            console.error("Telefon numarası ile giriş hatası:", error);
        }
    }

    //Kullanıcı doğrulama kodunu girdikten sonra:
    async function handleSendCode(code) {
        setInputModalVisible(false);
        const userRecord = auth().currentUser;
        try {
            // Telefon numarasını kullanıcıya bağla
            const credential = auth.PhoneAuthProvider.credential(confirmationCode.verificationId, code);
            await userRecord.linkWithCredential(credential);

            //Doğrulama kodunu onaylama
            try {
                confirmationCode.confirm(code);
                //Doğrulama kodu onaylandıktan sonra kullanıcıyı kaydetme
                handleSaveUser(code);

            } catch (error) {
                console.error("Doğrulama kodu hatası:", error);
                showMessage({
                    message: "Doğrulama Kodu Hatalı!",
                    type: "danger",
                })
                deleteUser(auth().currentUser)
            }

        } catch (error) {
            console.error("Telefon numarası ilişkilendirme hatası:", error);
            showMessage({
                message: "Doğrulama Kodu Hatalı!",
                type: "danger",
            })
            deleteUser(auth().currentUser)
        }
    }

    //Kullanıcı bilgilerini kaydetme
    async function handleSaveUser() {
        console.log("Kullanıcı Bilgileri : ", userDataRef.current)
        const userData = userDataRef.current
        try {
            const userRecord = auth().currentUser

            await firestore().collection("users").doc(userRecord.uid).set({
                email: userData.email,
                role: "customer",
                phoneNumber: userData.phoneNumber,
                name: userData.name,
                surname: userData.surname,
                city: userData.city,
                district: userData.district,
                createdAt: firestore.FieldValue.serverTimestamp(),
            })

            //Email doğrulama mesajı gönderme
            await sendEmailVerification(userRecord)

            showMessage({
                message: "Kullanıcı Başarıyla Kaydedildi",
                type: "success",
            })
            navigation.navigate("CustomerLoginPage")

        } catch (error) {
            console.log(error)
            showMessage({
                message: "Kullanıcı Kaydedilirken Bir Hata Oluştu!",
                type: "danger",
            })
            deleteUser(auth().currentUser)
        }


    }

    function handleInputModalClose() {
        setInputModalVisible(false);
    }

    return (
        <View style={styles.conteiner}>

            <View style={styles.line}></View>
            <Text style={styles.title}>MÜŞTERİ KAYIT</Text>
            <View style={styles.line}></View>

            <View style={styles.input_conteiner}>
                <Formik
                    initialValues={customerData}
                    onSubmit={(values, { resetForm }) => { userDataRef.current = values, handleFormSubmit(values, { resetForm }) }}>
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
            <VerificationCodeInputModal
                visible={inputModalVisible}
                onClose={handleInputModalClose}
                onSend={handleSendCode} />

        </View>
    )
}


export default CustomerSignInPage