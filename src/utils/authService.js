

export default authService=()=>{

    //Telefon numarasına doğrulama kodu gönderme
    async function VerifyPhoneNumber(phoneNumber) {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            console.log("Doğrulama kodu gönderildi:", confirmation);
            setConfirmationCode(confirmation);
            //Telefon doğrulama kodunun girileceği modalı açma
            setInputModalVisible(true);
        } catch (error) {
            console.error("Telefon numarası ile giriş hatası:", error);
        }
    }

    //Kullanıcı doğrulama kodunu girdikten sonra:
    async function handleSendCode(code) {
        setInputModalVisible(false);
        const userRecord = auth().currentUser;
        try {
            // Telefon numarasını kullanıcıya bağla
            const credential = auth.PhoneAuthProvider.credential(confirmationCode.verificationId, code);
            await userRecord.linkWithCredential(credential);

            //Doğrulama kodunu onaylama
            try {
                confirmationCode.confirm(code);
                //Doğrulama kodu onaylandıktan sonra kullanıcıyı kaydetme
                handleSaveUser(code);

            } catch (error) {
                console.error("Doğrulama kodu hatası:", error);
                showMessage({
                    message: "Doğrulama Kodu Hatalı!",
                    type: "danger",
                })
                deleteUser(auth().currentUser)
            }

        } catch (error) {
            console.error("Telefon numarası ilişkilendirme hatası:", error);
            showMessage({
                message: "Doğrulama Kodu Hatalı!",
                type: "danger",
            })
            deleteUser(auth().currentUser)
        }
    }
}