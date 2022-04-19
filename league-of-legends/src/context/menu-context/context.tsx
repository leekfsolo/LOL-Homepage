import React, { createContext, FC, ReactNode } from "react";
import { menuItems } from "../../common/ui/layout/main-layout/model";

interface Props {
  children: ReactNode;
}

const MenuContext = createContext({
  items: Array<menuItems>([]),
});

export const MenuContextProvider: FC<Props> = (props: Props) => {
  const menuItems = [
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
  ];

  return (
    <MenuContext.Provider value={{ items: menuItems }}>
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
