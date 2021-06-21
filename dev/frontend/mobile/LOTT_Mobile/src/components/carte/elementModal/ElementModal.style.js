import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    modalContainer: {
                
        minWidth: Dimensions.get('window').height * 0.5,
        minHeight: Dimensions.get('window').width * 0.5,

        transform: [{ rotate: "90deg" }],
        borderRadius: 20,

        backgroundColor: "white",

        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,

        flexDirection: "column",
    },
    titleContainer: {

        flex: 2,
        minHeight: 20,
    },
    title: {
        height: '100%',
        
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    },
    contentLine: {

        fontSize: 15,
    },
    footerContainer: {

        flex: 1,
        justifyContent: 'flex-end',

        minWidth: 50,
        width: '100%',
    },
});
