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
            marginBottom: 32,
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
        clickerButton: {
            backgroundColor: "#00C4D6",
            padding: 12,
            borderRadius: 50,
            marginTop: 32,
            height: 100,
            width: '90%',
            justifyContent: "center",
            alignItems: "center",
        }
    })
    return styles;
}