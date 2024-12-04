"use client"
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { Button, Center, Grid, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
export default function HomePage() {
  return (
    <Center>
      <Button
        variant="light"
        radius="xl"
        size="md"
        pr={14}
        h={48}
        onClick={() => window.location.href = "/search"}
        mt={50}
      >
        Search here
      </Button>
      </Center>
  );
}
