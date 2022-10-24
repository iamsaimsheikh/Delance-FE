import react, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
 listItem: {
    width: "21vw !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    paddingLeft: "0px Important",
    boxShadow: "6px 3px 20px 2px rgb(0 0 0 / 5%)",
    marginTop:'1vh'
  },

  widthdrawRequest: {
    fontSize:'12px',
    fontWeight:'bold',
    color:'green',
    cursor:'pointer'
  },

  lockedRequest: {
    fontSize:'12px',
    fontWeight:'bold',
    color:'red'
  },

});

export const RequestList: React.FC<{ req: any, setRequests: any, unlockRequest: any, payRequest: any }> = ({
  req,
  unlockRequest,
  payRequest
}) => {

  const classes = useStyles();

  const getNode = (index: number) => {
    console.log(req[index])
    unlockRequest(index);
  };

  const payNode = (index : number) => {
    console.log(req[index])
    payRequest(index);
  };

  return (
    <>
      {req &&
        req.map((req: any, index : any) => {
          return (
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
                <Button>
                  <LockOpenIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => getNode(index)}
                  />
                </Button>
              </ListItemAvatar>
              <ListItemText
                primary={req[0]}
                secondary={parseInt(req[1]._hex)}
              />
              {req[2] == false ? <><p onClick={() => payNode(index)} className={classes.widthdrawRequest}>Widthdraw</p></> : <><p className={classes.lockedRequest}>Locked</p></>}
            </ListItem>
          );
        })}
    </>
  );
};
