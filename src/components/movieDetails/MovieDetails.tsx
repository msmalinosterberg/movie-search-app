import React, { CSSProperties } from 'react';
import { Col, Layout, Row, Image } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;
interface State {
    movieDetails: IMovieDetails | undefined;
}
interface IMovieDetails {
    img: string;
    title: string;
    year: string;
    genre: string;
    imdbScore: string;
    overview: string;
    actors: string;
    director: string;
}
interface Props extends RouteComponentProps {
    imdbid: string;
}
class MovieDetails extends React.Component<Props, State> {
    
    state: State = {
        movieDetails: undefined
    }

    async componentDidMount() {     
        document.body.style.backgroundColor = "#4a4a49"; 
        const imdbID = (this.props.match.params as any).imdbid;
        const result = await fetchMovieDetails(imdbID);
        if (result?.data.Response === 'False') {
            return;
        }
        const movieDetails = {
            img: result?.data.Poster,
            title: result?.data.Title,
            year: result?.data.Year,
            genre: result?.data.Genre,
            imdbScore: result?.data.Ratings[0]?.Value || 'N/A',
            overview: result?.data.Plot,
            actors: result?.data.Actors,
            director: result?.data.Director,
        }
        this.setState({ movieDetails: movieDetails });
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = "#ffffff";
    }
      
    navigateBack = () => this.props.history.goBack();
    
    render() {
        if (!this.state.movieDetails) {
            return <div></div>
        }
        if (!this.state.movieDetails.title) {
            return <h1 style={movieNotFound}>Could not find this movie</h1>
        }
        return(
            <Layout style={movieDetailContainer}>
                <Content>
                    <Row justify="space-around" align="middle" style={{marginTop:'8rem'}}>
                        <Col lg={{span: 8}}>
                            <Image 
                                src={this.state.movieDetails.img}
                                width={200}
                                style={poster}>
                            </Image>
                        </Col>
                        <Col lg={{span: 16}}>
                            <h2 style={movieTitle}>{this.state.movieDetails.title} ({this.state.movieDetails.year})</h2>
                            <h3 style={genre}>{this.state.movieDetails.genre}</h3>
                            <h3 style={imdbScore}><strong>IMDB:</strong> {this.state.movieDetails.imdbScore}</h3>
                            <p>{this.state.movieDetails.overview}</p>
                            <p><strong>Actors:</strong> {this.state.movieDetails.actors}</p>
                            <p><strong>Director:</strong> {this.state.movieDetails.director}</p>
                            <button style={buttonStyle} onClick={this.navigateBack}>Tillbaka</button>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(MovieDetails as any);

async function fetchMovieDetails(imdbId: string) {
    try {
        const url = `http://www.omdbapi.com/?i=${imdbId}&apikey=d9ef535f`;
        const result = await axios.get(url);
        return result;
        
    } catch (error) {
        console.log(error);
    }
};

const movieDetailContainer: CSSProperties = {
    background: '#4a4a49',
    width: '100%',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    padding: '2rem',
}

const movieTitle: CSSProperties = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.7rem'
}

const genre: CSSProperties = {
    color: 'white',
}

const imdbScore: CSSProperties = {
    color: 'white',
}

const poster: CSSProperties = {
    marginBottom: '2rem',
}

const movieNotFound: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '3rem 0'
}

const buttonStyle: CSSProperties = {
    backgroundColor: '#564b60',
    color: 'white',
    padding: '0.5rem',
    fontWeight: 'bold',
    border: 'none',
    textDecoration: 'none',
    marginBottom: '2rem',
}

    