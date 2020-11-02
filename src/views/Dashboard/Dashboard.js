import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Snackbar from "@material-ui/core/Snackbar";
import SweetAlert from "react-bootstrap-sweetalert";
import authentication from "../../utils/Authentication";
import MainListItems from "../../components/ListItems/ListItems";
import DraggableContainer from "../../components/DragContainer/DraggableContainer";
import context from "../../hooks/useContext/Context";
import {
  setStorageItem,
  getStorageItem,
  clearStorageItem,
} from "../../utils/storage/storage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(0.5),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    padding: 0,
    height: `calc(100vh - 200px)`,
    border: "1px dashed black",
  },
}));

function Dashboard(props) {
  const { history } = props;
  const globalContext = useContext(context);
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [isResetAlert, setIsResetAlert] = useState(false);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("error");
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    let payload = globalContext.state.payload || {};

    if (
      Object.entries(payload).length === 0 &&
      payload.constructor === Object
    ) {
      setSnackbarMessage("Please add input fields to save");
      setSnackbarType("warning");
    } else {
      setSnackbarMessage("Saved Successfully");
      setSnackbarType("success");
      setStorageItem("payload", JSON.stringify(payload));
      setIsResetEnabled(false);
    }
    setIsSnackbar(true);
  };

  const handleResetConfirm = () => {
    globalContext.clearSelectedInputFieldList({});
    clearStorageItem("payload");
    setIsResetEnabled(true);
    setIsResetAlert(false);
  };

  const handleResetCancel = () => {
    setIsResetAlert(false);
  };

  const handleReset = () => {
    setIsResetAlert(true);
  };

  const handleLogout = () => {
    authentication.login(() => {
      clearStorageItem("isUserLoggedIn");
      history.go("/");
    });
  };

  const handleSnackBarClose = () => {
    setIsSnackbar(false);
  };

  const setResetButton = () => {
    let payload = getStorageItem("payload");
    let isPayload = payload ? false : true;
    return isPayload;
  };

  const [isResetEnabled, setIsResetEnabled] = useState(true);

  useEffect(() => {
    let isEnabled = setResetButton();
    setIsResetEnabled(isEnabled);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          className={"snackbar-" + snackbarType}
          open={isSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackBarClose}
          variant={snackbarType}
          message={<span>{snackbarMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={handleSnackBarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        <SweetAlert
          show={isResetAlert}
          warning
          showCancel
          confirmBtnText="Yes"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Are you sure?"
          confirmBtnCssClass="sweet-alert-btn"
          cancelBtnCssClass="sweet-alert-btn"
          onConfirm={handleResetConfirm}
          onCancel={handleResetCancel}
        >
          You will not be able to recover this action!
        </SweetAlert>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              React Studio
            </Typography>
            <Button className="logout-btn" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{MainListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid className="action-section" item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>
                  <Button
                    disabled={isResetEnabled}
                    onClick={handleReset}
                    variant="contained"
                    size="small"
                    color="secondary"
                    className="action-button"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleSave}
                    variant="contained"
                    size="small"
                    color="primary"
                    className="action-button"
                  >
                    Save
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <DraggableContainer />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </DndProvider>
  );
}

export default Dashboard;
