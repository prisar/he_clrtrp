import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiURL = `http://starlord.hackerearth.com/kickstarter`

class KickStarter extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        if(this.state.projectsData){
            const listItems = this.state.projectsData.map((proj) => {
                return(
                    <div key={proj.title.toString()} className="card">
                        <div className="card-body">
                            <p>Blurb: {proj.blurb}</p>
                            <p>By: {proj.by}</p>
                            <p>Country: {proj.country}</p>
                            <p>Currency: {proj.currency}</p>
                            <p>Location: {proj.location}</p>
                            <p>State: {proj.state}</p>
                            <p>Title: {proj.title}</p>
                            <p>Url: {proj.url}</p>
                        </div>
                    </div>
                )
            });
            return(
                <div>{listItems}</div>
            )
        }
    }

    render() {

        if (this.state.requestFailed) return <p>Failed!</p>
        if (!this.state.projectsData) return <p>Loading...</p>
        return (
            <div className="cleartrip">
            <h2>Projects</h2>
            <div className="projLst">
                {this.getProjectsList()}
            </div>
            </div>
        )
    }
}

export default KickStarter;