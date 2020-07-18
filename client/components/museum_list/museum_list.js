import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMuseums, deleteMuseum, editMuseum, setMuseumToSelected } from '../../redux/museums/museums.actions';
import { findOldest } from '../../redux/artworks/artworks.actions';
import { Link, Redirect } from 'react-router-dom';

class MuseumList extends Component {
  componentDidMount() {
    this.props.fetchMuseums();
    this.props.findOldest();
  }

  render() {
    console.log(this.props);
    const { museums } = this.props;

    return (
      <div>
        <div className="columns">
          <div className="column">
            <h3 className="title is-3">Museums</h3>
          </div>
          <div className="column">
            {/* <a className="is-pulled-right ml-3">Most on Display</a> */}
            <Link
              to={`/museums/edit/${this.props.idOldestHoused}`}
              className="button is-danger has-text-weight-bold is-pulled-right ml-3 is-light"
              onClick={() => this.props.findOldest()}
            >
              Oldest Artwork on Display
            </Link>
            {/* <a className="is-pulled-right ml-3">Oldest on Display</a> */}
          </div>
        </div>
        
        <div className="">
          {
            museums
            ?
              museums.map((museum) => {
                return (
                  <div
                    key={museum.id}
                    className="box"
                  > 
                    <>
                      <a className="button is-danger has-text-weight-bold is-pulled-right ml-3" onClick={() => this.props.deleteMuseum({id: museum.id})}>Remove</a>
                      <Link 
                        to={`/museums/edit/${museum.id}`} 
                        className="button is-danger has-text-weight-bold is-pulled-right"
                        museumobj={museum}
                        onClick={() => {
                          console.log('click');
                          this.props.setMuseumToSelected(museum);
                        }}
                      >
                        Edit
                      </Link>
                      
                      <h4 className="title is-4">{museum.name}</h4>
                      
                      <hr className="is-divider" />
                      {/* <p className="">{museum.imageURL}</p> */}
                    </>
                    
                    <figure className="image is-96x96">
                      <img src={museum.imageURL} />
                    </figure>
                  </div>
                )
              })
            :
              'No Museum Data'
          }
        </div>
      </div>
    )
  }
}

MuseumList.propTypes = {
  fetchMuseums: PropTypes.func.isRequired,
  museums: PropTypes.array.isRequired,
  newProps: PropTypes.object,
  setMuseumToSelected: PropTypes.func.isRequired,
};

//  use from rootReducer
const mapStateToProps = (state) => ({
  museums: state.museums.museums,
  museum: state.museums.museum,
  idOldestHoused: state.allArt.idOldestHoused,
});

//  connect(mapStateToProps, mapDispatchToProps)(component)
export default connect(mapStateToProps, { fetchMuseums, deleteMuseum, editMuseum, setMuseumToSelected, findOldest })(MuseumList);
