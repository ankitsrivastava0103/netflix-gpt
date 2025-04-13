import { useSelector } from "react-redux";
import { LANG_CONST } from "../utils/constants";

const GptSearchBar = () => {
  const languageKey = useSelector((store) => store.config.language);

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2  grid grid-cols-12">
        <input
          className="p-4 m-4 bg-white col-span-9"
          type="text"
          placeholder={LANG_CONST[languageKey].placeholder}
        />
        <button className="m-4 py-2 px-4 bg-red-700 text-white rounded-lg col-span-3">
          {LANG_CONST[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
