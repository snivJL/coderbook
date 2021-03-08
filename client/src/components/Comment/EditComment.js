import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { commentActions } from "../../redux/actions/comment.actions";

const EditComment = ({ comment, commentId }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [newComment, setNewComment] = useState(comment);
  console.log(newComment, "newComment");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(commentActions.updateComment(commentId, newComment));
    setShow(false);
  };

  return (
    <>
      <Button className="rounded-circle" variant="light" onClick={handleShow}>
        <FontAwesomeIcon icon="edit" size="sm" />
      </Button>

      <Modal className="fade" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
              name="post"
              placeholder="Edit comment..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="light" onClick={handleEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditComment;
