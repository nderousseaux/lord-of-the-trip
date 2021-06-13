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
    justifyContent: 'center'
  },

  contentCenterVertical: {
    alignItems: 'center'
  },

  flexRow: {
    display: 'flex',
    flexDirection: 'row'
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
