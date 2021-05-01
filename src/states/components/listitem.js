import React from 'react';

export const Listitem = ({states, index }) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{states}</td>
        <td></td>
      </tr>
    ); 
}