"use client";

import { Input } from "@nextui-org/input";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import React from "react";

export const PasswordInput = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      name="password"
      label="Password"
      variant="bordered"
      placeholder="Enter your password"
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
          aria-label="toggle password visibility"
        >
          {isVisible ? <IconEyeOff /> : <IconEye />}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs"
    />
  );
};
