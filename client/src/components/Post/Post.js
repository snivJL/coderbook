import React, { useState, useRef } from "react";
import {
  Col,
  Form,
  Card,
  Button,
  ListGroup,
  ButtonGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { commentActions } from "../../redux/actions/comment.actions";
import { postActions } from "../../redux/actions/post.actions";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import EditModal from "./EditModal";
import ReactionsModal from "./ReactionsModal";

const Avatar = (props) => {
  return <img alt="profile" className="rounded-circle" src={props.url} />;
};

/* STEP 4 */
const CommentForm = ({ commentInput, postId }) => {
  const dispatch = useDispatch();
  // const userId = useSelector((state) => state.auth.user.id);
  const [comment, setComment] = useState("");
  const onChange = (e) => setComment(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(commentActions.createComment(postId, comment));
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Row>
        <Col className="d-flex">
          <Form.Control
            ref={commentInput}
            onChange={onChange}
            size="sm"
            type="text"
            placeholder="Write a comment..."
            className="border-0 rounded-md bg-light"
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

const Comment = ({ body, owner }) => {
  return (
    <ListGroupItem className="justify-content-start border-bottom-0 pr-0 py-0">
      <Avatar url={owner.avatarUrl && owner.avatarUrl} />
      <div className="col">
        <div className="comment-bubble">
          <div className="font-weight-bold">{owner.name}</div>
          <p>{body}</p>
        </div>
      </div>
    </ListGroupItem>
  );
};

const PostComments = (props) => {
  return (
    <Card.Body>
      <ListGroup className="list-group-flush">
        {props.comments.length > 0 &&
          props.comments.map((c) => <Comment key={c._id} {...c} />)}
      </ListGroup>
    </Card.Body>
  );
};

const POST_ACTIONS = [
  { title: "Like", icon: "thumbs-up" },
  { title: "Comment", icon: "comment" },
  { title: "Share", icon: "share" },
];

const POST_REACTIONS = [
  { title: "Like", icon: "far fa-thumbs-up" },
  { title: "Comment", icon: "comment" },
  { title: "Share", icon: "share" },
];

const PostActionButton = ({ commentInput, title, icon, selectBlog }) => {
  return (
    <>
      {title === "Comment" ? (
        <Button
          onClick={() => commentInput.current.focus()}
          className="bg-light bg-white text-dark border-0"
        >
          {" "}
          <FontAwesomeIcon
            size="lg"
            icon={icon}
            color="black"
            className="mr-2 action-icon"
          />
          {title}
        </Button>
      ) : title === "Like" ? (
        <Button
          onClick={selectBlog}
          className="bg-light bg-white text-dark border-0"
        >
          {" "}
          <FontAwesomeIcon
            size="lg"
            icon={icon}
            color="black"
            className="mr-2 action-icon"
          />
          {title}
        </Button>
      ) : (
        <Button className="bg-light bg-white text-dark border-0">
          {" "}
          <FontAwesomeIcon
            size="lg"
            icon={icon}
            color="black"
            className="mr-2 action-icon"
          />
          {title}
        </Button>
      )}
    </>
  );
};

const PostActions = ({ commentInput, selectBlog }) => {
  return (
    <ButtonGroup aria-label="Basic example">
      {POST_ACTIONS.map((a) => {
        return (
          <PostActionButton
            key={a.title}
            commentInput={commentInput}
            selectBlog={selectBlog}
            {...a}
          />
        );
      })}
    </ButtonGroup>
  );
};
const PostReactions = (props) => {
  const post = useSelector((state) => state.post.posts).find(
    (p) => p._id === props._id
  );
  const getReactions = (post) => {
    return post.reduce(
      (acc, p) => {
        if (p.reaction in acc) {
          acc[p.reaction]++;
        }
        return acc;
      },
      { Like: 0, Heart: 0, Care: 0, Laugh: 0, Angry: 0, Sad: 0 }
    );
  };

  //{Like: 1, Heart: 0, Care: 0, Laugh: 0, Angry: 0, …}
  // const reactionsObject = getReactions(post.reactions);
  // console.log(Object.entries(reactionsObject).filter((e) => e[1] > 0)[0]);
  let postReaction = [];
  let usersReacted = [];
  if (post.reactions && post.reactions.length > 0)
    postReaction = post.reactions
      .filter((p) => p.type === "Blog")
      .map((u) =>
        usersReacted.push({ name: u.owner.name, reaction: u.reaction })
      );
  const numReactions = postReaction.length;
  return (
    <div className="d-flex justify-content-between my-2 mx-3">
      <p className="mb-0">
        <ReactionsModal usersReacted={usersReacted} />
        {numReactions > 0
          ? numReactions === 1
            ? `${usersReacted} has reacted`
            : `${usersReacted}and ${numReactions - 1} others have reacted`
          : "No reactions"}
      </p>
      <p className="mb-0">{props.comments.length} comments</p>
    </div>
  );
};

function PostHeader({ owner, post, postId }) {
  const dispatch = useDispatch();
  return (
    <div className="d-flex align-items-center p-3">
      <Avatar
        url={
          owner.avatarUrl
            ? owner.avatarUrl
            : "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p480x480/13924881_10105599279810183_392497317459780337_n.jpg?_nc_cat=109&ccb=3&_nc_sid=7206a8&_nc_ohc=uI6aGTdf9vEAX8-Aev9&_nc_ht=scontent.fsgn5-6.fna&tp=6&oh=e8b18753cb8aa63937829afe3aa916a7&oe=6064C685"
        }
      />
      <h3 className="font-weight-bold ml-3">{owner.name}</h3>
      <div className="ml-auto rounded-circle">
        <EditModal post={post} postId={postId} />
      </div>
      <Button
        onClick={() => dispatch(postActions.deletePost(postId))}
        variant="light"
        size="sm"
        className="rounded-circle"
      >
        <i className="fas fa-trash-alt"></i>
      </Button>
    </div>
  );
}

export default function Post(props) {
  const { owner, body, _id, comments } = props;
  const commentInput = useRef(null);
  const dispatch = useDispatch();
  const selectBlog = () => {
    dispatch(postActions.createPostReaction("Blog", _id, "Like"));
  };
  return (
    <Card className="p-3 mb-3 shadow rounded-md">
      <PostHeader owner={owner} post={body} postId={_id} />
      <div className="py-2"> {body}</div>
      <Card.Img
        variant="top"
        src="https://images.unsplash.com/photo-1529231812519-f0dcfdf0445f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFsZW50ZWR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
      />
      <PostReactions {...props} />
      <hr className="my-1" />
      <PostActions commentInput={commentInput} selectBlog={selectBlog} />
      <hr className="mt-1" />
      <PostComments comments={comments} />
      <CommentForm commentInput={commentInput} postId={_id} />
    </Card>
  );
}
