import React, { FunctionComponent, ReactNode } from 'react';
import './postContainer.scss';

interface IPostsContainerProps {
  children?: ReactNode;
}

const PostsContainer: FunctionComponent<IPostsContainerProps> = (props) => {
  return <div className="postContainer">{props.children}</div>;
};

export default PostsContainer;
