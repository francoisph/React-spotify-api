import React, { Component  } from 'react';
import axios from 'axios';
import { Cover } from '../Cover';
import { searchURL, artistURL } from '../spotifyURL';

export default class ArtistSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: [],
            query: '',
            artists: [],
            albums: [],
            error: ''
        }
    }

    componentDidMount = () => {
        const { current_user } = this.props.location.state;
        if(current_user){
            this.setState({ current_user })
        }else{
            this.props.history.push('/')
        }
    }

    captureSearch = (searchTerm) => {
        this.setState({ query: searchTerm })
    }

    searchArtists = (event) => {
        event.preventDefault();
        const { authToken } = this.props.location.state.auth;
        let artists;
        axios.get(`${searchURL}${this.state.query}&type=artist&access_token=${authToken}`)
        .then(response => {
            artists = response.data.artists;
            this.setState({artists, error: ''});
        })
        .catch(error => {
            console.log(error)
            this.setState({ error: 'error'})
        })

    }

    showArtistResults = (artists) => {
      console.log('artist ', artists)
        if(artists!=undefined){
            let results = [];
            artists.map((artist, index) => {
                if(artist.images[0]!=undefined){
                    let hasImage = artist.images[0];
                    results.push(
                        <div className="col" key={index} >
                            <Cover
                                name={artist.name}
                                id={artist.id}
                                followers={artist.followers.total}
                                popularity={artist.popularity}
                                key={index}
                                imageURL={hasImage.url}
                                onClick={(event) => this.searchAlbums(event,artist.id, artist.name)}
                                text="Show Albums"
                            />
                        </div>
                    )
                }
            })
            return results
        }else{
            return <p></p>
        }
    }

    searchAlbums = (event, artistId, name) => {
        event.preventDefault();

        const { authToken } = this.props.location.state.auth;
        let albums;
        let cleanName = name.replace(/[ ]/g,"-").replace(/[()]/g,"").trim();

        axios.get(`${artistURL}${artistId}/albums?album_type=album&access_token=${authToken}`)
        .then(response => {
            this.setState({ albums: response.data.items });
            albums = response.data.items;
        })
        .then(()=> this.props.history.push(
            `/artistAlbum/${artistId}/${cleanName}`,
            {
                data: { albums },
                name: { name },
                current_user: { user: this.state.current_user.user },
                auth: { authToken }
            }
        ))
        .catch(error => console.log(error));
    }

    render() {
        const { images, display_name } = this.props.location.state.current_user.user;
        return <div>
            <div className="row mt-5">
              <div className="col-lg">
                <p className="lead text-center">Search Artists</p>
              </div>
            </div>
            <div className="row mt-5 justify-content-center">
              <div className="col-lg-6">
                <form onSubmit={this.searchArtists} className="text-center">
                  <div className="form-group">
                    <input
                        type="text"
                        className="form-control text-center"
                        placeholder="Artist Search"
                        onChange={
                            event => {
                                this.captureSearch(event.target.value)
                                this.setState({ error: ''})
                            }
                        }
                        value={this.state.query}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
                {this.showArtistResults(this.state.artists.items)}
            </div>
          </div>;
    }
}
