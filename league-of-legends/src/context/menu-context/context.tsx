import React, { createContext, FC } from "react";
import { menuItems } from "../../common/ui/layout/main-layout/model";

interface MenuContextInterface {
  items: Array<menuItems>;
}

const MenuContext = createContext<MenuContextInterface>({ items: [] });

export const MenuContextProvider: FC<{}> = (props) => {
  const menuItemsContext: MenuContextInterface = {
    items: [
      { title: "shortcut.champions", url: "/champions" },
      { title: "shortcut.regions" },
      {
        title: "shortcut.altUniverse",
        items: ["universe.starGuardian", "universe.odyssey", "universe.k/da"],
      },
      { title: "shortcut.comics" },
      { title: "shortcut.map" },
      { title: "shortcut.explore" },
      { title: "shortcut.search" },
    ],
  };

  return (
    <MenuContext.Provider value={menuItemsContext}>
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
