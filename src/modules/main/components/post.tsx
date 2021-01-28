import { FunctionComponent } from 'react';
import './post.scss';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';

interface IPostProps {
  post: IPost;
  onFavButtonClick: (isFav: boolean, p: IPost) => void;
  onHeaderClick: (url: string, postId: string) => void;
}

const Post: FunctionComponent<IPostProps> = (props) => {
  const { post, onFavButtonClick, onHeaderClick } = props;
  const mediaStyle = { backgroundImage: `url(${post.thumbnail}` };
  const postURL = `https://reddit.com${post.permalink}`;

  return (
    <div className="card">
      <a
        className="card_starButton"
        onClick={() => onFavButtonClick(post.isFavorited || false, post)}
      >
        <i className="fas fa-star"></i>
      </a>
      <div className="card_body">
        {/* @todo: handle event with onClick, prevent default and switch read/unread state */}
        <h3 className="card_body_header" onClick={() => onHeaderClick(postURL, post.id)}>
          {post.title}
        </h3>
        <h4 className="card_body_author">by: {post.author}</h4>
        <div className="card_footer">
          <p className="card_body_comments">
            <i className="fas fa-comments"></i> &nbsp;
            {post.num_comments} comments
          </p>
          {post.viewed ? (
            <p className="card_body_view">
              <i className="fas fa-eye"></i> &nbsp; Viewed
            </p>
          ) : (
            ''
          )}
          <p className="card_body_date">{post.entryDate}</p>
        </div>
      </div>
      <div className="card_media" style={mediaStyle}></div>
    </div>
  );
};

export default Post;
