import { FunctionComponent, useContext, useEffect, useState } from 'react';
import AppContext from '../../store/AppContext';
import Post from '../components/post';
import PostsContainer from '../components/postsContainer';
import './main.scss';

const MainContainer: FunctionComponent = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [showFavPosts, setShowFavPosts] = useState<boolean>(false);
  const [favPosts, setFavPosts] = useState<IPost[]>([]);
  const appContext = useContext(AppContext);
  const { service } = appContext;

  const fetchRedditPosts = async () => {
    const res = (await service?.getRedditTopPosts()) || [];
    setPosts(res);
  };

  const fetchFavoritesPosts = async () => {
    const res = (await service?.getFavTopPosts()) || [];
    setFavPosts(res);
  };

  const handleDiscoverButton = () => {
    setShowFavPosts(false);
    return null;
  };

  const handleOnFavButtonClick = (isFav: boolean, p: IPost) => {
    if (isFav && p.id) {
      service?.deleteFavorite(p.id).then(() => setFavPosts(favPosts.filter((x) => x.id !== p.id)));
    } else {
      if (favPosts.some((x) => x.id === p.id)) {
        alert('Post already marked as favorite!');
      } else {
        service?.setFavorite(p).then((res) => {
          if (res) {
            // @todo: add confirmation dialog.
            setFavPosts([{ ...p, isFavorited: true }, ...favPosts]);
          }
        });
      }
    }
    return null;
  };

  const handleFavoritesButton = () => {
    setShowFavPosts(!showFavPosts);
    if (favPosts.length < 1) {
      fetchFavoritesPosts();
    }
  };

  const handleHeaderClick = (url: string, postId: string) => {
    service?.markAsReaded(postId).then(() => {
      setFavPosts([
        ...favPosts.map((p) => {
          if (p.id === postId) {
            p.viewed = true;
          }
          return p;
        }),
      ]);
    });
    window.open(url, '_blank');
    return null;
  };

  useEffect(() => {
    if (posts.length < 1) {
      fetchRedditPosts();
    }
  }, [showFavPosts]);

  return (
    <div style={{ height: '100vh ' }}>
      <div className="navBar">
        <h1>Reddit Top Post discover</h1>
      </div>
      <div className="menu">
        <button className="button button-clear" onClick={handleDiscoverButton}>
          Discover Posts
        </button>
        <button className="button button-clear" onClick={handleFavoritesButton}>
          Favorite Posts
        </button>
      </div>
      <div style={{ display: 'flex', overflow: 'unset', height: '80%' }}>
        {posts.length > 0 && !showFavPosts ? (
          <PostsContainer>
            <h3>Reddit Top Posts</h3>
            {posts.map((p) => (
              <Post
                post={p}
                key={p.id}
                onFavButtonClick={handleOnFavButtonClick}
                onHeaderClick={handleHeaderClick}
              ></Post>
            ))}
          </PostsContainer>
        ) : null}
        {showFavPosts ? (
          <PostsContainer>
            <h3>Favorited Posts</h3>
            {favPosts.length > 0 ? (
              favPosts.map((p) => (
                <Post
                  post={p}
                  key={p.id}
                  onFavButtonClick={handleOnFavButtonClick}
                  onHeaderClick={handleHeaderClick}
                ></Post>
              ))
            ) : (
              <h4>There are no favorite posts at the moment</h4>
            )}
          </PostsContainer>
        ) : null}
      </div>
    </div>
  );
};

export default MainContainer;
