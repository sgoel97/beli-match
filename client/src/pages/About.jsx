import { Text, Box, Title } from "@mantine/core";

import Layout from "../components/Layout";
import Heading from "../components/Heading";

const About = () => {
  return (
    <Layout>
      <Heading title="About Us" />
      <Box m="auto" align="center" style={{ maxWidth: 600 }}>
        <Text>
          Welcome to BeliMatch, the innovative platform where food preferences
          forge the foundation of meaningful connections! Born out of a
          groundbreaking collaboration between students from MIT and UC
          Berkeley, BeliMatch was conceived at TreeHacks 2024, the premier
          hackathon event that brings together the brightest minds to solve
          real-world problems through technology.
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

        <Title order={3} mb={24} mt="lg">
          How It Works
        </Title>
        <Text>
          Utilizing a sophisticated algorithm, BeliMatch matches users based on
          their food preferences, dietary restrictions, and culinary curiosity.
          Our platform is designed to facilitate connections that go beyond the
          superficial, encouraging deeper interactions based on mutual interests
          in cuisine and dining experiences. From favorite dishes to beloved
          restaurants, BeliMatch aims to make every match a potential recipe for
          connection.
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
