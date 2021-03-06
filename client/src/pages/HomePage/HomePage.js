import React, { useEffect, useState } from "react";
import { postActions } from "../../redux/actions/post.actions";
import { authActions } from "../../redux/actions/auth.actions";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.css";

import Post from "../../components/Post";
import Composer from "../../components/Composer";

const SIDEBAR_BUTTONS = [
  {
    title: "Friends",
    icon: "users",
  },
  {
    title: "Events",
    icon: "calendar",
  },
  {
    title: "Groups",
    icon: "user-friends",
  },
  {
    title: "Pages",
    icon: "flag",
  },
  {
    title: "See More",
    icon: "angle-down",
  },
];

const SidebarButton = ({ title, icon }) => {
  return (
    <Button className="d-flex align-items-center sidebar-button border-0 text-dark btn-light">
      {" "}
      <FontAwesomeIcon icon={icon} size="lg" style={{ width: "4rem" }} />
      <span>{title}</span>
    </Button>
  );
};

/* STEP 3 */
export default function HomePage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const post = useSelector((state) => state.post);
  const [pageNum, setPageNum] = useState(2);
  const handleNext = () => {
    // setHasMore(post.totalPageNum >= page);
    setPageNum((pageNum) => pageNum + 1);
    dispatch(postActions.postsRequest(pageNum));
  };

  useEffect(() => {
    dispatch(postActions.postsRequest());
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    dispatch(authActions.getCurrentUser());
    //eslint-disable-next-line
  }, []);

  if (!isAuthenticated) return <Redirect to="/auth" />;

  return (
    <Row>
      <Col className="d-flex flex-column pl-1 mt-3">
        <ButtonGroup vertical>
          {SIDEBAR_BUTTONS.map((b) => {
            return <SidebarButton key={b.title} {...b} />;
          })}
        </ButtonGroup>
      </Col>
      <Col
        xs={5}
        id="scrollingElement"
        className="d-flex flex-column align-items-center posts-container"
      >
        <Composer />
        {/* {post.loading ? (
          <h2>Loading</h2>
        ) : (
          post.posts.map((p) => <Post key={p._id} {...p} />)
        )} */}
        {post.loading ? (
          <h2>Loading</h2>
        ) : (
          <InfiniteScroll
            dataLength={post.numPosts || 10} //This is important field to render the next data
            next={() => handleNext()}
            hasMore={post.hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollingElement"
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>You have seen it all!</b>
              </p>
            }
          >
            {post.posts.map((p) => (
              <Post key={p._id} {...p} />
            ))}
          </InfiniteScroll>
        )}
      </Col>
      <Col></Col>
    </Row>
  );
}
