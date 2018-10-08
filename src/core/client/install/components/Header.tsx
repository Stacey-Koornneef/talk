import cn from "classnames";
import { Localized } from "fluent-react/compat";
import React, { StatelessComponent } from "react";
import { Flex, Typography } from "talk-ui/components";
import * as styles from "./Header.css";

interface HeaderProps {
  main?: boolean;
}

const Header: StatelessComponent<HeaderProps> = ({ main }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      className={styles.root}
    >
      <Typography
        className={cn(styles.headline, {
          [styles.headlineMain]: main,
        })}
      >
        The Coral Project
      </Typography>
      <Typography
        className={cn(styles.subHeadline, {
          [styles.subHeadlineMain]: main,
        })}
        variant="heading1"
      >
        <Localized id="install-title">Talk Installation Wizard</Localized>
      </Typography>
    </Flex>
  );
};

export default Header;
