import React from "react";
import { TextInput, View } from "react-native";

import styles from "./Input.style"



export default function({placeholder,multiline=false,onChange,value,secure=false}){
    return(
        <View style={styles.conteiner}>
            <TextInput placeholder={placeholder} 
            multiline={multiline}
            onChange={onChange}
            value={value}
            secureTextEntry={secure}/>
        </View>
    )
}