import {
  IconArrowRight,
  IconCalendar,
  IconChevronDown,
  IconPackage,
  IconSearch,
  IconSquareCheck,
  IconUsers,
} from "@tabler/icons-react";
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
  Menu,
} from "@mantine/core";
import { useCallback, useState } from "react";
import Link from "next/link";
const d = [{}];
const provinces = new Set();
export function Country(props: TextInputProps) {
  const [filter, setFilter] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [country, setCountry] = useState("");
  const theme = useMantineTheme();
  const fetchdata = useCallback(async (country: any) => {
    const res = await fetch(`/api/country?country=${country}`);
    const data = await res.json();
    console.log(fetchedData);
    setFetchedData(data);
    console.log(fetchedData[0]["state-province"]);

    for (let i = 0; i < fetchedData.length; i++) {
      provinces.add(fetchedData[i]["state-province"]);
    }
    console.log("provinces", provinces);
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
          <div>
            <Menu
              transitionProps={{ transition: "pop-top-right" }}
              position="top-end"
              width={220}
              withinPortal
            >
              <Menu.Target>
                <Button
                  rightSection={<IconChevronDown size={18} stroke={1.5} />}
                  pr={12}
                >
                  filter
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {Array.from(provinces).map((province: any) => {
                  return (
                    <Menu.Item
                      onClick={() => {
                        setFilter(province);
                      }}
                      leftSection={
                        <IconPackage
                          size={16}
                          color={theme.colors.blue[6]}
                          stroke={1.5}
                        />
                      }
                    >
                      {province}
                    </Menu.Item>
                  );
                })}
              </Menu.Dropdown>
            </Menu>
          </div>
          <div></div>
        </SimpleGrid>
      </form>

      <SimpleGrid mt={50} ml={50} mr={50} cols={5}>
        {fetchedData.map((card: any) => {
          return (
            <>
              {provinces.has(card.country) && (
                <Card
                  key={null}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                >
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
              )}
            </>
          );
        })}
      </SimpleGrid>
    </>
  );
}
