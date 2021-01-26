import { FunctionComponent, useContext, useEffect, useState } from 'react';
import AppContext from '../../store/AppContext';
import Post from '../components/post';

const MainContainer: FunctionComponent = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const appContext = useContext(AppContext);
  const { service } = appContext;

  const fetchRedditPosts = async () => {
    const res = (await service?.getRedditTopPosts()) || [];
    setPosts(res);
  };

  useEffect(() => {
    fetchRedditPosts();
  }, []);

  return (
    <div>
      <h1>Reddit Top Post discover</h1>
      {posts.length > 0 ? posts.map((p) => <Post post={p} key={p.ID}></Post>) : ''}
    </div>
  );
};

export default MainContainer;
