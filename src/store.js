import { configureStore, createSlice } from '@reduxjs/toolkit'

// useState랑 비슷한 역호ㅓㄹ
let user = createSlice({
    name : 'user',
    initialState : 'kim',
    //리덕스 스테이스 수정하는법
    reducers : {
        // (state)는 기존 소스가져오기
        changeName(state) {
            return 'JJ ' + state
        },
        // 또다른거 함수 추가
    }
})
export let { changeName } = user.actions //리덕스 익스폴트하는법

let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

// 장바구니
let cart = createSlice({
    name : 'list',
    initialState : 
        [
            {id : 1, name : 'White and Black', count : 2},
            {id : 2, name : 'Grey Yordan', count : 1}
        ] ,
    reducers : {
        changeNum(state) {
            // return state[1].count + 1
        }
    }
})
export let {changeNum} = cart.actions


export default configureStore({
  reducer: { 
    // 작명 : name.initialState
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer
  }
}) 