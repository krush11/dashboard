import { AppShell, Navbar as NavbarSection, Header as HeaderSection } from '@mantine/core';
import { useState, useEffect } from 'react';

import Header from './Header';
import Navbar from './Navbar';

export default function Layout({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(true);
  useEffect(() => {
    console.log(`Nav ${isNavOpen ? 'opened' : 'closed'}`);
  }, [isNavOpen]);

  return (
    <AppShell
      header={<HeaderSection height={60}>
        <Header setIsNavOpen={setIsNavOpen} />
      </HeaderSection>}
      navbar={<NavbarSection width={{ base: 250 }} p='md'><Navbar /></NavbarSection>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}>
      {children}
    </AppShell>
  )
}
