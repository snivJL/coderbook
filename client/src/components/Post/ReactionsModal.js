import React, { useState } from "react";
import { Button, Modal, Nav } from "react-bootstrap";

const ReactionsModal = ({ usersReacted, reactionsObject }) => {
  const [show, setShow] = useState(false);
  const [usersList, setUsersList] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className="rounded-circle d-flex alignt-items-center"
        variant="light"
        onClick={handleShow}
      >
        {reactionsObject.Like > 0 && (
          <i style={{ color: "blue" }} className="far fa-thumbs-up mr-2"></i>
        )}
        {reactionsObject.Laugh > 0 && <i className="far fa-laugh"></i>}
        {reactionsObject.Heart > 0 && <i className="far fa-heart"></i>}
      </Button>

      <Modal className="fade" show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Nav className="d-flex w-100 justify-content-around">
            <Nav.Item
              onClick={() =>
                setUsersList(
                  usersReacted.map((r) => r.reaction === "Like" && r.name)
                )
              }
            >
              <Nav.Link>
                <i className="far fa-thumbs-up"></i>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item
              onClick={() =>
                setUsersList(
                  usersReacted.map((r) => r.reaction === "Heart" && r.name)
                )
              }
            >
              <Nav.Link>
                <i className="far fa-heart text-danger"></i>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <i className="far fa-laugh text-warning"></i>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item></Nav.Item>
          </Nav>
          <div className="d-flex flex-column mx-4">
            {usersList.length > 0 &&
              usersList.map((u) => <p className=" py-2 ">{u}</p>)}
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ReactionsModal;
