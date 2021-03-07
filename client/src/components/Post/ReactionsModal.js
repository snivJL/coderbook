import React, { useState } from "react";
import { Button, Modal, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postActions } from "../../redux/actions/post.actions";

const ReactionsModal = ({
  usersReacted,
  reactionsObject,
  usersReactedNames,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [usersList, setUsersList] = useState("");
  // console.log(reactionsObject);
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
                <i className="far fa-heart"></i>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <i className="far fa-laugh"></i>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item></Nav.Item>
          </Nav>
          {usersList}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ReactionsModal;
