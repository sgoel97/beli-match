import { Stack, Title, Text } from "@mantine/core";

const Heading = ({ title, subtitle }) => {
  return (
    <Stack align="center" mb={32}>
      <Title>{title}</Title>
      {subtitle && <Text>{subtitle}</Text>}
    </Stack>
  );
};

export default Heading;
