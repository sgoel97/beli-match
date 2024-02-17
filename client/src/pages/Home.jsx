import {
  Title,
  Text,
  Stack,
  Fieldset,
  Flex,
  Button,
  Input,
  Select,
} from "@mantine/core";
import { useForm } from "react-hook-form";

import Layout from "../components/Layout";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <Stack align="center" mb={32}>
        <Title>BeliMatch</Title>
        <Text>hi</Text>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack w={500} m="auto" gap="xl">
          <Fieldset legend="Contact Information">
            <Stack gap="sm">
              <Flex justify="space-between">
                <Input.Wrapper
                  w={200}
                  label="First Name"
                  error={errors.lastName && "This field is required"}
                >
                  <Input {...register("firstName", { required: true })} />
                </Input.Wrapper>

                <Input.Wrapper
                  w={200}
                  label="Last Name"
                  error={errors.lastName && "This field is required"}
                >
                  <Input {...register("lastName", { required: true })} />
                </Input.Wrapper>
              </Flex>

              <Input.Wrapper
                label="School Email Address"
                error={errors.emailAddress && "This field is required"}
              >
                <Input
                  placeholder="carolxu@berkeley.edu"
                  {...register("emailAddress", { required: true })}
                />
              </Input.Wrapper>

              {/* <Select
                // label="School"
                // error={errors.school && "This field is required"}
                placeholder="Pick one"
                data={["React", "Angular", "Vue"]}
                searchable
                {...register("school", { required: true })}
              /> */}
            </Stack>
          </Fieldset>

          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Layout>
  );
};

export default Home;
