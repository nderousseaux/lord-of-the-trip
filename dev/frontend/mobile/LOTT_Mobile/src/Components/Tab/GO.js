import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GO(props) {
    return(
        <View style={styles.container}>
            <Text>Let's go !</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});