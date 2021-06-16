import { makeStyles } from '@material-ui/core/styles';

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

  margin20bottom: {
    marginBottom: '20px'
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
    width: '100%'
  },

  imageInDiv: {
    maxWidth: '100%',
    maxHeight: '100%'
  },

  border: {
    border: '1px solid black',
    padding: '2%'
  },
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
