import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

import colors from 'colors/Colors.style.js';

export default StyleSheet.create({
    image: {
        width: '100%'
    },
    mapBackgroundContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapElementModal: {
        
        //alignSelf: 'center',
        flex: 4,

        backgroundColor: 'white',
        borderRadius: 7,
        borderWidth: 2,
        borderColor: 'lightgrey',

        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

        elevation: 600,
        zIndex: 600,
    },
    containerModalContent: {     

        backgroundColor: '#00000080',

        width: '100%',
        height: '100%',

        alignItems: 'center',
        justifyContent: 'center',

        elevation: 200,
        zIndex: 200,
    },
    zoomedMap: {
        top: -20,
        justifyContent:'center', 
        alignItems:'center'
    },
    modalCloseButton: {
           
        backgroundColor: '#00000080',

        position: 'absolute',
        top: 5,
        left: 5,

        elevation: 300,
        zIndex: 300,
    },
    staticMap: {
        elevation: 0,
        zIndex: 0,
    }
});
