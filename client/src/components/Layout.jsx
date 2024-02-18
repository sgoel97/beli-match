import { AppShell, Container, Group, Burger, Box, Center } from "@mantine/core";
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
    <Box style={{ width: "100vw", minHeight: "100vh" }}>
      <header
        style={{
          borderBottom: "1px solid gray",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 10,
          backgroundColor: "white",
        }}
      >
        <Container size="xl" className={classes.inner}>
          <Group>
            <img src={Logo} height={50} />
          </Group>
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Container>
      </header>

      <Container my={32} py={80} size="xl" style={style}>
        {children}
      </Container>
      <footer
        style={{
          borderTop: "1px solid gray",
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 10,
          backgroundColor: "white",
        }}
      >
        <Center>
          <p>Made with ❤️ at Treehacks</p>
        </Center>
      </footer>
    </Box>
  );
};

export default Layout;
