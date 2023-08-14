import { Heading, Text } from '@chakra-ui/react';
import { Fragment, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import NavBar from '../components/NavBar';
import useUser from '../hooks/useUser';
import useUserStore from '../stores/userStore';
import getToken from '../utils/getToken';

const Error = () => {
  const error = useRouteError();
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
        <Heading>Oops</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? 'This page does not exist.'
            : 'An unexpected error occured.'}
        </Text>
      </Container>
    </Fragment>
  );
};

export default Error;
