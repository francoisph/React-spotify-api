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
                    <h4 className="cover-title">{name.length > 30 ? name.substr(0, 27) + '...' : name }</h4>
                    <div className="cover-text">{followers ? followers + ' followers' : ''}</div>
                    <div className="cover-text">{artists ? artists : ''}</div>
                    <div className="cover-text">{release_date ? release_date : ''}</div>
                    <div className="cover-text">{total_tracks ? total_tracks + ' tracks' : ''}</div>
                </div>
                { followers ?
                  <div className="cover-stars">
                    <ReactStars
                        count={5}
                        value={ popularity ? (popularity*5)/100 : 0}
                        size={24}
                        color2={'#ffd700'} />
                  </div>
                : ''}
                {albumURL ?
                    <a href={albumURL}>
                      <div className="cover-link" > <div className="cover-link-title" > Preview in Spotify </div></div>
                    </a>
                : ''}
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
