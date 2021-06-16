import { StyleSheet } from 'react-native';

import colors  from 'colors/Colors.style.js'


export default StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    cardContainer:{
        flex:9,
    },
    bottomContainer: {
      flex:1,
      flexDirection:'row',
      backgroundColor: colors.surface,
      padding: "2%",
      paddingBottom: "4%"
    },
    buttonContainer:{
        flex:2
    },
    detailsContainer:{
        flex:6,
    }
});