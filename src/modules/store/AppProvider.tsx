import { useState } from 'react';
import Service from '../services/service';
import AppContext from './AppContext';

const AppProvider: React.FC = ({ children }): JSX.Element => {
  const [service] = useState<Service>(new Service());

  return <AppContext.Provider value={{ service }}>{children}</AppContext.Provider>;
};

export default AppProvider;
