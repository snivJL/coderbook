import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postActions } from "../../redux/actions/post.actions";

const EditModal = ({ post, postId }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [newPost, setNewPost] = useState(post);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(postActions.updatePost(postId, null, newPost));
    setShow(false);
  };

  return (
    <>
      <Button className="rounded-circle" variant="light" onClick={handleShow}>
        <FontAwesomeIcon icon="edit" size="sm" />
      </Button>

      <Modal className="fade" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Post</Form.Label>
            <Form.Control
              onChange={(e) => setNewPost(e.target.value)}
              value={newPost}
              name="post"
              placeholder="Edit post..."
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

export default EditModal;
