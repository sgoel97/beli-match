import { AppShell, Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./header.module.css";
import Logo from "../assets/logo.png";

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
      key={link.label}
      className={classes.link}
      data-active={pathname === link.link || undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <AppShell header={{ height: 70 }} padding="md">
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Container size="xl" className={classes.inner}>
          <Group>
            <img src={Logo} height={50} />
          </Group>
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Container>
      </AppShell.Header>
      <AppShell.Main style={{ width: "100vw" }}>
        <Container size="xl" style={style}>
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
