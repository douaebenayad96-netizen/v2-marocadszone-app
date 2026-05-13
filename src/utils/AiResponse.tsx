import ReactMarkdown from "react-markdown";

export const AiResponse = ({ text }: { text: string }) => {
  return (
    <>
      <ReactMarkdown>{text}</ReactMarkdown>
    </>
  );
};
