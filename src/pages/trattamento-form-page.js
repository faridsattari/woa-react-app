import React, { Component} from 'react';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import PazienteDetails from '../pazienti/PazienteDetails';
import TrattamentoForm from '../trattamenti/TrattamentoForm';
import { saveTrattamento } from '../trattamenti/trattamentiActions';

class TrattamentoFormPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      redirect: false
    };
  }

  submit = (entity) => {
    return this.props.saveTrattamento(entity)
      .then(response => this.setState({ redirect:true }))
      .catch(err => {
         throw new SubmissionError(this.props.errors)
       })
  }

  render() {
    if(this.state.redirect){
      return (<Redirect to={`/consulto/details/${this.props.activeConsultoId}`} />);
    }
    return (
      <div className="ui grid">
          <div className="four wide column">
            <PazienteDetails paziente={this.props.paziente} />
          </div>
          <div className="twelve wide column">
            <TrattamentoForm entity={this.props.entity} loading={this.props.loading} onSubmit={this.submit} />
          </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.match.params;
  const entityId = parseInt(id, 10);
  const paziente = state.pazienteStore.paziente;
  const activeConsultoId = state.consultiStore.activeConsultoId;
  const entity = id? state.trattamentiStore.entities.find(x=>x.id === entityId) : {pazienteId: paziente.id, consultoId: activeConsultoId};

  return {
    paziente: paziente,
    entity: entity,
    activeConsultoId: activeConsultoId,
    errors: state.uiStore.errors,
    loading: state.uiStore.loading
  }
}

export default connect(mapStateToProps, {saveTrattamento})(TrattamentoFormPage);