const redux = require('redux')
const createStore = redux.createStore

const CAKE_ORDERED = 'CAKE ORDERED'

// Creating Action
function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}

const initialState = {
    numOfCakes: 10,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,   // If the state object contains more than 1 property
                numOfCakes: state.numOfCakes - 1
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
// Handles unregistering of listeners
unsubscribe()