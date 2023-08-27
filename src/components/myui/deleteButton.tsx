import { Trash2 } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function DeleteButton({ ...props }: Props) {
  return (
    <>
      <button
        className={
          "rounded-full p-3 bg-gray-200 dark:bg-gray-800 hover:bg-red-400"
        }
        {...props}
      >
        <Trash2 />
      </button>
    </>
  );
}
