import React from "react";
import { Button, Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/react";

/* Function to render the users in group list component */
export function UsersMenu({ users }) {
  return (
    <Menu>
      <MenuButton as={Button} color='gray.500' fontSize='sm' mr='10px'>
        Users
      </MenuButton>
      <MenuList>
        {[...users].map((user) => {
          return (
            <MenuItem key={user._id} fontSize='sm'>
              <span>{`${user.firstName}  ${user.lastName} (${user.username})`}</span>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
