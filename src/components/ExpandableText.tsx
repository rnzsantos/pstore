import { Button, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const limit = 500;

  if (children.length <= limit) return <Text>{children}</Text>;

  const text = isExpanded ? children : children.substring(0, limit) + '...';

  return (
    <Text>
      {text}
      <Button
        size="xs"
        marginLeft={2}
        colorScheme="linkedin"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show less' : 'Read more'}
      </Button>
    </Text>
  );
};

export default ExpandableText;
