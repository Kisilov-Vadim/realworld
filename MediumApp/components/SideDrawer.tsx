import { useEffect, useState } from 'react';
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { Button, ButtonText } from "@/components/ui/button"
import {
    Drawer,
    DrawerBackdrop,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
  } from "@/components/ui/drawer"

export default function SideDrawer({ showDrawer, setShowDrawer, tags, loggedIn }) {
    return (
        <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
        size="md"
        anchor="left"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <Heading size="3xl">Tags</Heading>
          </DrawerHeader>
          <DrawerBody>
            <Text size="2xl" className="text-typography-800">
              {tags}
            </Text>
          </DrawerBody>
          <DrawerFooter>
            {loggedIn ? (
                <Button onPress={() => setShowDrawer(false)}>
                    <ButtonText>Log Out</ButtonText>
                </Button>
                ) : (
                <Button onPress={() => setShowDrawer(false)}>
                    <ButtonText>Log In/Sign Up</ButtonText>
                </Button>
                )}    
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
}
