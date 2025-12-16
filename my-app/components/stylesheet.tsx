import Leaderboard from "@/app/(app)/leaderboard";
import { StyleSheet } from "react-native";

export default function stylesheet() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#12072E",
        },
        text: {
            color: "white"
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
        containerH: {
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 16,
            gap: 8,
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
        clickerButton: {
            height: 300,
            width: 300,
            marginTop: 32,
        },
        loading : {
            color: "white",
            marginTop: 16
        },
        leaderboard : {
            color: "#ffffff",
            marginBottom: 24,
            textAlign : "center"
        },
        first : {
            fontSize : 24,
            color : "#ffffff",
            marginBottom: 24,
            textAlign : "center",
            fontWeight : "bold"
        },
        scrollBox : {
            width : '100%',
            flex : 1,
            padding : 16
        },
        disconnectButton : {
            marginTop : 32,
            backgroundColor: "#00C4D6",
            padding: 16,
            borderRadius: 15,
            marginBottom: 16,
            width: 160,
            justifyContent: "center",
            alignItems: "center",
        },
        profileInput : {
            width: '50%',
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
            height : 60
        },
        profileButton : {
            backgroundColor: "#00C4D6",
            padding: 16,
            borderRadius: 15,
            width: '15%',
            alignItems: "center",
        },
        marginTop : {
            marginTop : 16
        }
    })
    return styles;
}