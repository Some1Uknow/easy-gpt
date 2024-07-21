import Link from "next/link";

interface NavItem {
  title: string;
  sublinks?: string[];
}

interface NavbarProps {
  navItems: NavItem[];
}

export default function Navbar({ navItems }: NavbarProps) {
  return (
    <div className="navbar">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          daisyUI
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.sublinks ? (
                <details>
                  <summary>{item.title}</summary>
                  <ul className="p-1 bg-base-100 border border-white w-max">
                    {item.sublinks.map((sublink, subIndex) => (
                      <li key={subIndex} className="py-1">
                        <Link href={`/${sublink.toLowerCase().replace(/\s+/g, '-')}`} className="block px-4 py-2 hover:bg-gray-200">
                          {sublink}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link href={`/${item.title.toLowerCase().replace(/\s+/g, '-')}`} className="block px-4 py-2 hover:bg-gray-200">
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
