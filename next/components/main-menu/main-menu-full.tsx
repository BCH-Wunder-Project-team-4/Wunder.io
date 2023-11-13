import NextLink from "next/link";
export function MainMenuFull ({menu}){
  return (
    <div>
      <nav aria-label="primary" className="relative z-20 flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row">
  
  {menu.map((item) =>
    <div className="relative group">
    <button className="flex flex-row items-center w-full px-4 py-4 mt-2 text-base font-bold text-left uppercase bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 focus:outline-none font-montserrat hover:underline">
    <NextLink href={item.url}><span>{item.title}</span></NextLink>
    </button>
    <div className="absolute z-10 hidden bg-primary-500 group-hover:block">
        
        <div className="px-4 pt-2 pb-4 bg-white shadow-lg w-40">
          <div className="grid grid-cols-1 gap-4">
            {item.items?.map((subitem) =>
            <NextLink href={subitem.url}><li className="hover:underline">{subitem.title}</li></NextLink>
            )}
          </div>
        </div>
    </div>
</div>  
  )} 
</nav>
    </div>
  )
}