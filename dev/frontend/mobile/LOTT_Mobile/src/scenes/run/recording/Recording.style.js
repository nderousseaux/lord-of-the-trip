import { StyleSheet } from 'react-native';

import colors  from 'colors/Colors.style.js'


export default StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    cardContainer:{
        flex:7,
    },
    bottomContainer: {
      flex:1,
      flexDirection:'row',
      
    },
    buttonContainer:{
        flex:2,
        padding: "2%",
    },
    detailsContainer:{
        flex:6,
        backgroundColor: 'blue'
    }
});