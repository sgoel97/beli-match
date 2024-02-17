import { AppShell, Container, Center, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./header.module.css";

import { Link, useLocation } from "react-router-dom";

const links = [
  { link: "/", label: "Match" },
  { link: "/about", label: "About" },
];
const Layout = ({ children, ...style }) => {
  const location = useLocation();
  const { pathname } = location;
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      to={link.link}
      className={classes.link}
      data-active={pathname === link.link || undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header style={{ border: "1px solid blue" }}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Container size="xl" className={classes.inner}>
          <Group>
            <p>BeliMatch</p>
          </Group>
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Container>
      </AppShell.Header>
      <AppShell.Main style={{ border: "1px solid blue", width: "100vw" }}>
        <Center>
          <Container size="lg" style={{ textAlign: "center", ...style }}>
            {children}
          </Container>
        </Center>
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
