import React from "react";
import {
	Flex,
	Text,
	Icon,
	Menu,
	MenuButton,
} from "@chakra-ui/react";

export default function NavItem({ icon, title, active, navSize }) {
	return (
		<Flex
			mt={30}
			flexDir="column"
			w="100%"
			alignContent={"center"}
			alignSelf={"center"}
			textAlign={"center"}
			justifyContent={"center"}
			alignItems={navSize == "large" ? "center" : "center"}>
			<Menu placement="right">
				<Flex
					backgroundColor={active && "var(--color-primer)"}
					p={3}
					borderRadius={10}
					_hover={active?{}:{ backgroundColor: "var(--color-hover)"}}
					w={navSize == "large" && "80%"}
					alignContent={"center"}
					textAlign={"center"}
					alignItems={"center"}
					className="nav-item">
					<MenuButton w="100%">
						<Flex alignItems={"center"}>
							<Icon
								fontWeight={"bold"}
								fontSize={"var(--header-3)"}
								as={icon}
								color={active ? "var(--color-on-primary)" : "var(--color-grey)"}
							/>
							<Text
								ml={5}
								display={navSize == "small" ? "none" : "flex"}
								fontWeight={"semibold"}
								fontSize={"var(--header-3)"}
								color={active ? "var(--color-on-primary)" : "var(--color-grey)"}>
								{title}
							</Text>
						</Flex>
					</MenuButton>
				</Flex>
			</Menu>
		</Flex>
	);
}
