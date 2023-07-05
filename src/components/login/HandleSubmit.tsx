import React, { Dispatch, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataHandlerSubmit } from "../../types/data/DataType";

interface Proptype {
  inputText: string;
  inputPassword: string;
  setInputErrorPassword: Dispatch<React.SetStateAction<string>>;
  setFormSend: Dispatch<React.SetStateAction<boolean>>;
}

/**
 * React component - Handler when login form is submit
 * @param {Proptype} Props
 * @param {string} Props.inputText - store input email from form and send in API
 * @param {string} Props.inputPassword - store input password from form and send in API
 * @param {Dispatch<React.SetStateAction<string>>} Props.setInputErrorPassword - if API return error then display error message in form
 * @param {Dispatch<React.SetStateAction<boolean>>} Props.setFormSend - if API return error then cancel submit form
 * @return {null}
 */
const HandleSubmit = ({
  inputText,
  inputPassword,
  setInputErrorPassword,
  setFormSend,
}: Proptype): null => {
  let navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("https://devops-workshop-api-ted65ogcgq-ew.a.run.app/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputText,
          password: inputPassword,
        }),
      });
      let json = await response.json();
      if (json.errors) {
        setFormSend(false);
        if (typeof json.errors == "object") {
          json.errors.map((error: DataHandlerSubmit, index: number) => {
            let input: HTMLElement = document.querySelector("." + error.path)!;
            if (input) {
              input.style.display = "block";
              input.textContent = error.msg;
            }
            return null;
          });
        } else {
          let htmlElementDiv = document.querySelector<HTMLElement>(
            ".loginForm__errorMessages"
          );
          let htmlElementInput = document.querySelector<HTMLElement>(
            ".loginForm__inputSubmit"
          );
          if (htmlElementDiv && htmlElementInput) {
            htmlElementInput.style.marginBottom = "0px";
            htmlElementDiv.style.marginBottom = "30px";
            htmlElementDiv.style.display = "block";
          }

          setInputErrorPassword(json.errors);
        }
      } else {
        navigate("/home");
      }
    };
    getUser();
  }, [inputPassword, inputText, navigate, setFormSend, setInputErrorPassword]);

  return null;
};

export default HandleSubmit;
