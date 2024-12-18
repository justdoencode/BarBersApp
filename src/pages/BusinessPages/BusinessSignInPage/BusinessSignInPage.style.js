import { Dimensions, StyleSheet } from "react-native";
const windowDimensions=Dimensions.get("window")
export default StyleSheet.create({
    conteiner: {
        flex: 1,
        padding: 10,
        justifyContent:"center"
    },
    line: {
        height: 2,
        width: windowDimensions.width - 50,
        backgroundColor: "#62825D",
        alignSelf:"center"

    },
    title: {
        fontWeight: "bold",
        color: "#62825D",
        fontSize: 30,
        marginTop: 10,
        marginBottom: 10,
        textAlign:"center"
    },
    input_conteiner: {
        padding: 10,
    },
    button_conteiner:{
        marginTop:20,
        width:200,
        alignSelf:"center"
    }
})