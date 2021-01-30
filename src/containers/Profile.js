import React, { Component } from 'react';
import styled from "styled-components";
import Link from "../components/Link/Link";
import List from "../components/List/List";

const ProfileWrapper = styled.div`
  width: 50%;
  margin: 10px auto;
`;

const Avatar = styled.img`
  width: 150px;
`;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      repositories: [],
      loading: true,
      error: '',
    }
  }

  async componentDidMount() {
    try {
      const profile = await fetch('https://api.github.com/users/rafalmp').then(response => response.json())
      if (profile) {
        const repos = await fetch(profile.repos_url).then(response => response.json())
        this.setState({
          data: profile,
          repositories: repos,
          loading: false,
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
        error: e.message,
      });
    }
  }

  render() {
    const { data, repositories, loading, error } = this.state;

    if (loading || error) {
      return <div>{loading ? 'Loading...' : error}</div>
    }

    const items = [
      { label: 'HTML URL', value: <Link url={data.html_url} title={'Github URL'} /> },
      { label: 'Repos url', value: data.repos_url },
      { label: 'Name', value: data.name},
      { label: 'Company', value: data.company },
      { label: 'Location', value: data.location },
      { label: 'Email', value: data.email },
      { label: 'Bio', value: data.bio },
    ];

    const projects = repositories.map(repository => ({
      label: repository.name,
      value: <Link url={repository.html_url} title={'Github URL'} />
    }));

    return (
      <ProfileWrapper>
        <Avatar src={data.avatar_url} alt={'avatar'} />
        <List title={'Profile'} items={items} />
        <List title={'Projects'} items={projects} />
      </ProfileWrapper>
    );
  }
}

export default Profile;
