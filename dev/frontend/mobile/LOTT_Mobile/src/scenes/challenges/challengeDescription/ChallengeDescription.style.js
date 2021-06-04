import { StyleSheet } from 'react-native';

import colors from 'colors/Colors.style.js';

export default StyleSheet.create({
    mainContainer: {
        flex:1
    },

    header:{
        height:200,

        backgroundColor:colors.secondary,

        justifyContent:'center',
        alignItems:'center'
    },

    title: {
        fontSize:30,
        textAlign:'center'
    },

    subtitle:{
        fontSize:20,
        marginBottom: 15
    },

    middleView:{
        position:'absolute',
        bottom:-25,
        zIndex:9
    },
});