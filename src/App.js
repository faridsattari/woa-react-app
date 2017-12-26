import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink, Route, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import PazientiListPage from './pages/pazienti-list-page';
import PazienteFormPage from './pages/paziente-form-page';
import PazienteDetailsPage from './pages/paziente-details-page';
import ConsultoDetailsPage from './pages/consulto-details-page';
import ConsultoFormPage from './pages/consulto-form-page';
import AnamnesiRemotaFormPage from './pages/anamnesi-remota-form-page';
import AnamnesiProssimaFormPage from './pages/anamnesi-prossima-form-page';
import EsameFormPage from './pages/esame-form-page';
import TrattamentoFormPage from './pages/trattamento-form-page';

import { fetchProvince } from './pazienti/pazientiActions';
import { fetchTipiAnamnesiRemote } from './anamnesiRemote/anamnesiRemoteActions';
import { fetchTipiEsame} from './esami/esamiActions';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.props.fetchProvince();
    this.props.fetchTipiAnamnesiRemote();
    this.props.fetchTipiEsame();
  }

  render() {
    return (
      <Container>
        <div className="ui four item menu">
          <NavLink className="item" activeClassName="active" exact to="/">
            Pazienti
          </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/paziente/new">
            Crea Paziente
          </NavLink> 
          <NavLink className={`item ${this.props.pazienteStatus}`} activeClassName="active" to={`/paziente/details/${this.props.pazienteId}`}>
            Paziente
          </NavLink> 
          <NavLink className={`item ${this.props.consultoStatus}`} activeClassName="active" to={`/consulto/details/${this.props.consultoId}`}>
            Consulto
          </NavLink> 
        </div>
        
        <Route exact path="/" component={PazientiListPage}/>
        <Route path="/paziente/details/:id" component={PazienteDetailsPage}/>
        <Route path="/paziente/new" component={PazienteFormPage}/>
        <Route path="/paziente/edit/:id" component={PazienteFormPage}/>

        <Route path="/anamnesi-remota/new" component={AnamnesiRemotaFormPage}/>
        <Route path="/anamnesi-remota/edit/:id" component={AnamnesiRemotaFormPage}/>

        <Route path="/consulto/details/:id" component={ConsultoDetailsPage}/>
        <Route path="/consulto/new" component={ConsultoFormPage}/>
        <Route path="/consulto/edit/:id" component={ConsultoFormPage}/>

        <Route path="/anamnesi-prossima/new" component={AnamnesiProssimaFormPage}/>
        <Route path="/anamnesi-prossima/edit/:id" component={AnamnesiProssimaFormPage}/>   

        <Route path="/esame/new" component={EsameFormPage}/>
        <Route path="/esame/edit/:id" component={EsameFormPage}/>     

        <Route path="/trattamento/new" component={TrattamentoFormPage}/>
        <Route path="/trattamento/edit/:id" component={TrattamentoFormPage}/>            
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const pazienteId = state.pazienteStore.paziente.id;
  const consultoId = state.consultiStore.activeConsultoId;
  
  return {
    pazienteId: pazienteId,
    pazienteStatus: pazienteId!==undefined? "enabled" : "disabled",
    consultoId: consultoId,
    consultoStatus: consultoId!==undefined? "enabled" : "disabled"

  }
}

export default withRouter(connect(mapStateToProps, {fetchProvince, fetchTipiAnamnesiRemote, fetchTipiEsame})(App));
