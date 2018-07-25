import React from "react";
import { Link } from "gatsby";
import { filter, orderBy } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Drawer from '@material-ui/core/Drawer';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import logo from "../../assets/img/coalition-logo.png";
import RegistrationModal from "./RegistrationModal";
import MenuContent from "./MenuContent";


const styles = theme => ({
  drawerPaper: {
    maxWidth: '25vw',
    minWidth: '280px',
    background: theme.palette.grey[100],
  },
  toolbar: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  logo: {
    height: "60px",
    marginBottom: "4px",
    marginTop: "4px"
  },
  yellow: {
    color: "#f7a700",
  },
  orange: {
    color: "#f06b33",
  },
  teal: {
    color: "#01b4aa",
  },
  root: {
    fontSize: '1rem',
    whiteSpace: 'normal',
    height: 'auto',
  },
  navbarOffset: {
    height: '74px'
  },
  padding: {
    paddingTop: '8px',
    paddingBottom: '90px'
  }
});

const menuSections = [
  {
    title: "Introduction",
    color: null,
    navGroup: "about"
  },
  {
    title: "A: Analysis",
    color: "yellow",
    navGroup: "building_block_a"
  },
  {
    title: "B: Design",
    color: "orange",
    navGroup: "building_block_b"
  },
  {
    title: "C: MEAL",
    color: "teal",
    navGroup: "building_block_c"
  },
  {
    title: "Case Study",
    color: null,
    navGroup: "case_study"
  },
  {
    title: "Tools",
    color: null,
    navGroup: "tools"
  },
  {
    title: "Reference",
    color: null,
    navGroup: "reference"
  }
];

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
  }

  filterPagesByType = type => {
    return orderBy(
      filter(this.props.pages, page => page.node.navigation.group === type),
      "node.navigation.order"
    );
  };

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget })
  }

  closeMenu = e => {
    this.setState({ anchorEl: null })
  }

  render() {
    const openModal = Boolean(this.props.showRegistrationModal);
    const openMenu = Boolean(this.state.anchorEl)

    return (
      <Hidden smDown>
        <Drawer
          anchor="left"
          variant="permanent"
          elevation={12}
          classes={{
            paper: this.props.classes.drawerPaper,
          }}
        >
          <List className={this.props.classes.padding}>
          <div className={this.props.classes.navbarOffset} />
            {menuSections.map(section => {
              const pages = this.filterPagesByType(section.navGroup);
              return (
                <ExpansionPanel key={`mobile-${section.navGroup}`} className={this.props.classes.expanded}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={this.props.classes[section.color]}>
                    {section.title}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <MenuContent
                      navGroup={this.state.selected}
                      menuItems={pages}
                      closeMenu={this.closeMenu}
                      {...this.props}
                    />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}
          </List>
        </Drawer>
      </Hidden>
    );
  }
}

export default withStyles(styles)(Navigation);
