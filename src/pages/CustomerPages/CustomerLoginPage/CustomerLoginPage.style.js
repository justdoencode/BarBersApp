import { Dimensions, StyleSheet } from "react-native";

const windowDimensions=Dimensions.get("window");
export default StyleSheet.create({
    conteiner:{
        flex:1,
        alignItems:"center",
        paddingTop:50,
    },
    image_conteiner:{
        alignItems:"center",
        marginTop:20,
        marginBottom:20,
    },
    image:{
        width:150,
        height:150,
    },
    line: {
        height: 2,
        width: windowDimensions.width-50,
        backgroundColor: "#62825D",

    },
    title:{
        fontWeight:"bold",
        color:"#62825D",
        fontSize:30,
        marginTop:10,
        marginBottom:10,
    },
    input_conteiner:{
        width:windowDimensions.width-20,    
        marginTop:70,
        borderWidth:1,
        borderColor:"#62825D",
        padding:20,
        borderRadius:20,

    }
})