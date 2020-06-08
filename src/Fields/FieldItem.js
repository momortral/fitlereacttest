import React from 'react';

const CensusItem = (props) => {
  console.log(props.field);
  return (
    <tr>
      <td> {props.field[0]} </td>
      <td> {props.field[2]} </td>
      <td> {Math.trunc(props.field[1])} </td>
    </tr>
  )
}
export default CensusItem;
