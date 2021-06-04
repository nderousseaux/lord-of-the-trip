import { StyleSheet } from 'react-native';

import colors from 'colors/Colors.style.js';

export default StyleSheet.create({
    container: {
        
        margin:20,
        borderRadius:10,

        backgroundColor: colors.surface,
        borderWidth:1,
        borderColor:colors.secondary,
    },

    header:{
        height:166,

        borderTopLeftRadius:10,
        borderTopRightRadius:10,

        backgroundColor:colors.secondary,

        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    main:{
        flex:2,

        backgroundColor:colors.surface,

        marginTop: 40,
        marginRight: 25,
        marginLeft: 25,
        marginBottom:10
    },

    middleView:{
        position:'absolute',
        bottom:-25,
        zIndex:9
    },

    descriptionView:{
        flex:8,
        marginBottom: 20

        
    },

    buttonView:{
        flex:2,
        marginBottom: 20,
        
        alignItems:'center',
        justifyContent:'center',
    },

    detailsView:{
        flex:2,
        marginBottom: 15,
        
        alignItems:'center',
        justifyContent:'center',
    },

    title: {
        fontSize:30,
        textAlign:'center'
    },

    subtitle:{
        fontSize:20

    },

    dateText:{
        fontSize: 20,
        color: 'white'
    },

    descriptionText:{
        textAlign: 'center',
        fontSize:15
    },
});