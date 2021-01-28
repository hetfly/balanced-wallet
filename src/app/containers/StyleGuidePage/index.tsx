import React from 'react';

import { Helmet } from 'react-helmet-async';
import { Flex, Box } from 'rebass/styled-components';

import { Button, TextButton } from 'app/components/Button';
import { Link } from 'app/components/Link';
import { BoxPanel } from 'app/components/Panel';
import { Popper } from 'app/components/Popover';
import QuestionHelper from 'app/components/QuestionHelper';
import { Typography } from 'app/theme';

export function StyleGuidePage() {
  const [anchor, setAnchor] = React.useState<HTMLAnchorElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setAnchor(anchor ? null : e.currentTarget);
  };

  return (
    <>
      <Helmet>
        <title>Style Guide Page</title>
        <meta name="description" content="Balanced Network Interface Style Guide" />
      </Helmet>

      <Typography variant="h1">Style Guide</Typography>

      <Typography variant="h1">Heading 1</Typography>

      <Typography variant="h2">Heading 2</Typography>

      <Typography variant="h3">Heading 3</Typography>

      <Typography variant="p">This is a paragraph of text.</Typography>

      <Typography variant="label">This is a label.</Typography>

      <br />

      <Link href="#">This is a link</Link>

      <br />

      <Link href="#" onClick={handleClick}>
        This is a dropdown
      </Link>

      <Popper show={Boolean(anchor)} anchorEl={anchor} placement="bottom">
        <Box p={2}>
          <Typography>This a dropdown</Typography>
        </Box>
      </Popper>
      <br />

      <Flex>
        <Typography>
          This is a tooltip.This is a tooltip.This is a tooltip.This is a tooltip.This is a tooltip.
        </Typography>
        <QuestionHelper text={"Use this tool to find pairs that don't automatically appear in the interface."} />
      </Flex>

      <Button>Hello World</Button>
      <Button disabled>Hello World</Button>
      <TextButton>Cancel</TextButton>

      <BoxPanel bg="bg2">
        <Typography variant="p">This is a panel</Typography>
      </BoxPanel>

      <BoxPanel bg="bg3">
        <Typography variant="p">This is a panel</Typography>
      </BoxPanel>
    </>
  );
}
