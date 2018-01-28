import React, { Component } from 'react';

const urlForUsername = username =>
    `https://api.github.com/users/${username}`

class GitHub extends Component {

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
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
}

export default GitHub;