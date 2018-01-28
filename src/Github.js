import React, { Component } from 'react';

const urlForUsername = username =>
    `https://api.github.com/users/${username}`

class GitHub extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        fetch(urlForUsername(this.props.username))
            .then(d => d.json())
            .then(d => {
                this.setState({
                    githubData: d
                })
            })
    }

    render(){

        if(!this.state.githubData) return <p>Loading...</p>
        return (
            <div>
                <h2>{this.state.githubData.name}</h2>
            </div>
        )
    }
}

export default GitHub;