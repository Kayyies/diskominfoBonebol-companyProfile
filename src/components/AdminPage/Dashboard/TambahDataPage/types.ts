// types.ts
export interface InputField {
  type: "text" | "select" | "file" | "textArea";
  label: string;
  placeholder?: string;
  options?: string[];
}

export interface Props {
  inputFields: InputField[];
  showTextEditor?: boolean;
  apiEndpoint: string;
}
