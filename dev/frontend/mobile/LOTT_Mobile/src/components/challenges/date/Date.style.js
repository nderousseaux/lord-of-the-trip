import { StyleSheet } from 'react-native';

import colors from 'colors/Colors.style.js';

export default StyleSheet.create({
    container:{
        backgroundColor:'black',

        borderWidth:3,
        borderColor:colors.surface,
        padding:7,
        borderRadius:100,
        shadowOpacity: 1,
    },
    text:{
        fontSize: 15,
        color: 'white'
    }
});