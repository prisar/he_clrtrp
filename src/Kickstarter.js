import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import logo from './logo.png';


const apiURL = `http://starlord.hackerearth.com/kickstarter`

class KickStarter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: '',
            requestFailed: false
        }
    }

    componentDidMount() {
        fetch(apiURL)
            .then(response => {
                if (!response.ok) {
                    throw Error("Network request failed")
                }

                return response
            })
            .then(d => d.json())
            .then(d => {
                this.setState({
                    projectsData: d
                })
            }, () => {
                this.setState({
                    requestFailed: true
                })
            })
    }

    getProjectsList() {
        if (this.state.projectsData) {
            const listItems = this.state.projectsData.map((proj) => {
                return (
                    <div key={proj.title.toString()} className="card">
                        <div className="card-header">
                            <p>Sr No: {proj['s.no']}</p>
                        </div>
                        <div className="card-body">
                            <p>Blurb: {proj['blurb']}</p>
                            <p>Date: {Date.parse(proj['end.time'])}</p>
                            <p>Date: {proj['end.time'].slice(0,10)}</p>
                            <p>By: {proj.by}</p>
                            <p>Country: {proj.country}</p>
                            <p>Currency: {proj.currency}</p>
                            <p>Location: {proj.location}</p>
                            <p>State: {proj.state}</p>
                            <p>Title: {proj.title}</p>
                        </div>
                        <div className="card-footer">
                            <p>Url: {proj.url}</p>
                        </div>
                    </div>
                )
            });
            return (
                <div>{listItems}</div>
            )
        }
    }

    handelChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.label}`);
    }

    render() {

        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;

        if (this.state.requestFailed) return <p>Failed!</p>
        if (!this.state.projectsData) return <p>Loading...</p>
        return (
            <div className="cleartrip">
                <img src={logo} alt="logo" className="App-logo" />
                <h2>Projects</h2>
                <Select
                    name="form-field-name"
                    value={value}
                    onChange={this.handleChange}
                    options={[
                        { value: 'one', label: 'One' },
                        { value: 'two', label: 'Two' },
                    ]}
                />
                <div className="projLst">
                    {this.getProjectsList()}
                </div>
            </div>
        )
    }
}

export default KickStarter;