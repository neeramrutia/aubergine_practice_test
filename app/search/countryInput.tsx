import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  TextInput,
  TextInputProps,
  useMantineTheme,
  Text,
  Container,
  SimpleGrid,
} from "@mantine/core";
import { useCallback, useState } from "react";
import Link from "next/link";
const d = [{}];
export function Country(props: TextInputProps) {
  const [fetchedData, setFetchedData] = useState([]);
  const [country, setCountry] = useState("");
  const theme = useMantineTheme();
  const fetchdata = useCallback(async (country: any) => {
    console.log("country in country input", country);
    const res = await fetch(`/api/country?country=${country}`);
    const data = await res.json();
    console.log("fetch data called", data);
    setFetchedData(data);
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchdata(country);
        }}
      >
        <SimpleGrid cols={5}>
          <div></div>
          <div>
            <TextInput
              radius="xl"
              size="md"
              placeholder="Enter Country"
              rightSectionWidth={42}
              onChange={(event) => {
                setCountry(event.target.value);
                console.log(country);
              }}
              leftSection={<IconSearch size={18} stroke={1.5} />}
              rightSection={
                <ActionIcon
                  size={32}
                  radius="xl"
                  color={theme.primaryColor}
                  variant="filled"
                >
                  <IconArrowRight size={18} stroke={1.5} />
                </ActionIcon>
              }
              {...props}
            />
          </div>
          <div></div>
          <div>4</div>
          <div></div>
        </SimpleGrid>
      </form>

      <SimpleGrid mt={50} ml={50} mr={50} cols={5}>
        {fetchedData.map((card:any) => {
          return (
            <>
              <Card key={null} shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section
                  component="a"
                  href="https://mantine.dev/"
                ></Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{card.name}</Text>
                  <Badge color="cyan">{card.alpha_two_code}</Badge>
                </Group>

                <Link href={card.web_pages}></Link>

                <Button color="blue" fullWidth mt="md" radius="md">
                  download
                </Button>
              </Card>
            </>
          );
        })}
      </SimpleGrid>
    </>
  );
}
