import React, { useState } from 'react';
import { createStyles, Navbar, Group, Box, TextInput, Code, Space, ThemeIcon, Text } from '@mantine/core';
import { Home, Code as CodeIcon, Search, Photo, LayersLinked } from 'tabler-icons-react';
import { useStore } from '../../store/index';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { SwitchThemeToggle } from './SwitchTheme';
import { openSpotlight } from '@mantine/spotlight';
import { User } from './User';
import { WalletInfo } from '../WalletInfo';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md
      // borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
      }
    },

    searchCode: {
      fontWeight: 700,
      fontSize: 10,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]}`
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25) : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7]
        }
      }
    }
  };
});

const data = [
  { link: '/', label: 'Home', icon: Home },
  { link: '/swap', label: 'Example', icon: CodeIcon },
  { link: '/api/graphql', label: 'Playground', icon: LayersLinked, __blank: true }
];

export const NavbarSimple = observer(() => {
  const { classes, cx } = useStyles();
  const { user, god } = useStore();
  const router = useRouter();

  const links = data.map((item) => (
    <Box
      className={cx(classes.link, { [classes.linkActive]: item.link === router.route })}
      sx={{ cursor: 'pointer' }}
      onClick={(event) => {
        if (item.link) {
          if (item.__blank) {
            window.open(item.link, '_blank');
          } else {
            router.push(item.link);
          }
        }
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Box>
  ));

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!user.layout.sidebarOpen.value} width={{ sm: 200, lg: 300 }}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart" align={'center'}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <ThemeIcon size="lg" radius="xl" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
              <CodeIcon />
            </ThemeIcon>
            <Text ml={'sm'} weight="bold" size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
              IoTeX Dapp V3
            </Text>
          </Box>
        </Group>

        <TextInput
          placeholder="Search"
          size="xs"
          mt="lg"
          icon={<Search size={12} />}
          rightSectionWidth={70}
          rightSection={<Code className={classes.searchCode}>⌘ + K</Code>}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          mb="sm"
          onClick={() => openSpotlight()}
        />
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <User />
      </Navbar.Section>
      <WalletInfo />
    </Navbar>
  );
});
