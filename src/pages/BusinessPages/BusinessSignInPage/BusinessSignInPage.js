
import React from "react";
import { Text, View } from "react-native";

import styles from "./BusinessSignInPage.style"
import Input from "../../../components/Input/Input";
import { Formik } from "formik";
import Button from "../../../components/Button/Button";

const BusinessSignInPage = () => {
    const businessData = {
        email: "",
        password: "",
        business_name: "",
        owner: "",
        city: "",
        district: "",
        address: "",
        phone_number: ""
    }

    return (
        <View style={styles.conteiner}>
            <View style={styles.line}></View>
            <Text style={styles.title}>İŞLETME KAYIT</Text>
            <View style={styles.line}></View>

            <View style={styles.input_conteiner}>
                <Formik initialValues={businessData}
                    onSubmit={null}
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
                                value={values.password}/>

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
                                value={values.phone_number} />

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