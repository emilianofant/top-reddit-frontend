import { FunctionComponent } from 'react';
import './post.scss';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';

interface IPostProps {
  post: IPost;
  onFavButtonClick: (p: boolean) => void;
}

const Post: FunctionComponent<IPostProps> = (props) => {
  const { post, onFavButtonClick } = props;
  const mediaStyle = { backgroundImage: `url(${post.Thumbnail}` };

  return (
    <div className="card">
      <a className="card_starButton" onClick={() => onFavButtonClick(post.IsFavorited || false)}>
        <i className="fas fa-star"></i>
      </a>
      <div className="card_body">
        {/* @todo: handle event with onClick, prevent default and switch read/unread state */}
        <a href={post.PostUrl}>
          <h3>{post.Title}</h3>
        </a>
        <h4 className="card_body_author">by: {post.Author}</h4>
        <div className="card_footer">
          <p className="card_body_comments">
            <i className="fas fa-comments"></i> &nbsp;
            {post.NumberOfComments} comments
          </p>
          <p className="card_body_date">{post.EntryDate}</p>
        </div>
      </div>
      <div className="card_media" style={mediaStyle}></div>
    </div>
  );
};

export default Post;
