import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

// Delance ABI code to interact with the smart contract
import Delance from "./artifacts/contracts/Delance.sol/Delance.json";
import "./App.css";
import { Employer } from "./components/Employer";
import { Freelancer } from "./components/Freelancer";

const useStyles = makeStyles({
  gridContainer: {
    height: "85vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },
});

// freelance address
// 0x70997970C51812dc3A010C7d01b50e0d17dc79C8

// Employer Address
// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

// Contract Address
const delanceAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

type Request = {
  title: string,
  amount: number,
  locked: boolean,
  paid: boolean,
}[];



function App() {
  const classes = useStyles();

  const [address, setAddress] = useState<string>("");
  const [remaining, setRemaining] = useState<number>(0);
  const [requests, setRequests] = useState<Request>([]);

  // Helper Functions

  // Requests Access to User's Metamask account
  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(delanceAddress, Delance.abi, signer);

  const createProject = async (
    address: string,
    price: number,
    deadline: number
  ) => {
    requestAccount();
    if (typeof window.ethereum !== "undefined") {
      // Calls Delance.createProject();

      //   function createProject(address payable _freelancer, uint256 _deadline, uint _price) public payable onlyEmployer {
      //     freelancer = _freelancer;
      //     deadline = _deadline;
      //     price = _price;
      // }

      try {
        const transaction = await contract.createProject(
          address,
          deadline,
          price
        );
        transaction.wait();
        setRemaining(price);
        setAddress(delanceAddress);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const createRequest = async (milestone: string, amount: number) => {
    if (typeof window.ethereum !== undefined) {
      // Calls Delance.createRequest()
      //   function createRequests(string memory _title, uint256 _amount) public onlyFreelancer {

      //     Request memory request = Request({
      //         title: _title,
      //         amount: _amount,
      //         locked: true,
      //         paid: false
      //     });

      //     requests.push(request);

      //     emit requestCreated(_title, _amount, request.locked, request.paid);
      // }

      try {
        const transaction = await contract.createRequests(milestone, amount);
        transaction.wait();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getRequest = async () => {
    if (typeof window.ethereum !== undefined) {
      // Calls Delance.getAllRequests()
      //   function getAllRequests() public view returns (Request[] memory) {
      //     return requests;
      // }

      try {
        const transaction = await contract.getAllRequests();
        setRequests(transaction);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const unlockRequest = async (id: number) => {
    if (typeof window.ethereum !== undefined) {
      // Calls Delance.unlockRequest()
      //  function unlockRequest(uint256 _index) public onlyEmployer {
      //    Request storage request = requests[_index];
      //    request.locked = false;

      //    emit RequestUnlocked(request.locked);
      // }

      try {
        const transaction = await contract.unlockRequest(id);
        transaction.wait();
        const updateRequest = await contract.getAllRequests();
        setRequests(updateRequest);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const payRequest = async (id: number) => {
    if (typeof window.ethereum !== undefined) {
      // Calls Delance.payRequest()
      //   function payRequest(uint256 _index) public onlyFreelancer {

      //     require(!locked,'Reentrant detected!');

      //     Request storage request = requests[_index];
      //     require(!request.locked, "Request is locked");
      //     require(!request.paid, "Already paid");

      //     locked = true;

      //     (bool success, bytes memory transactionBytes) =
      //     freelancer.call{value:request.amount}('');

      //     require(success, "Transfer failed.");

      //     request.paid = true;

      //     locked = false;

      //     emit RequestPaid(msg.sender, request.amount);
      // }

      try {
        const transaction = await contract.payRequest(id);
        transaction.wait();
        // const updateRequest = await contract.getAllRequests();
        // setRequests(updateRequest);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xl">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid className={classes.gridContainer} item xs={6}>
                <Employer
                  createProject={createProject}
                  getRequest={getRequest}
                  requests={requests}
                  setRequests={setRequests}
                  unlockRequest={unlockRequest}
                  payRequest={payRequest}
                />
              </Grid>
              <Grid className={classes.gridContainer} item xs={6}>
                <Freelancer createRequest={createRequest} />
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Container>
          <Typography variant="h5">Delance</Typography>
          <Typography>
            <b>Contract Address:</b> {address}
          </Typography>
          <Typography>
            <b>Remaining Payment:</b> {remaining}
          </Typography>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;

{
  /* <button onClick={getGreeting}>Greeting</button>
    <p>{msg}</p>
    <p>{freelanceAddress}</p> */
}
