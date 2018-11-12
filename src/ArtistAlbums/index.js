import React, { Component } from 'react';
import axios from 'axios';
import { Cover } from '../Cover';
import { spotifyAlbumURL } from '../spotifyURL';

export default class ArtistAlbums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_user: [],
            tracks: []
        };
    }

    componentDidMount = () => {
        const { current_user } = this.props.location.state;
        if(current_user){
            this.setState({ current_user })
        }else{
            this.props.history.push('/')
        }
    }

    showAlbums = (albums) => {
        if(albums!=undefined && albums.length > 0){
            let results = [];
            console.log('showAlbums ', albums);
            albums.map((album, index) => {
                if(album.images[0]!=undefined){
                    let hasImage = album.images[0];
                    let artists = '';
                    if( album.artists!=undefined ) {
                      album.artists.map((artist, index) => {
                        artists += artist.name + ' '
                      })
                    }
                    results.push(
                        <div className="col" key={index}>
                            <Cover
                                name={album.name}
                                id={album.id}
                                artists={artists}
                                release_date={album.release_date}
                                total_tracks={album.total_tracks}
                                key={index}
                                albumURL={album.external_urls.spotify}
                                imageURL={hasImage.url}
                                text="Show Tracks"
                            />
                        </div>
                    )
                }
            })
            return results
        }else{
            return <p>No Albums</p>
        }
    }

    render() {
        const {
            data: {
                albums
            },
            name:  {
                name
            },
            current_user: {
                user: {
                    images,
                    display_name
                }
            }
        } = this.props.location.state;

        return (
            <div>
                <div className="justify-content-center mt-5 row">
                    <p className="text-center display-5">
                        Album Results for { name }
                    </p>
                </div>
                <div className="row">
                    {this.showAlbums(albums)}
                </div>
            </div>
        )
    }
}
