import { StyleSheet } from 'react-native';
import colors  from 'colors/Colors.style.js'

export default StyleSheet.create({
    mainContainer: {
        height:110,
        marginBottom: 10,
        flexDirection: 'row',

        alignItems: 'flex-start',
        justifyContent: 'flex-start'

    },
    oneDetailContainer:{
        height:"100%",
        aspectRatio:1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    icon:{
        margin:10,
    },
    textTitle:{
        color:'black',
        fontWeight:'bold'
    },
    textMain:{
        color:'black',
        fontWeight:'bold',
        fontSize:12
    }
});