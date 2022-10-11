const redux = require('redux')
const thunkMiddleWare = require('redux-thunk').default
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleWare = redux.applyMiddleware

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEDED = 'FETCH_USERS_SUCCEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUserSuccess = () => {
    return {
        type: FETCH_USERS_SUCCEDED,
        payload: users,
    }
}

const fetchUsersFailed = error => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }

        case FETCH_USERS_SUCCEDED:
            return {
                loading: false,
                payload: action.payload,
                error: ''
            }

        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())   // Set Loading to true
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                // response.data is the users
                const users = response.data.map((user) => user.id)
                dispatch(fetchUserSuccess(users))
            }).catch(error => {
                //error.message is the error
                dispatch(fetchUsersFailed(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleWare(thunkMiddleWare))

store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())
