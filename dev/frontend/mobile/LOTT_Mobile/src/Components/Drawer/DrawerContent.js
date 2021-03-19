import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

export default DrawerContent = (props) => {
    const {state, ...rest} = props;
    const newState = {...state};
    newState.routes = newState.routes.filter((item) => item.name !== 'Main Screen');

    return (
        <>
            <View style={styles.container}>
                <Text>{"\n"}</Text>
                <Button 
                    title="Edit profile"
                    onPress={() => {
                        props.navigation.navigate('Edit Profile');
                        props.navigation.setOptions({ headerShown: false})
                    }}>
                </Button>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList state={newState} {...rest} />
                </DrawerContentScrollView>
            </View>
        </>
    );
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