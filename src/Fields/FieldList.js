import React, { Component } from 'react';
import FieldItem from './FieldItem';

const FieldList = (props) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th> {props.field} </th>
        <th> Count </th>
        <th> Average Age </th>
      </tr>
    </thead>
    <tbody>
      {
        props.census.map((item) => {
          return (
            <FieldItem key={item.value} item={item} field={item}/>
          );
        })
      }
    </tbody>
  </table>
)

export default FieldList;
