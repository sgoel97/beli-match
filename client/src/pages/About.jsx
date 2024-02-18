import { useEffect } from "react";
import { Text, Box, Title } from "@mantine/core";

import Layout from "../components/Layout";
import Heading from "../components/Heading";
import Logo from "../assets/logo_img.png";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Box align="center">
        <img src={Logo} height={65} />
      </Box>
      <Heading title="About Us" />
      <Box m="auto" align="center" style={{ maxWidth: 600 }}>
        <Text>
          Welcome to BeliMatch, the dating, connections, and restaurant
          recommendation platform connecting students through the power of food
          (😉 Otsuka). Built by a team of UC Berkeley and MIT students for
          TreeHacks 2024, we aim to use technology to bring people closer
          together and bridge the never-ending gap in the dating market for
          college students.
        </Text>

        <Title order={3} mb={24} mt="lg">
          How It Works
        </Title>
        <Text>
          Belimatch uses machine learning, artificial intelligence, and the
          latest in transformer-based vector embedding models (😉 Together AI)
          alongside a sophisticated matching algorithm to match users based on
          their food preferences, dietary restrictions, and culinary curiosity.
          <br />
          <br />
          Our platform facilitates connections that go beyond the dining table,
          encouraging deeper interactions based on mutual love for unique and
          exquisite culinary experiences. From favorite dishes to beloved
          restaurants, BeliMatch aims to make every match a potential recipe for
          connection.
        </Text>

        <Title order={3} mb={24} mt="lg">
          Our Mission
        </Title>
        <Text>
          At BeliMatch, we believe that food is more than just sustenance; it's
          a universal language that connects people from all walks of life. Our
          mission is to harness the power of shared culinary tastes to bring
          individuals together, creating friendships, romances, and everything
          in between. Whether you're a vegan, meat-lover, gluten-free, or a fan
          of everything spicy, BeliMatch is here to help you find your perfect
          plate partner.
        </Text>

        <Text mt={24}>
          Thank you for choosing BeliMatch. Let's embark on this delicious
          journey together, where your next meal could lead to your next
          meaningful connection. Welcome to the table – where shared tastes lead
          to lasting connections.
        </Text>
      </Box>
    </Layout>
  );
};

export default About;
