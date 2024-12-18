import { Dimensions, StyleSheet } from "react-native";
const windowDimensions = Dimensions.get("window");
export default StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        backgroundColor: "#62825D"
    },
    icon_image_conteiner: {
        marginTop: 10,
        marginBottom: 20,
    },
    icon_image: {
        width: 150,
        height: 150,
    },
    app_name:{
        color:"white",
        fontSize:30,
        fontStyle:"italic",
        fontWeight:"bold",
    },
    line: {
        height: 2,
        width: windowDimensions.width-100,
        backgroundColor: "white",

    },
    button: {
        width: windowDimensions.width - 100,
        height: windowDimensions.width - 150,
        margin: 15,
        justifyContent: "center",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "white",
    },
    button_inner_conteiner: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        justifyContent: "flex-start"

    },
    button_image: {
        height: 150,
        width: 150,
    },
    button_title: {
        color: "white",
        fontWeight:"bold",
        
    },


})