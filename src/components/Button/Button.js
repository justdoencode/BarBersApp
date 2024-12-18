import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./Button.style"



export default function ({ title, style = "primary", onPress }) {
    return (
        <TouchableOpacity style={styles[style].conteiner}
            onPress={onPress}>
            <Text style={styles[style].title}>{title}</Text>
        </TouchableOpacity>
    )
}
