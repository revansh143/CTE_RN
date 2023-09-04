import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeViewController from "./HomeViewController";
import InventoryMarketPlaces from "./InventoryMarketPlaces";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeViewController} />
      <Drawer.Screen name="Contact" component={InventoryMarketPlaces} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
