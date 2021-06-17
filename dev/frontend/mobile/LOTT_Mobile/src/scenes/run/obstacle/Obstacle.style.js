import { StyleSheet } from 'react-native';

import colors  from 'colors/Colors.style.js'


export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent:'center'
    },
    obstacleContainer:{
        flex:1,
        
    },
    titleContainer:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:colors.primary
    },
    descriptionContainer:{
        padding:10,
        backgroundColor:colors.surface,
    },
    reponseContainer:{
        flex:7,
        padding:10,
        backgroundColor:colors.surface,
        alignItems: 'center',
    },

    title:{
        fontSize:30
    },
    description:{
        marginTop:10,
        marginBottom:10,
        fontSize:15,
        textAlign:'center'
    }

});