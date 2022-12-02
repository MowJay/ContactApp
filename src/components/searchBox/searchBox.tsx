import { memo } from "react";
import { MdSearch } from "react-icons/md";

export type SearchBoxProps = {
  query: string;
  handleQueryChange: (query: string) => void;
};

const SearchBox = ({ query, handleQueryChange }: SearchBoxProps) => {
  const onChange = (event: { target: { value: string } }) => {
    handleQueryChange(event?.target?.value);
  };

  return (
    <div className="search-box">
      <MdSearch color="#52525B" size={22} />
      <input
        type="text"
        className="search-input"
        placeholder="Search contact"
        onChange={onChange}
        value={query}
      />
    </div>
  );
};

export default memo(SearchBox);
