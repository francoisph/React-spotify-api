import React from 'react';
import '../styles.css';
import ReactStars from 'react-stars';

const Cover = ({ imageURL, name, id, followers, popularity, artists, release_date, total_tracks, albumURL, onClick, text }) => {
    if ( imageURL ){
        return (
            <div className="cover mt-5" key={id} onClick={onClick}>
                <img
                    className="cover-img-top"
                    src={imageURL}
                    alt="cover image cap"
                    style={styles.imageStyles}
                />
                <div className="cover-body">
                    <h4 className="cover-title">{name}</h4>
                    <p className="cover-text">{followers ? followers + ' followers' : ''}</p>
                    <p className="cover-text">
                    { followers ?
                      <ReactStars
                          count={5}
                          value={ popularity ? (popularity*5)/100 : 0}
                          size={24}
                          color2={'#ffd700'} />
                      : ''}
                    </p>
                    <p className="cover-text">{artists ? artists : ''}</p>
                    <p className="cover-text">{release_date ? release_date : ''}</p>
                    <p className="cover-text">{total_tracks ? total_tracks + ' tracks' : ''}</p>
                    <p className="cover-text">{albumURL ? <a href={albumURL}>Open in Spotify</a>: ''}
                    </p>
                </div>
            </div>
        )
    }else{
        return <div className="cover mt-5" key={id}>
            <div className="cover-body" style={styles.trackStyles}>
              <h4 className="cover-title">{name}</h4>
              <p className="cover-text" />
            </div>
          </div>;
    }

}

const styles = {
    imageStyles: {
        maxWidth: 200,
        minHeight: 200,
        maxHeight: 200
    },
    trackStyles: {
        minHeight: 130,
        overFlow: 'hidden'
    }
}

export { Cover }
