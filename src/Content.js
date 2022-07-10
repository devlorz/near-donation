import React, { useState } from "react";
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  useMantineTheme,
  Dialog,
  Group,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";
import { Dots } from "./Dots";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 120,
    paddingBottom: 80,

    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    "@media (max-width: 755px)": {
      display: "none",
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 520px)": {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export default function HeroText() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      title: "",
      donate: 0,
      description: "",
      image_url: "",
    },
  });

  const handleSubmit = async (values) => {
    setOpened(false);
    showNotification({
      id: "load-data",
      loading: true,
      title: "Updating data",
      autoClose: false,
      disallowClose: true,
    });
    await window.contract.add_crowdfund({
      ...values,
      donate: values.donate * 1,
    });
    updateNotification({
      id: "load-data",
      color: "teal",
      title: "Data was updated",
      icon: <Check size={18} />,
      autoClose: 2000,
    });
    window.location.reload();
  };

  return (
    <>
      <Container className={classes.wrapper} size={1400}>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            Donation for{" "}
            <Text component="span" color={theme.primaryColor} inherit>
              Good Cause
            </Text>{" "}
            Projects
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" color="dimmed" className={classes.description}>
              Make a donation for good cause projects via Near protocol. You can
              also create project to raise funds! Also vote for projects to make
              it on the top page.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button
              className={classes.control}
              size="lg"
              onClick={() => setOpened((o) => !o)}
            >
              Create new project
            </Button>
          </div>
        </div>
      </Container>

      <Dialog
        opened={opened}
        withCloseButton
        onClose={() => setOpened(false)}
        size="lg"
        radius="md"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
            Create new project
          </Text>
          <TextInput
            required
            placeholder="Title"
            mb={10}
            style={{ flex: 1 }}
            {...form.getInputProps("title")}
          />
          <TextInput
            required
            placeholder="Description"
            mb={10}
            style={{ flex: 1 }}
            {...form.getInputProps("description")}
          />
          <Group align="center">
            <TextInput
              required
              placeholder="Target"
              mb={10}
              {...form.getInputProps("donate")}
            />{" "}
            Near
          </Group>
          <TextInput
            required
            placeholder="URL"
            mb={10}
            style={{ flex: 1 }}
            {...form.getInputProps("image_url")}
          />
          <Group position="right" align="flex-end">
            <Button type="submit">Create</Button>
          </Group>
        </form>
      </Dialog>
    </>
  );
}
