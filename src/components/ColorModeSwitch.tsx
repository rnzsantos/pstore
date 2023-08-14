import { HStack, Icon, Switch, useColorMode } from '@chakra-ui/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack
      marginRight={5}
      marginTop={{ base: 2, md: 0 }}
      marginLeft={{ base: 0, md: 5 }}
    >
      {colorMode === 'dark' ? (
        <Icon as={MdDarkMode} color="white" boxSize="20px" />
      ) : (
        <Icon as={MdLightMode} color="white" boxSize="20px" />
      )}

      <Switch
        id="dark-mode"
        colorScheme="whiteAlpha"
        onChange={toggleColorMode}
        isChecked={colorMode === 'dark'}
      />
    </HStack>
  );
};

export default ColorModeSwitch;
