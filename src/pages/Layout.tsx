import { Fragment, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import useUser from '../hooks/useUser';
import useUserStore from '../stores/userStore';
import getToken from '../utils/getToken';

const Layout = () => {
  const { data: user, isLoading } = useUser(getToken());
  const setUser = useUserStore(s => s.setUser);

  useEffect(() => {
    if (user) setUser(user);
  }, [user]);

  if (isLoading) return null;

  return (
    <Fragment>
      <NavBar />
      <Container className="py-5">
        <Outlet />
      </Container>
    </Fragment>
  );
};

export default Layout;
