import React, { Component } from 'react';

// import TripMap from '../../views/TripMap/TripMap';
import { connect } from 'react-redux';

import { loadPostList } from '../../actions/postList';
import PostSection from '../../components/PostSection/PostSection';
import PostList from '../../views/PostList/PostList';
import "./Home.css";

const placeholders = [{}, {}, {}];

class Home extends Component {

  // render() {
  //   return (
  //     <div>
  //       <h1>
  //         Addressless
  //       </h1>
  //       <TripMap />
  //     </div>
  //   );
  // }

  componentWillMount() {
    this.props.loadPosts()
  }

  render() {
    let posts = placeholders;
    if (!this.props.isLoading) {
      if (this.props.posts.length > 0) {
        posts = this.props.posts;
      } else {
        posts = [];
      }
    }
    return (
      <div>
        <div className='post-title-holder post-title-holder--home' style={{backgroundImage: 'url("/assets/images/home.jpg")'}}>
          <div className='post-top-wrapper'>
            <div className='post-title-and-date'>
              <PostSection sectiontype='heading' sectiondata={{ text: 'Upside Down & Addressless', level: 1}} />
            </div>
          </div>
        </div>
        <div className='container'>
          <p className='text-lead'>
            Hi there! We're Adrian and Dina. Two people who decided that the best way to get
            from London to Amsterdam was via New Zealand. On this site we're documenting more
            examples of our excellent sense of direction as we exchange the Underground for
            a campervan, deadlines for path signs and bills for Bilbo.
          </p>
        </div>
        <div className='container container--padded'>
          <PostSection sectiontype='heading' sectiondata={{ fullWidth: true,text: 'Our latest posts', level: 2}} />
          <PostList posts={posts} limit={3} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    posts: state.postList,
    isLoading: state.postListIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPosts: () => dispatch(loadPostList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
