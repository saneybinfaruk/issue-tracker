"use client";
import classNames from "classnames";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { RiBugFill } from "react-icons/ri";

const NavBar = () => {
  return (
    <nav className="bg-red-50">
      <div className="container mx-auto p-6 h-20 flex gap-5 items-center justify-between">
        <div className="flex gap-5 items-center">
          <Link href={"/"}>
            <RiBugFill size={25} />
          </Link>
          <NavLinks />
        </div>
        <AuthStatus />
      </div>
    </nav>
  );
};

export default NavBar;

const NavLinks = () => {
  const pathname = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <div className="flex gap-5">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={classNames({
            "nav-link": true,
            "!text-slate-900": pathname === link.href,
          })}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading")
    return <div className="skeleton h-6 w-16 shrink-0 rounded-sm" />;
  if (status === "unauthenticated")
    return (
      <Link href={"/api/auth/signin"} className="nav-link">
        Login
      </Link>
    );
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu session={session!} />
    </div>
  );
};
const DropdownMenu = ({ session }: { session: Session }) => {
  return (
    <section className="dropdown dropdown-bottom dropdown-end">
      <div className="avatar h-10 w-10" tabIndex={0} role="button">
        <div className="w-10 h-10 rounded-full">
          <Image
            src={session.user?.image ? session.user?.image : "/account.svg"}
            alt="User avatar"
            width={20}
            height={20}
          />
        </div>
      </div>

      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box z-[1] w-auto p-2 shadow"
      >
        <li>
          <p className="menu-title text-gray-600">{session.user?.email}</p>
        </li>
        <li>
          <Link href={"api/auth/signout"}>Sign Out</Link>
        </li>
      </ul>
    </section>
  );
};
