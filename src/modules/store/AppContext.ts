import React from 'react';
import Service from '../services/post.service';

interface IAppContext {
  service: Service | null;
}

const AppContext = React.createContext<IAppContext>({
  service: null,
});

export default AppContext;
