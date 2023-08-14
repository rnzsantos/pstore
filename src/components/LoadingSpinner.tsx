import { Center, CircularProgress } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <Center>
      <CircularProgress isIndeterminate color="green.300" thickness="12px" />
    </Center>
  );
};

export default LoadingSpinner;
