const redux = require('redux')
const createStore = redux.createStore

const CAKE_ORDERED = 'CAKE ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

// Creating Action
function orderCake() {
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}

function restockCake(qty = 2) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

const initialState = {
    numOfCakes: 10,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                // If the state object contains more than 1 property
                ...state,   
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                // state.numOfCakes is used to show the current no. of Cakes
                numOfCakes: state.numOfCakes + action.payload,  
            }
        default:
            return state
    }
}
// (previousState, action) => newState

const store = createStore(reducer)
console.log('Initial State', store.getState())

const unsubscribe = store.subscribe(() => console.log("Üpdate State ", store.getState()))

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(3))

// Handles unregistering of listeners
unsubscribe()