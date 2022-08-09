import { Button, Dialog, Group, Text } from '@mantine/core';
import { useState } from 'react';
import SetupModal from './SetupModal';

export default function SetupDialog({ dialog, step, user, company }) {
  const [isDialogOpened, setIsDialogOpened] = useState(dialog);
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <>
      <Dialog opened={isDialogOpened} withCloseButton
        onClose={() => setIsDialogOpened(false)}
        size='lg' radius='md'>
        <Text size='sm' style={{ marginBottom: 10 }} weight={500}>
          Complete account setup
        </Text>
        <Group align='flex-end'>
          <Text>
            Fill in your company details and select a plan to start
            using all services provided by Mirrage.
          </Text>
          <Button className='btn btn-outline-primary' onClick={() => {
            setIsDialogOpened(false);
            setIsModalOpened(true);
          }}>
            Great! Take me there
          </Button>
        </Group>
      </Dialog>

      <SetupModal setIsDialogOpened={setIsDialogOpened}
        isModalOpened={isModalOpened} step={step} user={user}
        setIsModalOpened={setIsModalOpened} company={company} />
    </>
  );
}
