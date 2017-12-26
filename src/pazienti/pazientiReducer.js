import initialState from '../store/initialState';


export default (state=initialState.pazienteState, action={}) => {
  //console.log(`reducer -> ${action.type}`)
  switch (action.type) {

    case 'NEW_PAZIENTE': {
      return {
        ...state,
        paziente: initialState.pazienteState
      }
    }

    case 'PAZIENTE_RESET': {
      return {
        ...state,
        paziente: initialState.pazienteState
      }
    }

    case 'FETCH_PAZIENTE_PENDING': {
      return {
        ...state,
        paziente: initialState.pazienteState
      }
    }
    
    case 'FETCH_PAZIENTE_FULFILLED': {
      let paziente = {...action.payload.data};

      let valutazioni=[];
      paziente.consulti.forEach(c => {
        valutazioni.push(...c.valutazioni);
      });

      delete paziente.consulti;
      delete paziente.anamnesiRemote;

      return {
        ...state,
        paziente: paziente,
        valutazioni: valutazioni
      }
    }

    // case 'SAVE_PAZIENTE': {

    //   console.log('SAVE_PAZIENTE');
    //   console.log(action.payload.data.paziente);
    //   return {
    //     ...state,
    //     paziente: action.payload.data.paziente,
    //     loading: false
    //   }
    // }

    case 'SAVE_PAZIENTE_PENDING': {
      return {
        ...state
      }
    }

    case 'SAVE_PAZIENTE_FULFILLED': {
      // console.log('SAVE_PAZIENTE_FULFILLED');
      // console.log(action.payload.data);
      return {
        ...state,
        paziente: action.payload.data
      }
    }

    case 'SAVE_PAZIENTE_REJECTED': {
      //const data = {message: "error"};
      //console.log(action.payload);
      //const data = action.payload.response.data;
      // convert feathers error formatting to match client-side error formatting
      //const { "name.first":first, "name.last":last, phone, email } = data.errors;
      //const errors = { global: data.message, nome: {message:"nome is required"}, prov: {message:"prov is required"}, gender: {message:"prov is required"}};//, name: { first,last }, phone, email 
      return {
        ...state
      }
    }   

    // case 'CONSULTO_ACTIVE': {
    //   return {
    //     ...state,
    //     activeConsultoId: action.payload
    //   }
    // }

    case 'FETCH_PROVINCE_PENDING': {
      return {
        ...state
      }
    }   

    case 'FETCH_PROVINCE_FULFILLED': {
      return {
        ...state,
        province: action.payload.data.map(x=>({value:x.sigla, text:x.descrizione}))
      }
    }   

    // case 'FETCH_TIPI_ANAMNESI_PENDING': {
    //   return {
    //     ...state,
    //     loading: true
    //   }
    // }  
    
    // case 'FETCH_TIPI_ANAMNESI_FULFILLED': {
    //   return {
    //     ...state,
    //     tipiAnamnesi: action.payload.data.map(x=>({value:x.id, text:x.descrizione})),
    //     loading: false
    //   }
    // }  

    // case 'SAVE_ANAMNESI_REMOTA_PENDING': {
    //   return {
    //     ...state,
    //     loading: true
    //   }
    // }  

    // case 'SAVE_ANAMNESI_REMOTA_FULFILLED': {
    //   console.log(action.payload.data);
    //   let anamesi = action.payload.data;
    //   const tipo = state.tipiAnamnesi.find(x=>x.id === anamesi.tipoId);
    //   anamesi.tipo = {...tipo};
    //   return {
    //     ...state,
    //     anamnesiRemote: [...state.anamnesiRemote.filter(x => x.id !== action.payload.data.id), Object.assign({}, anamesi)],
    //     loading: false
    //   }
    // }  
    // case 'SAVE_ANAMNESI_REMOTA_REJECTED': {
    //   const errors = { global: 'SAVE_ANAMNESI_REMOTA_REJECTED'};
    //   return {
    //     ...state,
    //     errors: errors,
    //     loading: false
    //   }
    // }  
    

    // case 'SAVE_ANAMNESI_PROSSIMA_PENDING': {
    //   return {
    //     ...state,
    //     loading: true
    //   }
    // }  

    // case 'SAVE_ANAMNESI_PROSSIMA_FULFILLED': {
    //   console.log(action.payload.data);
    //   const anamesi = action.payload.data;
    //   return {
    //     ...state,
    //     anamnesiProssime: [...state.anamnesiProssime.filter(x => x.consultoId !== action.payload.data.consultoId), Object.assign({}, anamesi)],
    //     loading: false
    //   }
    // }  
    // case 'SAVE_ANAMNESI_PROSSIMA_REJECTED': {
    //   const errors = { global: 'SAVE_ANAMNESI_PROSSIMA_REJECTED'};
    //   return {
    //     ...state,
    //     errors: errors,
    //     loading: false
    //   }
    // }      

    default:
      return state;
  }
}