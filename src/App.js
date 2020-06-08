import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Select from 'react-select';
import FieldList from './Fields/FieldList'

const fieldNames = [
                     { idx: 0, name: 'class of worker' },
                     { idx: 1, name: 'industry code' },
                     { idx: 2, name: 'occupation code' },
                     { idx: 3, name: 'education' },
                     { idx: 4, name: 'wage per hour' },
                     { idx: 5, name: 'last education' },
                     { idx: 6, name: 'marital status' },
                     { idx: 7, name: 'major industry code' },
                     { idx: 8, name: 'major occupation code' },
                     { idx: 9, name: 'mace' },
                     { idx: 10, name: 'hispanice' },
                     { idx: 11, name: 'sex' },
                     { idx: 12, name: 'member of labor' },
                     { idx: 13, name: 'reason for unemployment' },
                     { idx: 14, name: 'fulltime' },
                     { idx: 15, name: 'capital gain' },
                     { idx: 16, name: 'capital loss' },
                     { idx: 17, name: 'dividends' },
                     { idx: 18, name: 'income tax liability' },
                     { idx: 19, name: 'previous residence region' },
                     { idx: 20, name: 'previous residence state' },
                     { idx: 21, name: 'household-with-family' },
                     { idx: 22, name: 'household-simple' },
                     { idx: 23, name: 'weight' },
                     { idx: 24, name: 'msa-change' },
                     { idx: 25, name: 'reg-change' },
                     { idx: 26, name: 'within-reg-change' },
                     { idx: 27, name: 'lived-here' },
                     { idx: 28, name: 'migration prev res in sunbelt' },
                     { idx: 29, name: 'num persons worked for employer' },
                     { idx: 30, name: 'family members under 118' },
                     { idx: 31, name: 'father birth country' },
                     { idx: 32, name: 'mother birth country' },
                     { idx: 33, name: 'birth country' },
                     { idx: 34, name: 'citizenship' },
                     { idx: 35, name: 'own business or self employed' },
                     { idx: 36, name: 'fill questionnaire for veteran\'s admin' },
                     { idx: 37, name: 'veterans benefits' },
                     { idx: 38, name: 'weeks worked in year' },
                     { idx: 38, name: 'year' },
                     { idx: 40, name: 'salary range' },
                  ];

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedOption: null,
      items: [],
      field: '',
      cancelSource: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.getCensus = this.getCensus.bind(this)
  }

  handleChange(selectedOption){
    this.setState({ selectedOption: selectedOption });
    this.getCensus(selectedOption.label)
  }

  getCensus(id) {
    console.log(id);
    if (this.state.cancelSource !== null) { this.state.cancelSource.cancel(); }
      var CancelToken = axios.CancelToken;
      var source = CancelToken.source();
      this.setState( { cancelSource: source } )
    const options = {
      url: 'https://fitleflasktest.herokuapp.com/census/' + id,
      method: 'get',
      headers: {
      'Content-Type': 'application/json',
    },
    cancelToken: source.token
    };
    return axios(options)
    .then((res) => {
      if (res.data.status === 'success'){
        this.setState({ items: res.data.data });
        console.log(this.state.items);
      } else {
        console.log("data not load")
      }
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        this.setState({field: id})
        console.log('Request canceled');
      }else{
        console.log(err);
      }
    })
  }


  render(){
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const valueLabel = selectedOption  ? selectedOption.label : "value";
    return (
      <div className="App">
        <header className="App-header">

          <h1>Demographic Data Visualizer</h1>

          <div>
            <form className="form">
              <div className="container-fluid" style={{color:'black'}}>
                <Select value={value} onChange={this.handleChange}
                              options={
                                fieldNames.map( x => { return { value: x.idx, label: x.name } })
                              }/>
              </div>
            </form>
            <FieldList key={this.state.field} field={valueLabel} census={this.state.items} />
          </div>

        </header>
      </div>
    );
  }
}

export default App;
