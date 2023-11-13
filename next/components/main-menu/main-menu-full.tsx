import Link from "next/link";
export function MainMenuFull({ menu }) {
  return (
    <div>
      <nav
        aria-label="primary"
        className="relative z-20 flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row"
      >
        {menu.map((item) => (
          <div className="relative group">
            <button className="flex flex-row items-center w-full px-4 py-4 mt-2 text-base text-left bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 focus:outline-none font-montserrat hover:underline">
              <Link href={item.url}>
                <span>{item.title}</span>
              </Link>
            </button>
            {item.items && item.items.length > 0 && (
              <div className="absolute z-10 hidden bg-primary-500 group-hover:block">
                <div className="px-4 pt-2 pb-4 bg-white shadow-lg w-40">
                  <div className="grid grid-cols-1 gap-4">
                    {item.items.map((subitem) => (
                      <Link href={subitem.url}>
                        <li className="hover:underline">{subitem.title}</li>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
