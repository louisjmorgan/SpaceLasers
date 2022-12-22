/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { Box, chakra } from '@chakra-ui/react';
import { forwardRef } from 'react';

const SPButton = forwardRef(({
  onClick, children, effectColor, ...props
}, ref) => (
  <chakra.button
    px="10"
    py="2"
    ref={ref}
    minWidth={`${children.length + 10}ch`}
    maxWidth="80%"
    m={0}
    clipPath="polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"
    border="1px solid"
    cursor="pointer"
    borderColor={effectColor || 'text'}
    textTransform="uppercase"
    textAlign="center"
    fontWeight="bold"
    transition="color 0.3s linear"
    onClick={onClick}
    sx={{
      ':hover div': {
        transform: 'scaleX(1)',
      },
    }}
    _hover={{
      color: 'background.300',
      transition: 'none',

    }}
    {...props}

  >
    <Box
      position="absolute"
      inset={0}
      backgroundColor={effectColor || 'text'}
      zIndex={-1}
      transform="scaleX(0)"
      transition="transform 0.3s ease-in-out"
    />
    {children}
  </chakra.button>
));

export default SPButton;
