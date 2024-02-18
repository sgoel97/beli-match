import { useState } from "react";
import {
  Title,
  Stack,
  Fieldset,
  Flex,
  Button,
  TextInput,
  Textarea,
  Select,
  Checkbox,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import Layout from "../components/Layout";
import Heading from "../components/Heading";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtRVuffLhGrEclezlrDmJ9mLX-qafBoOQ",
  authDomain: "beli-match.firebaseapp.com",
  projectId: "beli-match",
  storageBucket: "beli-match.appspot.com",
  messagingSenderId: "681031852804",
  appId: "1:681031852804:web:5e2a47572749b19a086651",
  measurementId: "G-FS4NG19DTS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Home = () => {
  const [submitted, setSubmitted] = useState(false);
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
      lookingFor: "Love",
      restaurantRecs: "Yes",
      loveMatch: "",

      beli: "",
      yelp: "",
      restaurants: "",
      city: "",

      cheese: "",
      cuisine: "",
      first: "",
      buffet: "",

      termsOfService: false,
    },

    validate: {
      firstName: (value) =>
        value && value.length > 2 ? null : "First name is required",
      // lastName: (value) =>
      //   value && value.length > 2 ? null : "Last name is required",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      // school: (value) => (value ? null : "Please select a school"),
      // otherSchool: (value, values) =>
      //   values.school == "Not on this list" && !value
      //     ? "Please enter a school name"
      //     : null,
      // insta: (value) => (value ? null : "Please enter a handle or link"),

      beli: (value, values) =>
        value || values.yelp || values.restaurants
          ? null
          : "Please input some food information",

      gender: (value) => (value ? null : "Please choose an option"),
      lookingFor: (value) => (value ? null : "Please choose an option"),
      restaurantRecs: (value) => (value ? null : "Please choose an option"),
      loveMatch: (value) => (value ? null : "Please choose an option"),

      city: (value) => (value ? null : "Please enter in a city"),
      termsOfService: (value) =>
        value ? false : "You must agree to use BeliMatch",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setDoc(doc(db, "users", data.email), data);
    form.reset();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <Heading subtitle="Thank you for participating in BeliMatch!" />
        <Flex direction="column" align="center">
          <Text mb={36} align="center">
            We will get back to you near the end of the hackathon with your top
            food match and some food recommendations.
          </Text>
          <Button w={200} onClick={() => setSubmitted(false)}>
            Submit Again
          </Button>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading subtitle="Find Your Perfect Plate Partner with BeliMatch – Where Shared Tastes Lead to Lasting Connections!" />

      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Stack m="auto" gap="xl" style={{ width: "100%", maxWidth: 550 }}>
          <Fieldset legend="Contact Information">
            <Stack gap="sm">
              <Flex justify="space-between" gap={20}>
                <TextInput
                  w={300}
                  label="Full Name"
                  {...form.getInputProps("firstName")}
                />
                {/* <TextInput
                  w={225}
                  label="Last Name"
                  {...form.getInputProps("lastName")}
                /> */}
              </Flex>

              {/* <TextInput
                label="Instagram Handle or Facebook Link"
                placeholder="@belimatch"
                {...form.getInputProps("insta")}
              /> */}

              <TextInput
                label="School Email Address"
                placeholder="carolxu@stanford.edu"
                {...form.getInputProps("email")}
              />

              {/* <Select
                label="School"
                placeholder="Stanford"
                searchable
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
              /> */}

              {/* <TextInput
                label="[Optional] If your school was not on the list, please add it below"
                {...form.getInputProps("otherSchool")}
              /> */}

              {/* <TextInput
                label="[Optional] Phone Number"
                placeholder="XXX-XXX-XXXX"
                {...form.getInputProps("phone")}
              /> */}
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

              {/* <Select
                label="Would you like us to send you restaurant recommendations?"
                placeholder="Choose One"
                data={["Yes", "No"]}
                {...form.getInputProps("restaurantRecs")}
              /> */}

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

          <Fieldset legend="Food">
            <Stack gap="sm">
              <TextInput
                label="Beli Username"
                placeholder="@belimatch"
                {...form.getInputProps("beli")}
              />

              <Title order={5}>OR</Title>

              <TextInput
                label="Yelp Profile"
                placeholder="@belimatch"
                {...form.getInputProps("yelp")}
              />

              <Title order={5}>OR</Title>

              <Textarea
                label="The Names of your Top 3 Favorite Restaurants"
                description="Pick some restaurants near your college!"
                autosize
                placeholder="Ippudo
Chez Penisse
Top Dog"
                minRows={3}
                {...form.getInputProps("restaurants")}
              />

              <TextInput
                label="What is your favorite city for food?"
                placeholder="San Francisco"
                {...form.getInputProps("city")}
              />
            </Stack>
          </Fieldset>

          <Fieldset legend="Optional">
            <Stack gap="sm">
              <Title order={3}>
                The rest of these questions are for fun, they're optional!
              </Title>
              <Select
                label="If you were a type of cheese, which one would you be?"
                placeholder="Choose One"
                data={[
                  "Cheddar – Classic, reliable, and great in all situations",
                  "Blue Cheese – Bold, distinctive, and a bit of a wildcard",
                  "Brie – Sophisticated, creamy, and always the life of the party",
                  "Vegan Cheese – Innovative, inclusive, and full of surprises",
                ]}
                {...form.getInputProps("cheese")}
              />

              <Select
                label="Your ideal first meeting involves:"
                placeholder="Choose One"
                data={[
                  "A five-course meal at a Michelin-star restaurant",
                  "Cooking a new recipe together at home",
                  "Street food tour in the city",
                  "A food-themed trivia night at a local pub",
                ]}
                {...form.getInputProps("first")}
              />

              <Select
                label="If you could only eat one cuisine for the rest of your life, what would it be?"
                placeholder="Choose One"
                data={[
                  "Italian – Because life without pasta is unthinkable",
                  "Japanese – Fresh, refined, and a little bit adventurous",
                  "Mexican – Bold flavors and the best comfort food",
                  "Indian – Spicy, diverse, and utterly delicious",
                ]}
                {...form.getInputProps("cuisine")}
              />

              <Select
                label="At a buffet, you head straight for:"
                placeholder="Choose One"
                data={[
                  "The seafood section – A taste of the ocean",
                  "The carving station – Meat, meat, and more meat",
                  "The vegan corner – Green and clean",
                  "The dessert table – First come, first served",
                  "The exotic foods – Always up for a culinary adventure",
                ]}
                {...form.getInputProps("buffet")}
              />
            </Stack>
          </Fieldset>

          <Checkbox
            ml="md"
            label=" Data Note: Please confirm below that you're allowing us to send
          you an email to you and your match with each others' information!"
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Layout>
  );
};

export default Home;
