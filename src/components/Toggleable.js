import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Stack } from '@chakra-ui/react';

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Box my={4}>
      <Stack style={hideWhenVisible}>
        <Button size={'lg'} my={2} onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </Stack>
      <Box style={showWhenVisible}>
        {props.children}
        <Button mb={10} colorScheme={'red'} onClick={toggleVisibility}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Toggleable.displayName = 'Toggleable';

export default Toggleable;
