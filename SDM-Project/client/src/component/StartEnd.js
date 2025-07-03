import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const StartEnd = ({ elStarted, elEnded, canAdded, endElFn }) => {
  const btnStyle = "btn-class"; // Replace with a CSS class
  return (
    <div className="container-main">
      {!elStarted ? (
        <>
          {!elEnded ? (
            <>
              <div className="container-item attention">
                <h2 style={{ color: "white" ,fontSize:"30px"}}>Do not forget to add candidates.</h2>
                <p style={{color:"wheat", fontSize:"20px"}}>
                  Go to{" "}
                  <Link title="Add a new" to="/addCandidate" className="link-style" style={{ color: "purple",fontSize:"20px" }}>
                    add candidates
                  </Link>{" "}
                  page.
                </p>
              </div>
              <div className="container-item">
              <button
          type="submit"
          className={btnStyle}
          disabled={canAdded}
          aria-disabled={canAdded}
          style={{
            cursor: canAdded ? "not-allowed" : "pointer",
            backgroundColor: canAdded ? "gray" : "white",
            color: "black",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s ease-in-out",
          }}
        >
          {canAdded ? (
            <span>
              <i className="fas fa-lock" /> Start Election {elEnded ? "Again" : ""}
            </span>
          ) : (
            <span>
              <i className="fas fa-play" /> Start Election {elEnded ? "Again" : ""}
            </span>
          )}
</button>
              </div>
            </>
          ) : (
            <div className="container-item">
              <center>
                <p style={{ color: "black" ,fontSize:"30px"}}>Re-deploy the contract to start election again.</p>
              </center>
            </div>
          )}
          {elEnded && (
            <div className="container-item">
              <center>
                <p style={{ color: "black" ,fontSize:"20px"}}>The election ended.</p>
              </center>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="container-item">
            <center>
              <p style={{ color: "black" ,fontSize:"30px"}}>The election started.</p>
            </center>
          </div>
          <div className="container-item">
          <button 
                  type="button" 
                  onClick={endElFn} 
                  className={btnStyle}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    transition: "background-color 0.3s ease-in-out",
                  }}
>
  End
</button>
          </div>
        </>
      )}
    </div>
  );
};

StartEnd.propTypes = {
  elStarted: PropTypes.bool.isRequired,
  elEnded: PropTypes.bool.isRequired,
  canAdded: PropTypes.bool,
  endElFn: PropTypes.func.isRequired,
};

StartEnd.defaultProps = {
  canAdded: false,
};

export default StartEnd;
