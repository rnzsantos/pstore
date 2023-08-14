import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import useProductQueryStore from '../stores/productQueryStore';

const ProductFilter = () => {
  const isActive = useProductQueryStore(s => s.isActive);
  const setIsActive = useProductQueryStore(s => s.setIsActive);

  const menuItems = [
    { value: '', label: 'All' },
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' },
  ];

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {isActive === true ? 'Active' : isActive === false ? 'Inactive' : 'All'}
      </MenuButton>
      <MenuList>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            value={item.value}
            onClick={() => setIsActive(item.value)}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ProductFilter;
