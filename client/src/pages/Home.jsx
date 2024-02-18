import {
  Title,
  Text,
  Stack,
  Fieldset,
  Flex,
  Button,
  Input,
  TextInput,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import Layout from "../components/Layout";
import Heading from "../components/Heading";

const Home = () => {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      school: "",
      otherSchool: "",
      insta: "",
      phone: "",
      gender: "",
      lookingFor: "love",
      restaurantRecs: true,
      loveMatch: "",

      termsOfService: false,
    },

    validate: {
      firstName: (value) =>
        value && value.length > 2 ? null : "First name is required",
      lastName: (value) =>
        value && value.length > 2 ? null : "Last name is required",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      school: (value) => (value ? null : "Please select a school"),
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <Heading title="BeliMatch" subtitle="test" />

      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Stack w={500} m="auto" gap="xl">
          <Fieldset legend="Contact Information">
            <Stack gap="sm">
              <Flex justify="space-between">
                <TextInput
                  w={200}
                  label="First Name"
                  {...form.getInputProps("firstName")}
                />
                <TextInput
                  w={200}
                  label="Last Name"
                  {...form.getInputProps("lastName")}
                />
              </Flex>

              <TextInput
                label="School Email Address"
                placeholder="carolxu@stanford.edu"
                {...form.getInputProps("email")}
              />

              <Select
                label="School"
                placeholder="Stanford"
                data={[
                  "UC Berkeley",
                  "MIT",
                  "Stanford",
                  "Harvard",
                  "Georgia Tech",
                  "Princeton",
                  "Yale",
                  "UPenn",
                  "Caltech",
                  "Brown",
                  "Johns-Hopkins",
                  "Northwestern",
                  "Columbia",
                  "Cornell",
                  "UChicago",
                  "UCLA",
                  "Rice",
                  "Dartmouth",
                  "Vanderbilt",
                  "Notre Dame",
                  "UMich Ann-Arbor",
                  "Georgetown",
                  "UNC Chapel Hill",
                  "Carnegie Mellon",
                  "Emory University",
                  "University of Virginia",
                  "Washington University in St. Louis",
                  "UC Davis",
                  "UCSD",
                  "USC",
                  "UT Austin",
                  "UC Irvine",
                  "NYU",
                  "UCSB",
                  "UIUC",
                  "Boston College",
                  "Not on this list",
                ]}
                {...form.getInputProps("school")}
              />

              <TextInput
                label="[Optional] If your school was not on the list, please add it below"
                {...form.getInputProps("otherSchool")}
              />

              <TextInput
                label="Instagram Handle or Facebook Link"
                placeholder="@belimatch"
                {...form.getInputProps("insta")}
              />

              <TextInput
                label="[Optional] Phone Number"
                placeholder="XXX-XXX-XXXX"
                {...form.getInputProps("phone")}
              />
            </Stack>
          </Fieldset>

          <Fieldset legend="Preferences">
            <Stack gap="sm">
              <Select
                label="Gender"
                placeholder="Choose One"
                data={["Male", "Female", "Nonbinary"]}
                {...form.getInputProps("gender")}
              />

              <Select
                label="I'm looking for..."
                placeholder="Choose One"
                data={["Love", "Friendship", "Love and Friendship", "None"]}
                {...form.getInputProps("lookingFor")}
              />

              <Select
                label="Would you like us to send you restaurant recommendations?"
                placeholder="Choose One"
                data={["Yes", "No"]}
                {...form.getInputProps("restaurantRecs")}
              />
              <Select
                label="For love, I would like to be matched with..."
                placeholder="Choose One"
                data={[
                  "Men",
                  "Women",
                  "Men & women",
                  "Nonbinary-people",
                  "Nonbinary & men",
                  "Nonbinary & women",
                  "People of all genders",
                  "Only looking for friends",
                ]}
                {...form.getInputProps("loveMatch")}
              />
            </Stack>
          </Fieldset>

          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Layout>
  );
};

export default Home;
