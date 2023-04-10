import { Component } from 'react';

import './styles.css';

import { PostA } from '../../components/Posts';
import { loadPosts } from '../../components/uteis/load-posts'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 10,
    searchValue: '',


  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage })

  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase()
          .includes(searchValue.toLowerCase());
      })
      : posts;

    return (
      <section className='container'>
        <div className='search-container'>

          {!!searchValue && (

            <h1>Search Value: {this.searchValue}</h1>

          )}

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>
        {filteredPosts.length > 0 && (
          <PostA posts={filteredPosts} />
        )
        }

        {filteredPosts.length === 0 && (
          <p>Nao existe post com esse nickname</p>
        )
        }
        <div className='button-container'>
          {!searchValue &&
            <Button
              text='Load More Posts'
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          }
        </div>
      </section>
    );
  }
}
/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

