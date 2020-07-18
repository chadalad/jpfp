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
    // const museums = this.props.museums;
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
                    {/* <button className="button is-danger has-text-weight-bold is-pulled-right" key={museum.id} onClick={() => this.props.editMuseum(museum)}>Edit</button> */}
                    {/* <button className="button is-danger has-text-weight-bold is-pulled-right" key={museum.id} href={(<Link to={`/museums/edit/${museum.id}`}/>)} onClick={() => (<Link to={`/museums/edit/${museum.id}`}/>)}>Edit</button> */}
                    {/* <button className="button is-danger has-text-weight-bold is-pulled-right" key={museum.id} href={(<Link to={`/museums/edit/${museum.id}`}/>)}>Edit</button> */}
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
                    {/* <button
                      className="button is-danger has-text-weight-bold is-pulled-right"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('click');
                        return (
                          <Redirect to={`/museums/edit/${museum.id}`} />
                        )
                      }
                      }
                    >
                      Edit
                    </button> */}


                    <h4 className="title is-4">{museum.name}</h4>
                    <hr className="is-divider" />
                    <p className="">{museum.imageURL}</p>
                    
                    </>
                    {/* <div className="modal" id={museum.id}>
                      <div className="modal-background"></div>
                      <div className="modal-content">
                        
                      </div>
                      <button className="modal-close is-large"></button>
                    </div> */}
                    {/* <a className="delete" onClick={this.onDelete(museum.id)}></a> */}
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
