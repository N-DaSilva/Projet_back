import { StyleSheet } from "react-native";

export default function stylesheet() {
    const styles = StyleSheet.create({
        //general
        container: {
            flex: 1,
            alignItems: "center",
            backgroundColor: "#12072E",
        },
        containerCenter: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#12072E",
        },
        containerH: {
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 8,
        },
        text: {
            color: "white",
            fontSize: 16,
        },
        link: {
            color: "#00C4D6",
            textDecorationLine: "underline"
        },
        title: {
            fontSize: 36,
            fontWeight: "bold",
            color: "white",
            marginBottom: 16,
        },
        button: {
            backgroundColor: "#00C4D6",
            padding: 16,
            borderRadius: 15,
            marginBottom: 16,
            width: 160,
            justifyContent: "center",
            alignItems: "center",
        },
        buttonText: {
            color: "#12072E",
            fontWeight: "bold",
        },
        input: {
            width: '90%',
            margin: 12,
            borderWidth: 1,
            padding: 16,
            backgroundColor: "white",
            borderRadius: 15,
            borderColor: "transparent",
        },
        marginTop : {
            marginTop : 16
        },
        marginBottom : {
            marginBottom : 48
        },
        big : {
            fontSize : 48,
            fontWeight : "bold",
            color : "#ffffff",
            marginTop: 64
        },
        loading : {
            color: "white",
            marginTop: 16,
            textAlign: "center"
        },
        //clicker page
        clickerButton: {
            height: 300,
            width: 300,
            marginTop: 32,
        },
        //leaderboard page
        leaderboard : {
            color: "#ffffff",
            padding: 16,
            borderRadius: 15,
            fontSize : 16,
        },
        first : {
            fontSize : 24,
            color : "#ffffff",
            marginTop: 24,
            marginBottom: 24,
            padding: 16,
            borderRadius: 15,
            fontWeight : "bold",
            borderColor : "#FFD700",
            borderWidth : 2
        },
        second : {
            fontSize : 20,
            color : "#ffffff",
            marginBottom: 24,
            padding: 16,
            borderRadius: 15,
            fontWeight : "bold",
            borderColor : "#C0C0C0",
            borderWidth : 2
        },
        third : {
            fontSize : 18,
            color : "#ffffff",
            marginBottom: 32,
            padding: 16,
            borderRadius: 15,
            fontWeight : "bold",
            borderColor : "#CD7F32",
            borderWidth : 2
        },
        scrollBox : {
            width : '100%',
            flex : 1,
            padding : 16
        },
        //profile page
        disconnectButton : {
            position : "absolute",
            top : 40,
            right : 16,
            padding : 8,
        },
        profileInput : {
            width: 250,
            borderWidth: 1,
            padding: 16,
            backgroundColor: "white",
            borderRadius: 15,
            borderColor: "transparent",
        },
        profileContainer : {
            flexDirection : "row",
            alignItems : "center",
            gap : 8,
            height : 60,
            marginTop : 16
        },
        profileButton : {
            backgroundColor: "#00C4D6",
            padding: 16,
            borderRadius: 15,
            width: '15%',
            alignItems: "center",
        },
        profilePicture : {
            width: 250,
            height: 250,
            borderRadius: 125,
            borderColor: "#ffffff",
            borderWidth: 2,
            marginBottom: 16,
            marginTop: 56
        },
        profileUsername : {
            fontSize: 24,
            fontWeight: "bold",
            color: "#ffffff",
        }
    })
    return styles;
}