import React from "react";
import { Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import "./mainscreen.css";
const MainScreen = ({ title, children }) => {
  return (
    <>
      <div className="mainScreen">
        <Container>
          <Row>
            <div className="page">
              {title && (
                <>
                  <h1 className="noteHeading">{title}</h1>
                  <hr />
                </>
              )}
              {children}
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MainScreen;
