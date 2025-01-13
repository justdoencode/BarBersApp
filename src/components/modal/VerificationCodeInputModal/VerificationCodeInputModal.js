
import React, { useState } from "react";
import Modal from "react-native-modal";

import styles from "./VerificationCodeInputModal.style";
import { TextInput, View } from "react-native";
import Button from "../../Button/Button";



export default VerificationCodeInputModal = ({ visible, onClose,onSend }) => {
  const [text, setText] = useState("");
    
    function handleSend(){
        if(!text){
            return
        }
        onSend(text)
        setText(null)
    }
  
  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <View style={styles.conteiner}>
        <View style={styles.input_conteiner}>
          <TextInput placeholder="Kodu Giriniz..?" onChangeText={setText} />
        </View>
        <Button text="Gönder" onPress={handleSend} />
      </View>
    </Modal>

  )
}



