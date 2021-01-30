import React, { Component } from 'react';
import Link from "../components/Link/Link";
import List from "../components/List/List";
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true,
    }
  }

  async componentDidMount() {
    const profile = await fetch('https://api.github.com/users/rafalmp').then(response => response.json())
    if (profile) {
      this.setState({
        data: profile,
        loading: false,
      });
    }
  }

  render() {
    const { data, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>
    }

    const items = [
      { label: 'HTML URL', value: <Link url={data.html_url} title={'Github URL'} /> },
      { label: 'Repos url', value: data.repos_url },
      { label: 'Name', value: data.name},
      { label: 'Company', value: data.company },
      { label: 'Location', value: data.location },
      { label: 'Email', value: data.email },
      { label: 'Bio', value: data.bio },
    ]

    return (
      <div className={'Profile-container'}>
        <img className={'Profile-avatar'} src={data.avatar_url} alt={'avatar'} />
        <List items={items} />
      </div>
    );
  }
}

export default Profile;
