import { Search } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function SearchButton({ ...props }: Props) {
  return (
    <>
      <button
        className={
          "rounded-full p-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-400"
        }
        {...props}
      >
        <Search />
      </button>
    </>
  );
}
