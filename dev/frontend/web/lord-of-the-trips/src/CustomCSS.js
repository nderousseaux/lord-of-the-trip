import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles({
  //Login and signup drawer
  drawer: {
    width: '23vw'
  },
  drawerGrid: {
    height: '100vh'
  },


  header: {
    height: '100px',
    display: 'flex',
    flexDirection: 'row'
  },

  clickable: {
    cursor: 'pointer'
  },

  height50:  {
    height: '50%'
  },

  width80:  {
    width: '80%'
  },

  margin10vertical: {
    margin: '10px 0'
  },

  margin15vertical: {
    margin: '15px 0'
  },

  margin10horizontal: {
    margin: '0 10px'
  },

  margin10left: {
    marginLeft: '10px'
  },

  margin10right: {
    marginRight: '10px'
  },

  colorPrimary: {
    backgroundColor: '#1976D2'
  },

  colorSecondary: {
    backgroundColor: '#CB4335'
  },

  button: {
    textTransform: 'none'
  },

  textCenter: {
    textAlign: 'center'
  },

  contentCenterHorizontal: {
    display: 'flex',
    justifyContent: 'center'
  },

  contentCenterVertical: {
    display: 'flex',
    alignItems: 'center'
  },

  imageDiv: {
    width: '900px',
    height: '550px'
  },

  imageInDiv: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  // Alignement des boutons
  boutonOne:{
    textAlign: "center"
  },
    //tableau  
  table: {
    minWidth: 650,
  },
  tableLeft: {
    textAlign: "left"
  },  
  tableRight: {
    textAlign: "right",
  },
  tableDescr: {
    textAlign: "left",
    maxWidth: "350px"
  }, 

  // Challenge card
  cardParent:{
    border: '2px solid',
    borderRadius: '10px',
    margin: '5px',
    height: "500px"
  },
  cardChildOne:{
    textAlign: "center",
    backgroundColor: "#70DB38",
    borderRadius: "10px 10px 0px 0px",
    height: "100px",
    position:"relative",
    zIndex: "2"
  },
  cardChildOneText01:{
    margin: "0",
    paddingTop: "20px",
    fontSize: "20px"
  },
  cardChildOneText02:{
    marginTop: "5px",
    color: "grey"
  },
  cardDate:{
    width: "190px",
    textAlign:"center",
    margin:"0 auto",
    background: "black",
    color: "white",
    borderRadius: "13px",
    border:"solid 3px white",
    marginTop: "-17px",
    position:"relative",
    zIndex: "3"
  },
  cardDateText:{
    width: "200px",
    margin:"0 auto",
    color: "white",
    lineHeight:"35px"
  },
  imageCard:{
    width: "96%",
    margin: "2%",
    marginTop: "-50px",
    position:"relative",
    zIndex: "1",
    height: "283px",
    textAlign: "center"

  },
  infoCard:{
    textAlign:"center",
    color:"grey"
  },
  infoCardText:{
    padding:"0",
    margin: "5px"
  },
  cardBouton:{
    textAlign:"center",
    marginTop: "15px"
  },
  descriptionCard:{
    textAlign:"center",
    color:"grey",
    height:"200px"
  },
  peopleCard:{
    textAlign:"center",
    lineHeight:"50px"
  }

});





export const flexCenter = {
  display: 'flex',
  justifyContent: 'center'
};

export const flexRow = {
  display: 'flex',
  flexDirection: 'row'
};

export const flexLeft = {
  width: '30%',
  marginRight: '5px'
};

export const flexRight = {
  width: '70%',
  marginLeft: '5px'
};

export const flex25left = {
  width: '25%',
  marginRight: '5px'
};

export const flex25mid = {
  width: '25%',
  margin: '0px 5px'
};

export const flex25right = {
  width: '25%',
  marginLeft: '5px'
};
