import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArchiveIcon from '@material-ui/icons/Archive';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


const useStyles = makeStyles({
  list: {
    width: '50vw',
    fontSize: '20px',
    backgroundImage: 'linear-gradient(180deg,white,#F7F7F2,#BCBDC0,#F7F7F2)',
    height: '100vh'
  },
  fullList: {
    width: 'auto',
  },
});

export default function LeftDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const breakdown = () => props.breakdown

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const list = [{name:'Watch Transactions',link:'/transactions'},
  {name:'Add Expense',link: '/operations'}, 
  {name:'Expenses Breakdown', link:'/breakdown'}]

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {list.map((link, index) => (
          <ListItem button key={link.name}>
            <ListItemIcon>{link.name === 'Watch Transactions' ?  <ArchiveIcon /> 
            : link.name === 'Add Expense' ? <AddBoxIcon />
            : link.name === 'Expenses Breakdown' ? <AttachMoneyIcon />
            : null}</ListItemIcon>
            <Link to = {link.link} > <ListItemText primary={link.name} /> </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)}><i id="hamburger" className="fas fa-bars"></i></Button>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}