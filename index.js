const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers 

const CAKE_ORDERED = 'CAKE ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

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

function orderIceCream(qty = 1){
    return {
        type: 'ICECREAM_ORDERED',
        payload: qty
    }
}

function restockIceCream(qty =1){
    return {
        type: 'ICECREAM_RESTOCKED',
        payload: qty
    }
}

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 5,
// }

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 17
}

const cakeReducer = (state = initialCakeState, action) => {
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

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case 'ICECREAM_ORDERED':
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        case 'ICECREAM_RESTOCKED':
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload,
            }
        default:
            return state
    }
}

// Combining both the reducers into one
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
// (previousState, action) => newState

// const store = createStore(reducer)
const store = createStore(rootReducer)
console.log('Initial State', store.getState())

const unsubscribe = store.subscribe(() => console.log("Üpdate State ", store.getState()))

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(5)

actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(3)

// Handles unregistering of listeners
unsubscribe()