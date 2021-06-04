import { StyleSheet } from 'react-native';

import colors  from 'colors/Colors.style.js'


export default StyleSheet.create({
    mainContainer: {
        backgroundColor:colors.background,
        paddingLeft: 10,
        paddingRight: 10,

        flex: 1,
        alignItems:'center',
        justifyContent:'flex-start',
    },

    icon:{
        width:300,
        height:300,
        marginTop: 100,
        marginBottom:50
    },  

    bottonContainer:{
        position:'absolute',
        bottom:30
    }
});