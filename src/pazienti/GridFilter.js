import { Map } from 'immutable'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from './pazientiActions'
//http://www.zsoltnagy.eu/container-components-and-stateless-functional-components-in-react/
export function GridFilter({ filters, filter}) {
  //const name = filters.get('filter')
  let nameInput;

  const handleSubmit = event => {
      event.preventDefault();
      filter(nameInput.value);
      //nameInput.value = '';  
  }    

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" 
          ref={n => nameInput = n}
          placeholder="Filter" 
          />
        <input type="submit" value="Filter" />
      </form>
  )
}

GridFilter.propTypes = {
  filters: PropTypes.instanceOf(Map).isRequired,
  filter: PropTypes.func.isRequired
}

export default connect(
  state => ({
    filters: state.pazienti.get('filters')
  }),
  { filter: actions.filter }
)(GridFilter)