
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from "./HomePage.style"


const HomePage = ({navigation}) => {

    
    return (
        <View style={styles.conteiner}>
            <View style={styles.icon_image_conteiner}>
                <Image source={require("../../asstes/icon.png")} style={styles.icon_image} />
            </View>
            <View>
                <Text style={styles.app_name}>BarBers</Text>
            </View>

            <View style={styles.line}></View>
            <TouchableOpacity style={styles.button} 
            onPress={()=>navigation.navigate("BusinessLoginPage")}>
                <View style={styles.button_inner_conteiner}>
                    <Image source={require("../../asstes/business.png")} style={styles.button_image} />
                    <Text style={styles.button_title}>İŞLETME GİRİŞİ</Text>
                </View>

            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
            onPress={()=>navigation.navigate("CustomerLoginPage")}>
                <View style={styles.button_inner_conteiner}>
                    <Image source={require("../../asstes/customer.png")} style={styles.button_image} />
                    <Text style={styles.button_title}>MÜŞTERİ GİRİŞİ</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default HomePage;