import {createSlice} from '@reduxjs/toolkit'

let stock = createSlice({
    name : 'stock',
    initialState : {name : 'kim', age : 10},
    reducers : {
        ageChe(state, action) {
            console.log(state.age += action.payload)
        },
        nameChe(state) {
            console.log(state.name = 'park')
        }
    }
})
export let {ageChe, nameChe} = stock.actions

export default stock