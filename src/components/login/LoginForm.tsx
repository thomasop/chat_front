import React, { useState } from "react";
import HandleSubmit from "./HandleSubmit";

/**
 * React component - Login form
 * @return {JSX.Element}
 */
const LoginForm = (): JSX.Element => {
  const [formSend, setFormSend] = useState(false);
  const [inputText, setInputText] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputErrorPassword, setInputErrorPassword] = useState<string>("");
  const [validTextInput, setValidTextInput] = useState<boolean>(false);
  const [validPasswordInput, setValidPasswordInput] = useState<boolean>(false);

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mailregex = /^([\w.-]+)@([\w-]+)((\.(\w){2,})+)$/;
    if (mailregex.test(e.target.value)) {
      setInputText(e.target.value);
      if (e.target.nextSibling) {
        handleMessage(e, "none", "");
        setValidTextInput(true);
      }
    } else if (e.target.value.length === 0) {
      if (e.target.nextSibling) {
        handleMessage(e, "none", "");
        setValidTextInput(true);
      }
    } else {
      if (e.target.nextSibling) {
        handleMessage(e, "block", "Mail need to be not null");
        setValidTextInput(false);
      }
    }
  };

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      setInputPassword(e.target.value);
      if (e.target.nextSibling) {
        handleMessage(e, "none", "");
        setValidPasswordInput(true);
      }
    } else if (e.target.value.length === 0) {
      if (e.target.nextSibling) {
        handleMessage(e, "none", "");
        setValidPasswordInput(true);
      }
    } else {
      if (e.target.nextSibling) {
        handleMessage(e, "block", "Min length of password need to be 4");
        setValidPasswordInput(false);
      }
    }
  };

  const handleMessage = (
    e: React.ChangeEvent<HTMLInputElement>,
    display: string,
    content: string
  ) => {
    let nextHtmlElement = e.target.nextSibling as HTMLElement;
    nextHtmlElement.style.display = display;
    nextHtmlElement.textContent = content;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validTextInput === true && validPasswordInput === true)
      setFormSend(true);
  };
  return (
    <>
      {formSend === true && (
        <HandleSubmit
          inputText={inputText}
          inputPassword={inputPassword}
          setInputErrorPassword={setInputErrorPassword}
          setFormSend={setFormSend}
        />
      )}
      <form
        className="loginForm"
        action="https://devops-workshop-api-ted65ogcgq-ew.a.run.app/user/login"
        method="post"
        onSubmit={handleSubmit}
      >
        <input
          name="email"
          className="loginForm__inputText"
          type="email"
          required
          placeholder="Votre email"
          onChange={handleInputText}
        />
        <div className="loginForm__errorMessage email"></div>
        <input
          name="password"
          className="loginForm__inputPassword"
          type="password"
          required
          placeholder="Votre mot de passe"
          onChange={handleInputPassword}
        />
        <div className="loginForm__errorMessage password"></div>
        <input
          className="loginForm__inputSubmit"
          type="submit"
          value="Se connecter"
        />
        <div className="loginForm__errorMessages">{inputErrorPassword}</div>
      </form>
    </>
  );
};

export default LoginForm;
