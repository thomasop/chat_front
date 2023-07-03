import React, { useState } from "react";
import HandleClickBtn from "../handler/HandleClickBtn";
import { RootState } from "../../../../utils/store";
import { useSelector } from "react-redux";
import GetUsers from "../fetch/GetUsers";
import { User } from "../../../../types/data/DataType";

/**
 * React component - Display search bar
 * @return {JSX.Element}
 */
const Search = (): JSX.Element => {
  const { user } = useSelector((state: RootState) => state.user);
  const { userId } = useSelector((state: RootState) => state.login);
  const [displayDiv, setDisplayDiv] = useState<string>("none");
  const [inputValue, setInputValue] = useState<string>("");
  const [displayErrorDiv, setDisplayErrorDiv] = useState<string>("none");
  const [errorStr, setErrorStr] = useState<string>("");
  const [searchDatas, setSearchDatas] = useState<null | User[] | undefined>(
    null
  );
  const divStyle = {
    display: displayDiv,
  };
  const divErrorStyle = {
    display: displayErrorDiv,
  };
  const handleChange = (e: any) => {
    setInputValue(e.target.value);
    let search = user?.filter((p) => {
      return e.target.value !== ""
        ? p.firstname.includes(e.target.value) ||
            p.lastname.includes(e.target.value)
        : null;
    });
    search?.map((r: User, index: number) => {
      if (r.id === Number(userId)) {
        search?.splice(index, 1);
      }
      return null;
    });
    if (search?.length! > 0) {
      setDisplayDiv("flex");
      setDisplayErrorDiv("none");
      setErrorStr("");
    } else if (e.target.value === "") {
      setDisplayDiv("none");
      setDisplayErrorDiv("none");
      setErrorStr("");
    } else {
      setDisplayDiv("none");
      setDisplayErrorDiv("block");
      setErrorStr("Aucun utilisateur à été trouvé");
    }
    setSearchDatas(search);
  };
  return (
    <>
      <GetUsers />
      <div className="search">
        <input
          className="search__input"
          type="text"
          name="search"
          id="search"
          value={inputValue}
          placeholder="Rechercher un utilisateur"
          onChange={handleChange}
        />
        <div className="search__div" style={divStyle}>
          {searchDatas?.length! > 0 &&
            searchDatas?.map((searchData, index) => {
              return (
                <React.Fragment key={index}>
                  <HandleClickBtn
                    searchData={searchData}
                    setDisplayDiv={setDisplayDiv}
                    setInputValue={setInputValue}
                  />
                </React.Fragment>
              );
            })}
        </div>
        <div className="search__div search__div--error" style={divErrorStyle}>
          {errorStr}
        </div>
      </div>
    </>
  );
};

export default Search;
