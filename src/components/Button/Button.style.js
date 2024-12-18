import { StyleSheet } from "react-native";

export default {
    primary:StyleSheet.create({
    conteiner:{
        backgroundColor:"#62825D",
        borderWidth:2,
        borderColor:"#62825D",
        alignItems:"center",
        padding:7,
        marginTop:10,
        borderRadius:10,
    },
    title:{
        fontWeight:"bold",
        color:"white",
        fontSize:20,
    }
}),
    secondary:StyleSheet.create({
        conteiner:{
            backgroundColor:"white",
            borderWidth:2,
            borderColor:"#62825D",
            alignItems:"center",
            padding:7,
            marginTop:10,
            borderRadius:10,
        },
        title:{
            fontWeight:"bold",
            color:"#62825D",
            fontSize:20,
        }
    })
}