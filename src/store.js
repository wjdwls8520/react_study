import { configureStore, createSlice } from '@reduxjs/toolkit'
import stock from './store/userSlice'

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



// 장바구니
let cart = createSlice({
    name : 'list',
    initialState : 
        [
            {id : 0, name : 'White and Black', count : 2},
            {id : 1, name : 'Red Knit', count : 1}
        ] ,
    reducers : {
        addCount(state, action) {
            //findIndex()는 array 뒤에 붙일 수 있는데 
            // - 안에 콜백함수넣고 return 뒤에 조건식도 넣으면 됩니다. 
            // - a라는 파라미터는 array 안에 있던 하나하나의 자료입니다.
            // - array에 있던 자료를 다 꺼내서 조건식에 대입해보는데 조건식이 참이면 그게 몇번째 자료인지 알려줍니다. 
            // 그래서 위의 코드는 a.id와 payload가 같으면 그게 몇번째 자료인지 변수에 저장하라는 소리입니다. 
            let 번호 = state.findIndex((a)=> { return a.id === action.payload })
            state[번호].count ++
        },
        addItem(state, action) {
            let 번호 = state.findIndex((a)=> { return a.id === action.payload.id }) 

            if (번호 == -1) {
                console.log('해당 제품이 없어 리스트에 추가')
                state.push(action.payload)
            } else {
                console.log('해당 제품이 리스트에 있어 수량 추가')
                state[번호].count ++;
            }

        },
        removeItem(state, action) {
            let i = state.findIndex((x)=> { return x.id === action.payload })
            state.splice(i, 1)
        }
    }
})
export let {addCount, addItem, removeItem} = cart.actions


export default configureStore({
  reducer: { 
    // 작명 : name.initialState
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer
  }
}) 