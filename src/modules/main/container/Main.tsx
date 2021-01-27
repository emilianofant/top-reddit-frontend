import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
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
    return null;
  };

  const handleOnFavButtonClick = (isFav: boolean, p: IPost) => {
    if (isFav && p.id) {
      service?.deleteFavorite(p.id).then(() => setFavPosts(favPosts.filter((x) => x.id !== p.id)));
    } else {
      service?.setFavorite(p).then((res) => {
        if (res) {
          // @todo: add confirmation dialog.
          setFavPosts([p, ...favPosts]);
        } else {
          // @todo: implement a nice error/warning messages handler
          alert('Post already marked as favorite!');
        }
      });
    }
    return null;
  };

  const handleFavoritesButton = () => {
    setShowFavPosts(!showFavPosts);
    if (favPosts.length < 1) {
      fetchFavoritesPosts();
    }
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
        {posts.length > 0 ? (
          <PostsContainer>
            <h3>Reddit Top Posts</h3>
            {posts.map((p) => (
              <Post post={p} key={p.id} onFavButtonClick={handleOnFavButtonClick}></Post>
            ))}
          </PostsContainer>
        ) : null}
        {favPosts.length > 0 && showFavPosts ? (
          <PostsContainer>
            <h3>Favorited Posts</h3>
            {favPosts.map((p) => (
              <Post post={p} key={p.id} onFavButtonClick={handleOnFavButtonClick}></Post>
            ))}
          </PostsContainer>
        ) : null}
      </div>
    </div>
  );
};

export default MainContainer;
