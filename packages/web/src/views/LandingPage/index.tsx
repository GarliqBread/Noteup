import { useEffect, useRef, useState } from "react";

import { GitHubBanner, Logo, Moon, Sun } from "@noteup/shared/components/Icons";
import { Switch } from "@noteup/shared/components/Switch";

import darkThemeApp from "@/assets/img/dark-mode-app.png";
import lightThemeApp from "@/assets/img/light-mode-app.png";

import { Flex } from "@noteup/shared/styles/layout";

import {
  AppButton,
  AppImage,
  Container,
  Header,
  ImageWrapper,
  InnerNavbar,
  LogoContainer,
  Navbar,
  Section,
  SubHeader,
} from "./style";

export const LandingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNavbarShadow, setShowNavbarShadow] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const handleWindowScroll = () => {
    setShowNavbarShadow(
      containerRef.current?.scrollTop ? containerRef.current.scrollTop > 60 : false,
    );
  };

  useEffect(() => {
    const element = containerRef.current;
    element?.addEventListener("scroll", handleWindowScroll);
    return () => element?.removeEventListener("scroll", handleWindowScroll);
  }, []);

  return (
    <Container ref={containerRef}>
      <Navbar shadow={showNavbarShadow}>
        <InnerNavbar>
          <Flex>
            <LogoContainer>
              <Logo width={30} height={34} />
              Note<mark>up</mark>
            </LogoContainer>
          </Flex>
        </InnerNavbar>
        <a href="https://github.com/elementsinteractive/Noteup" title="link to github page">
          <GitHubBanner className="banner" />
        </a>
      </Navbar>
      <Section>
        <Header>
          Markdown Note Taking <br /> Made Simple
        </Header>
        <SubHeader>
          Open-source GitHub-flavored markdown note-taking app made by and for developers.
        </SubHeader>

        <AppButton to="/app">Go to the App &nbsp; →</AppButton>
      </Section>
      <Section>
        <ImageWrapper>
          <Flex justifyContent="flex-end" alignItems="center" gap={8}>
            <Sun size={18} />
            <Switch checked={darkTheme} toggle={() => setDarkTheme(!darkTheme)} />
            <Moon size={18} />
          </Flex>
          <AppImage src={darkTheme ? darkThemeApp : lightThemeApp} alt="App preview" />
        </ImageWrapper>
      </Section>
    </Container>
  );
};
