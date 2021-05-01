import React, { useEffect, useState } from "react";
import { inject } from "mobx-react";
import { autorun } from "mobx";
import { Listitem } from "./components/listitem";
import { observer } from "mobx-react-lite";
import { Search } from "./components/search";

export const States = inject("statesStore")(
  observer((props) => {
    const { states, isLoadingStates } = props.statesStore;
    const [responseTime, setResponseTime] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, toggleSort] = useState(0);

    useEffect(() =>
      autorun(() => {
        props.statesStore.loadStates();
      })
    );

    useEffect(() => {
      const interval = setInterval(() => {
        setResponseTime(responseTime + 1);
      }, 1000);

      if (states && states.length) clearInterval(interval);
      return () => {
        clearInterval(interval);
      };
    });

    const searchFilter = (item) => {
        return item.toLowerCase().includes(searchTerm.toLocaleLowerCase());
    };

    const sortFilter = (a, b) => {
        return sort ? b.localeCompare(a) : a.localeCompare(b)
    };

    return (
      <div className="main">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <table className="table">
          <thead>
            <tr className="header">
              <th>#</th>
              <th>US States</th>
              <th className="sorting" onClick={() => toggleSort(!sort)}>
                {sort ? "A - Z" : "Z - A"}
              </th>
            </tr>
          </thead>
          <tbody>
            {states &&
              !isLoadingStates &&
              states
                .filter(searchFilter)
                .sort(sortFilter)
                .map((state, index) => (
                  <Listitem key={state} index={index} states={state} />
                ))}
          </tbody>
        </table>
      </div>
    );
  })
);
 