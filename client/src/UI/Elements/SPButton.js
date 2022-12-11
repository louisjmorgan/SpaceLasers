/* eslint-disable react/prop-types */
import { Box, chakra } from '@chakra-ui/react';

function SPButton({ onClick, children }) {
  return (
    <chakra.button
      px="10"
      py="2"
      minWidth="15ch"
      clipPath="polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"
      border="2px solid"
      borderColor="green.500"
      textTransform="uppercase"
      fontWeight="bold"
      type="button"
      onClick={onClick}
      sx={{
        ':hover div': {
          transform: 'scaleX(1)',
        },
      }}
      // _after={{
      //   content: '""',
      //   position: 'absolute',
      //   width: '100%',
      //   height: '100%',
      //   left: 0,
      //   top: 0,
      // }}
      // _hover={{ bg: 'green.300' }}
    >
      <Box
        position="absolute"
        inset={0}
        backgroundColor="green.500"
        zIndex={-1}
        transform="scaleX(0)"
        transition="transform 0.3s ease-in-out"
        sx={{
          'div:hover': {
            transform: 'scaleX(1)',
          },
        }}

      />
      {children}
    </chakra.button>
  );
}

export default SPButton;
