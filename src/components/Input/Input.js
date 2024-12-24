import React from "react";
import { TextInput, View } from "react-native";

import styles from "./Input.style"



export default function({placeholder,multiline=false,onChange,value,secure=false,keyboardType=null}){
    return(
        <View style={styles.conteiner}>
            <TextInput placeholder={placeholder} 
            multiline={multiline}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secure}
            keyboardType={keyboardType}/>
        </View>
    )
}