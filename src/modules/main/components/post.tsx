import { FunctionComponent } from 'react';
import './post.scss';

interface IPostProps {
  post: IPost;
}

const Post: FunctionComponent<IPostProps> = (props) => {
  const { post } = props;
  const mediaStyle = { backgroundImage: `url(${post.Thumbnail}` };

  return (
    <div className="card">
      <div className="card_body">
        <h3>{post.Title}</h3>
        <h4 className="card_body_author">by: {post.Author}</h4>
        <div className="card_footer">
          <p className="card_body_comments">{post.NumberOfComments} comments</p>
          <p className="card_body_date">{post.EntryDate}</p>
        </div>
      </div>
      <div className="card_media" style={mediaStyle}></div>
    </div>
  );
};

export default Post;
