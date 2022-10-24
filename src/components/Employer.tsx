import react, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Person4Icon from "@mui/icons-material/Person4";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Container from "@mui/material/Container";
import { RequestList } from "./RequestList";

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

  btnContainer: {
    height: "3vh",
    widht: "20vw",
    marginTop: "1.5vh !important",
  },

  btn: {
    width: "20vw !important",
  },

  list: {
    width:"23vw !important",
    height: "35vh !important",
    alignItems:'start',
    justifyContent:'center',
    marginTop:'5vh',
    overflowY:'hidden',
    paddingLeft:'7px'
  }
});

export const Employer: React.FC<{ createProject: any; getRequest: any, requests: any, setRequests: any, unlockRequest: any, payRequest: any }> = ({
  createProject,
  getRequest,
  requests,
  setRequests,
  unlockRequest,
  payRequest
}) => {
  const classes = useStyles();
  const [address, setAddress] = useState("");
  const [exist, setExist] = useState<boolean>(false);
  const [value, setValue] = useState<Dayjs | null>(dayjs("2014-08-18"));

  useEffect(() => {
    
  },[requests])

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const newProject = async () => {
    try {
      await createProject(
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        3000000000000000,
        value?.unix()
      );
      setExist(true);
    } catch (e) {
      console.log(e);
    }
  };

  const getReq = async () => {
    try {
      await getRequest();
      console.log(requests)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.employerContainer}>
      <div className={classes.section}>
        <Person4Icon className={classes.actorIcon} />
        <Typography variant="h5">Employer</Typography>
      </div>
      <hr className={classes.divider} />
      {requests && exist? (
        <>
          <Container className={classes.btnContainer}>
            <Button
              className={classes.btn}
              onClick={getReq}
              variant="contained"
            >
              Get Requests
            </Button>
          </Container>

          <Container className={classes.list}>
              <RequestList req={requests} setRequests={setRequests} unlockRequest={unlockRequest} payRequest={payRequest}/>
          </Container>
        </>
      ) : (
        <>
          <div className={classes.section}>
            <Typography variant="h6">Add a new project</Typography>
          </div>
          <div className={classes.inputSection}>
            <TextField
              className={classes.inputFields}
              id="standard-basic"
              label="Freelancer Address"
              variant="outlined"
              value={"0x70997970C51812dc3A010C7d01b50e0d17dc79C8"}
              onChange={(e) => setAddress(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                className={classes.inputFields}
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button onClick={newProject} variant="contained">
              Create
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
