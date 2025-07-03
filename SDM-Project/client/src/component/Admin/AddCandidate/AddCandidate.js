import React, { Component } from "react";

import Navbar from "../../Navbar/Navigation";
import NavbarAdmin from "../../Navbar/NavigationAdmin";

import getWeb3 from "../../../getWeb3";
import Election from "../../../contracts/Election.json";

import AdminOnly from "../../AdminOnly";

import "./AddCandidate.css";

export default class AddCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ElectionInstance: undefined,
      web3: null,
      accounts: null,
      isAdmin: false,
      isElStarted: false, //is Election Started
      header: "",
      slogan: "",
      candidates: [],
      candidateCount: 0,
    };
  }

  componentDidMount = async () => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }

    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Election.networks[networkId];
      const instance = new web3.eth.Contract(
        Election.abi,
        deployedNetwork && deployedNetwork.address
      );

      this.setState({ web3, ElectionInstance: instance, accounts });

      // Check election status
      const start = await instance.methods.getStart().call();
      this.setState({ isElStarted: start });

      // Get candidate count
      const candidateCount = await instance.methods.getTotalCandidate().call();
      this.setState({ candidateCount });

      // Get admin address
      const admin = await instance.methods.getAdmin().call();
      if (accounts[0] === admin) {
        this.setState({ isAdmin: true });
      }

      // Load candidates
      const candidates = [];
      for (let i = 0; i < candidateCount; i++) {
        const candidate = await instance.methods.candidateDetails(i).call();
        candidates.push({
          id: candidate.candidateId,
          header: candidate.header,
          slogan: candidate.slogan,
        });
      }
      this.setState({ candidates });
    } catch (error) {
      console.error(error);
      alert("Failed to load web3, accounts, or contract. Check console for details.");
    }
  };

  updateHeader = (event) => {
    this.setState({ header: event.target.value });
  };

  updateSlogan = (event) => {
    this.setState({ slogan: event.target.value });
  };

  addCandidate = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    const { header, slogan, accounts, ElectionInstance } = this.state;

    try {
      await ElectionInstance.methods.addCandidate(header, slogan).send({
        from: accounts[0],
        gas: 1000000,
      });
      window.location.reload();
    } catch (error) {
      alert("Error adding candidate: " + error.message);
    }
  };

  render() {
    if (!this.state.web3) {
      return (
        <>
          {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
          <center>Loading Web3, accounts, and contract...</center>
        </>
      );
    }

    if (!this.state.isAdmin) {
      return (
        <>
          <Navbar />
          <AdminOnly page="Add Candidate Page." />
        </>
      );
    }

    return (
      <>
        <NavbarAdmin />
        <div className="container-main">
          <h2 style={{color: "black",fontSize: "30px"}}>Add a new candidate</h2>
          <small style={{color:"black",fontSize:"20px"}}>Total candidates: {this.state.candidateCount}</small>
          <div className="container-item">
            <form className="form" onSubmit={this.addCandidate}>
              <div className="form-group">
                <label className="label-ac">Candidate Name</label>
                <input
                  className="input-ac"
                  type="text"
                  placeholder="e.g. Sirisena"
                  value={this.state.header}
                  onChange={this.updateHeader}
                />
              </div>
              <div className="form-group">
                <label className="label-ac">Party</label>
                <input
                  className="input-ac"
                  type="text"
                  placeholder="e.g. B J P"
                  value={this.state.slogan}
                  onChange={this.updateSlogan}
                />
              </div>
              <button
                className="btn-add"
                disabled={
                  (this.state.header.length < 3 || this.state.header.length > 21) ||
                  this.state.isElStarted
                }
              >
                Add Candidate
              </button>
            </form>
          </div>
        </div>
        {this.loadAdded(this.state.candidates)}
      </>
    );
  }    

  loadAdded = (candidates) => {
    const renderAdded = (candidate) => (
      <div className="container-list success">
        <div style={{ maxHeight: "21px", overflow: "auto" }}>
          {candidate.id}. <strong>{candidate.header}</strong>: {candidate.slogan}
        </div>
      </div>
    );

    return (
      <div className="container-main" style={{ borderTop: "1px solid" }}>
        <div className="container-item info">
          <center>Candidates List</center>
        </div>
        {candidates.length < 1 ? (
          <div className="container-item alert">
            <center>No candidates added.</center>
          </div>
        ) : (
          <div className="container-item" style={{ display: "block", backgroundColor: "#FEFEFE" }}>
            {candidates.map(renderAdded)}
          </div>
        )}
      </div>
    );
  };
}
