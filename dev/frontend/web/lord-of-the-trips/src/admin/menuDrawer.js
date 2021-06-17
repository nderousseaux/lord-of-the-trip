import { useState } from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import imagePoint from '../icons/PointDePassage.png';
import imagePointSuppr from '../icons/PointDePassageSuppr.png';
import imageSegment from '../icons/Segment.png';
import imageSegmentSuppr from '../icons/SegmentSuppr.png';
import imageSwap from '../icons/Swap.png';
import imageObstacle from '../icons/Obstacle.png';
import imageObstacleSuppr from '../icons/ObstacleSuppr.png';
import imageStart from '../icons/Depart.jpg';
import imageEnd from '../icons/Arrivee.jpg';
import imageEdit from '../icons/Modifier.png';

const openDrawerWidth = '350px';
const closeDrawerWidth = '48px';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: openDrawerWidth,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: openDrawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: closeDrawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
  },

  imageIconsOpenDrawer: {
    width: "28px",
    marginRight: '3%'
  },

  imageIconsCloseDrawer: {
    width: "28px",
    marginRight: '30%'
  },

  openCloseDrawer: {
    marginTop: '10px',
    marginBottom: '80px'
  },

  divider: {
    margin: '10px 0'
  },

  listItem: {
    paddingLeft: '8px',
    paddingRight: '8px'
  },

  selected: {
    backgroundColor: 'lightGray'
  },
}));

const MenuDrawer = ({ radioButtonValue, setRadioButtonValue }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        anchor="right"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.openCloseDrawer}>
          {open ?
            <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
                :
            <IconButton onClick={handleDrawerOpen}>
              <ChevronLeftIcon />
            </IconButton>
          }
        </div>
        <Divider className={classes.divider} />
        <RadioGroup value={radioButtonValue}>
          <MenuItem src={imagePoint} value={"2"} label={"Ajouter des points de passage"} classes={classes} open={open}
                    radioButtonValue={radioButtonValue} setRadioButtonValue={setRadioButtonValue} />
          <MenuItem src={imagePointSuppr} value={"3"} label={"Supprimer des points de passage"} classes={classes} open={open}
                    radioButtonValue={radioButtonValue} setRadioButtonValue={setRadioButtonValue} />
          <Divider className={classes.divider} />
          <MenuItem src={imageSegment} value={"4"} label={"Tracer des segments"} classes={classes} open={open}
                    radioButtonValue={radioButtonValue} setRadioButtonValue={setRadioButtonValue} />
          <MenuItem src={imageSegmentSuppr} value={"5"} label={"Supprimer des segments"} classes={classes} open={open}
                    radioButtonValue={radioButtonValue} setRadioButtonValue={setRadioButtonValue} />
          <MenuItem src={imageSwap} value={"8"} label={"Changer le sens des segments"} classes={classes} open={open}
                    radioButtonValue={radioButtonValue} setRadioButtonValue={setRadioButtonValue} />
          <Divider className={classes.divider} />
          <MenuItem src={imageObstacle} value={"9"} label={"Ajouter des obstacles"} classes={classes} open={open}
                    radioButtonValue={radioButtonValue} setRadioButtonValue={setRadioButtonValue} />
          <MenuItem src={imageObstacleSuppr} value={"10"} label={"Supprimer des obstacles"} classes={classes} open={open}
                    radioButtonValue={radioButtonValue} setRadioButtonValue={setRadioButtonValue} />
          <Divider className={classes.divider} />
          <MenuItem src={imageStart} value={"6"} label={"Sélectionner le départ"} classes={classes} open={open}
                    radioButtonValue={radioButtonValue} setRadioButtonValue={setRadioButtonValue} />
          <MenuItem src={imageEnd} value={"7"} label={"Sélectionner l'arrivé"} classes={classes} open={open}
                    radioButtonValue={radioButtonValue} setRadioButtonValue={setRadioButtonValue} />
          <Divider className={classes.divider} />
          <MenuItem src={imageEdit} value={"11"} label={"Modifier avec une modale"} classes={classes} open={open}
                    radioButtonValue={radioButtonValue} setRadioButtonValue={setRadioButtonValue} />
        </RadioGroup>
      </Drawer>
    </div>
  );
};

const MenuItem = ({ src, value, label, classes, open, radioButtonValue, setRadioButtonValue }) => {
  return <>
    <div onClick={() => setRadioButtonValue(value)} className={ (radioButtonValue === value ? classes.selected : null) }>
      <ListItem button className={classes.listItem}>
        <img src={src} alt="" className={clsx({
          [classes.imageIconsOpenDrawer]: open,
          [classes.imageIconsCloseDrawer]: !open,
        })} />
        <FormControlLabel value={value} control={<Radio color="primary" />} label={label} />
      </ListItem>
    </div>
  </>
};

export default MenuDrawer;
