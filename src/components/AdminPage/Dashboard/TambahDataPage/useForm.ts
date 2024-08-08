// useForm.ts
import { useState } from "react";
import { InputField } from "./types";

interface UseFormReturn {
  inputValues: { [key: string]: string };
  handleChange: (label: string, value: string) => void;
  handleReset: () => void;
}

const useForm = (inputFields: InputField[] = []): UseFormReturn => {
  const initialInputValues = Object.fromEntries(
    inputFields.map((field) => [
      field.label,
      field.label === "Date" ? new Date().toLocaleDateString() : "",
    ]),
  );

  const [inputValues, setInputValues] = useState<{ [key: string]: string }>(
    initialInputValues,
  );

  const handleChange = (label: string, value: string) => {
    setInputValues({ ...inputValues, [label]: value });
  };

  const handleReset = () => {
    setInputValues(
      Object.fromEntries(
        inputFields.map((field) => [
          field.label,
          field.label === "Date" ? new Date().toLocaleDateString() : "",
        ]),
      ),
    );
    const selectElements = document.querySelectorAll("select");
    selectElements.forEach((select) => {
      select.value = "";
    });
    // Call additional reset logic here if needed (e.g., clear file input)
  };

  return {
    inputValues,
    handleChange,
    handleReset,
  };
};

export default useForm;
