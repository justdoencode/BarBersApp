
import React from "react";
import { Text, View } from "react-native";

import styles from "./CustomerSignInPage.style"
import { Formik } from "formik";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

const CustomerSignInPage = () => {
    const customerData = {
        email: "",
        password: "",
        name: "",
        surname: "",
        city: "",
        district: "",
    }
    return (
        <View style={styles.conteiner}>

            <View style={styles.line}></View>
            <Text style={styles.title}>MÜŞTERİ KAYIT</Text>
            <View style={styles.line}></View>

            <View style={styles.input_conteiner}>
                <Formik
                    initialValues={customerData}
                    onSubmit={null}>
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