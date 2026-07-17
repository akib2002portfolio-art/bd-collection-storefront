import { Link } from "@tanstack/react-router";

import {
  infoNavigation,
  shopNavigation,
} from "../../../data/navigation";

import { MegaMenu } from "./MegaMenu";

export function Navigation() {
  return (
    <nav
      className="hidden items-center gap-8 lg:flex"
      aria-label="Main Navigation"
    >
      <div className="group relative">
        <Link
          to="/shop"
          className="text-sm font-medium transition-colors duration-300 hover:text-primary"
        >
          Shop
        </Link>

        <MegaMenu items={shopNavigation} />
      </div>

      {infoNavigation.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="text-sm font-medium transition-colors duration-300 hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}