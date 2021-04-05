import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Recording(props) {
    console.log(props)

    return(
        <View style={styles.container}>
            <Text>Yo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});