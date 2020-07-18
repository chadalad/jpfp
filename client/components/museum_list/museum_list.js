import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMuseums, deleteMuseum, editMuseum, setMuseumToSelected } from '../../redux/museums/museums.actions';
import { Link, Redirect } from 'react-router-dom';

class MuseumList extends Component {
  componentDidMount() {
    this.props.fetchMuseums();
  }

  render() {
    console.log(this.props);
    const { museums } = this.props;

    return (
      <div>
        <h3 className="title is-3">Museums</h3>
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
                      <p className="">{museum.imageURL}</p>
                    </>
                    <a className="delete" onClick={() => this.props.deleteMuseum({id: museum.id})}></a>
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
});

//  connect(mapStateToProps, mapDispatchToProps)(component)
export default connect(mapStateToProps, { fetchMuseums, deleteMuseum, editMuseum, setMuseumToSelected })(MuseumList);
