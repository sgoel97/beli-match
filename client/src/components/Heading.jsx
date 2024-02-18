import { Stack, Title, Text, Flex } from "@mantine/core";
import BeliMatch from "../assets/logo_txt.png";

const Heading = ({ title, subtitle }) => {
  return (
    <Stack align="center" mb={32}>
      {title ? (
        <Title h="fit-content" order={1} size={50}>
          {title}
        </Title>
      ) : (
        <img src={BeliMatch} height={65} />
      )}

      {subtitle && <Text>{subtitle}</Text>}
    </Stack>
  );
};

export default Heading;
