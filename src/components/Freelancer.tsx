import react, { useState } from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";


const useStyles = makeStyles({
  employerContainer: {
    height: "90vh",
    display: "flex",
    width: "100vw",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    paddingTop: "10vh",
  },

  actorIcon: {
    height: "10vh",
    widht: "10vh",
    fontSize: "100px !important",
  },

  section: {
    margin: "2vh",
  },

  divider: {
    width: "10vw",
  },

  inputSection: {
    width: "20vw",
    height: "30vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  inputFields: {
    margin: "2vh",
  },
});

export const Freelancer: React.FC<{ createRequest: any}> = ({
  createRequest
}) => {
  const classes = useStyles();

  const [milestone, setMilestone] = useState<string>("");
  const [amount, setAmount] = useState<number | null | string>();

  const newRequest = async () => {
    try {
      await createRequest(milestone, amount);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.employerContainer}>
      <div className={classes.section}>
        <SendIcon className={classes.actorIcon} />
        <Typography variant="h5">Freelancer</Typography>
      </div>
      <hr className={classes.divider} />
      <div className={classes.section}>
        <Typography variant="h6">Create a new request</Typography>
      </div>
      <div className={classes.inputSection}>
        <TextField
          className={classes.inputFields}
          id="standard-basic"
          label="Milestone"
          variant="outlined"
          type="text"
          value={milestone}
          onChange={(e) => setMilestone(e.target.value)}
        />
        <TextField
          className={classes.inputFields}
          id="standard-basic"
          label="Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button onClick={newRequest} variant="contained">
          Request
        </Button>
      </div>
    </div>
  );
};
