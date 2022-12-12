/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import { IconButton } from '@chakra-ui/button';
import { Tooltip } from '@chakra-ui/tooltip';

function CustomIconButton({
  label, icon, onClick, value, isActive,
}) {
  return (
  // <Tooltip
  //   label={label}
  //   openDelay={500}
  // >
    <IconButton
      variant={isActive ? 'active' : 'solid'}
      icon={icon}
      aria-label={label}
      onClick={onClick}
      value={value}
    />
  // </Tooltip>
  );
}

export default CustomIconButton;
