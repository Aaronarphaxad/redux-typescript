import React, { useEffect, useRef, useState } from "react";
import { useActions } from "../hooks/useActions";
import { RootState } from "../redux";
import { useTypedSelector } from "../hooks/useTypedSelector";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState<string>("");
  const { searchRepositories } = useActions();
  const { data, error, loading } = useTypedSelector(
    (state: RootState) => state.repositories
  );
  const focusRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!focusRef.current) return;
    focusRef.current.focus();
  }, []);

  useEffect(() => {
    searchRepositories(term);
  }, [term]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    if (!term) return;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!term) return;
    searchRepositories(term);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={focusRef} value={term} onChange={handleChange} /> <br />
        <button style={{ marginTop: "10px" }}>Search</button>
      </form>

      <h3>Results</h3>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {data && data.length > 0 && (
        <>
          {data.map((res, index) => {
            return <p key={res}>{res}</p>;
          })}
        </>
      )}
      {/* {data.length === 0 && <p>Sorry, no packages found</p>} */}
    </div>
  );
};

export default RepositoriesList;
