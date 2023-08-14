import {
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Fragment, useEffect, useRef } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import useCart from '../hooks/useCart';
import useItemQueryStore from '../stores/itemQueryStore';
import useUserStore from '../stores/userStore';
import { useLogoutToast } from '../utils/toasts';
import CartIcon from './CartIcon';

const NavBar = () => {
  const ref = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const user = useUserStore(s => s.user);
  const removeUser = useUserStore(s => s.removeUser);
  const setText = useItemQueryStore(s => s.setText);
  const { data: cart } = useCart();
  const navigate = useNavigate();
  const logoutToast = useLogoutToast();
  const query = useItemQueryStore(s => s.itemQuery);

  useEffect(() => {
    if (query.searchText === '') formRef.current?.reset();
  }, [query]);

  const logout = () => {
    localStorage.removeItem('token');
    removeUser();
    navigate('/login');
    logoutToast();
  };

  return (
    <Navbar expand="sm" bg="dark" data-bs-theme="dark" fixed="top">
      <Container className="py-2">
        <Navbar.Brand as={Link} to="/">
          <Image src={logo} boxSize="40px" fit="cover" rounded="full" />
        </Navbar.Brand>

        {!user?.isAdmin && (
          <Box width="50%">
            <form
              ref={formRef}
              onSubmit={e => {
                e.preventDefault();
                if (ref && ref.current) {
                  setText(ref.current?.value);
                  navigate('/');
                }
              }}
            >
              <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                  ref={ref}
                  variant="fill"
                  color="whiteAlpha.900"
                  placeholder="Search games..."
                  borderRadius={20}
                />
              </InputGroup>
            </form>
          </Box>
        )}
        {user && !user.isAdmin && <CartIcon items={cart?.itemsInCart!} />}

        <Navbar.Toggle className="ms-2" />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              {user?.isAdmin ? 'Inventory' : 'Products'}
            </Nav.Link>
            {user && !user.isAdmin && (
              <Nav.Link as={NavLink} to="/orders">
                Orders
              </Nav.Link>
            )}
            {!user ? (
              <Fragment>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </Fragment>
            ) : (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
