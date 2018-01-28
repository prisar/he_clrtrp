import React, { Component } from 'react';

const apiURL = `http://starlord.hackerearth.com/kickstarter`

class KickStarter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
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
                    <li>{proj.title}</li>
                )
            });
            return(
                <ul>{listItems}</ul>
            )
        }
    }

    render() {

        if (this.state.requestFailed) return <p>Failed!</p>
        if (!this.state.projectsData) return <p>Loading...</p>
        return (
            <div>
                Project Titles:
                {this.getProjectsList()}
            </div>
        )
    }
}

export default KickStarter;