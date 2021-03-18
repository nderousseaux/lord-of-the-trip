import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Pedometer(props) {
    return(
        <View style={styles.container}>
            <Text>Pédomètre</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});