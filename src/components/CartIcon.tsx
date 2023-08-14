import { Icon } from '@chakra-ui/react';
import { Badge } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface Props {
  items: number;
}

const CartIcon = ({ items }: Props) => {
  return (
    <div className="d-inline-block position-relative ms-md-3">
      <Link to="/cart">
        <Icon as={BsCart} boxSize="25px" color="white" />

        <Badge
          pill
          bg="danger"
          style={{ position: 'absolute', top: -8, right: -8 }}
        >
          {items}
        </Badge>
      </Link>
    </div>
  );
};

export default CartIcon;
