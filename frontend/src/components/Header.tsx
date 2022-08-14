import Connect from "./Connect";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const NavItems = [
  { title: "Dashboard", href: "/" },
  { title: "Wrap / Unwrap", href: "/wrap" },
  { title: "Stream", href: "/stream" },
];

export default function Header({ account }: any) {
  const router = useRouter();

  const makeHandleClick = (item: any) => (e: any) => {
    e.preventDefault();
    router.push(item.href);
  };

  return (
    <Wrapper>
      <NavContainer>
        <LogoContainer>
          <Link href="/">
            <Logo>
              <strong>StarkStream</strong>
            </Logo>
          </Link>
        </LogoContainer>
        <NavItemsContainer>
          {NavItems.map((item: any) => (
            <NavItem
              key={item.href}
              href={item.href}
              onClick={makeHandleClick(item)}
            >
              {item.title.toUpperCase()}
            </NavItem>
          ))}
        </NavItemsContainer>
      </NavContainer>
      <Connect account={account} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-family: "Noto Sans";
  width: calc(100%);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #676666;
  color: #fff;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.6rem;
  flex: 1;
`;

const LogoContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.a`
  font-size: 1.2rem;
`;

const NavItemsContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const NavItem = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 1.3rem;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
