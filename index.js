const CAKE_ORDERED = 'CAKE ORDERED'

// Creating Action
function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}
