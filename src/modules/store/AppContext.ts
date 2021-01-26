import React from 'react';
import Service from '../services/service';

interface IAppContext {
  service: Service | null;
}

const AppContext = React.createContext<IAppContext>({
  service: null,
});

export default AppContext;
