import { Menu } from "@/lib/zod/menu";
import Chevron from "@/styles/icons/chevron-down.svg";
import Link from "next/link";
import { useState } from "react";
import Button from "../dark-mode-button";

interface MainMenuFullProps {
  menu: Menu;
}

// Main menu with dropdowns for larger screens
export function MainMenuFull({ menu }: MainMenuFullProps) {
  // State to track the visibility of submenus
  const [visibleSubmenu, setVisibleSubmenu] = useState<string | null>(null);
  const [activeSubitemId, setActiveSubitemId] = useState<string | null>(null);

  const handleMouseEnter = (itemId: string) => {
    setVisibleSubmenu(itemId);
  };

  const handleMouseLeave = () => {
    setVisibleSubmenu(null);
  };

  return (
    <div>
      <nav
        aria-label="primary"
        className="relative z-20 flex-col px-6 flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row"
      >
        <ul className="flex flex-col md:flex-row">
          {menu.map((item) => (
            <li
              className="relative group"
              key={item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              aria-haspopup={
                item.items && item.items.length > 0 ? "true" : "false"
              }
              aria-expanded={
                item.items &&
                item.items.length > 0 &&
                visibleSubmenu === item.id
                  ? "true"
                  : "false"
              }
            >
              <Link
                href={item.url}
                onClick={() => {
                  setVisibleSubmenu(item.id);
                  setActiveSubitemId(null);
                }}
              >
                <div className="flex flex-row items-center w-full mt-2 text-base text-left bg-transparent rounded-lg md:w-auto md:block md:mt-0 md:ml-4 focus:outline-none hover:underline">
                  <span>
                    {item.title}{" "}
                    {item.items && item.items.length > 0 && (
                      <Chevron
                        className={`inline-block ${
                          visibleSubmenu === item.id
                            ? "h-6 w-6 -rotate-180 ease-in-out transition-all duration-200"
                            : "h-6 w-6 ease-in-out transition-all duration-200"
                        }`}
                      />
                    )}
                  </span>
                </div>
              </Link>
              {item.items && item.items.length > 0 && (
                <div
                  className={`absolute z-10 ${
                    visibleSubmenu === item.id ? "block" : "hidden"
                  } bg-primary-500`}
                >
                  <div className="px-4 pt-2 pb-4 bg-primary-600 text-white shadow-lg w-50">
                    <ul className="grid grid-cols-1 gap-4">
                      {item.items.map((subitem) => (
                        <li key={subitem.id}>
                          <Link
                            href={subitem.url}
                            className={`hover:underline block pb-1 ${
                              activeSubitemId === subitem.id ? "underline" : ""
                            }`}
                            onClick={() => {
                              setVisibleSubmenu(null);
                              setActiveSubitemId(subitem.id);
                            }}
                          >
                            {subitem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
      <Button />
        </ul>
      </nav>
    </div>
  );
}
