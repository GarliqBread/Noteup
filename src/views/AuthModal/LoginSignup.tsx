import { authQueries } from "@/api/authQueries";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { H2 } from "@/styles/typography";

import { Form } from "./style";

export const LoginSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isLoading: isLogingIn } = useMutation(authQueries.login);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    login({
      username,
      password,
    });
  };

  const isSubmitDisabled = username === "" || password === "" || isLogingIn;

  return (
    <Form onSubmit={handleSubmit}>
      <H2>Login</H2>
      <Input value={username} onChange={setUsername} placeholder="Username" label="Username" />
      <Input
        value={password}
        onChange={setPassword}
        type="password"
        placeholder="**********"
        label="Password"
      />
      <Button type="submit" variant="primary" disabled={isSubmitDisabled}>
        Submit
      </Button>
    </Form>
  );
};
