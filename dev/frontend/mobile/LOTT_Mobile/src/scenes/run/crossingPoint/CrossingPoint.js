import { StyleSheet } from 'react-native';

import colors  from 'colors/Colors.style.js'


export default StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    cardContainer:{
        flex:8,
    },
    bottomContainer: {
      flex:1,
      flexDirection:'row',
      backgroundColor: colors.surface,
      paddingTop: "2%",
      paddingBottom: "4%"
    }, 
    buttonContainer:{
        backgroundColor:'white',
        height:'100%',
        borderRadius: 25,
        padding:'10%',
        borderWidth:2,
        borderColor:'black',
        marginRight:5,
        marginLeft:5
    },
    buttonText: {
        color:'black'
    },
    containerButtons:{
        flex:1,
        flexDirection:'row'
    },

    buttonContainer:{
        backgroundColor:'white',
        height:'100%',
        borderRadius: 25,
        borderWidth:2,
        borderColor:'black',
        marginRight:5,
        marginLeft:5,
        elevation:3,

        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        
        elevation: 3,
    },
    buttonContainerSelect:{
        backgroundColor:'lightgrey',
        height:'100%',
        borderRadius: 25,
        borderWidth:2,
        borderColor:'black',
        marginRight:5,
        marginLeft:5,
        elevation:3,

        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        
        elevation: 3,
    },
    buttonText: {
        color:'black',
        fontSize:20
    }
});