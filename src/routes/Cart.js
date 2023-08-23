import { memo, useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { changeName, addCount, nameChe, removeItem } from "../store";
import { ageChe } from "../store/userSlice";

let Child = memo(function() {
    console.log('재렌더링임')
    return <div>자식임</div>
})

function 함수() {
    return <>반복문10억번돌린결과</>
}

function Cart() {
    useMemo(()=> {return 함수()}) //************************************* 유즈메모 */

    // 스토어 스테이트 리덕스 가져오기 
    let user = useSelector((state)=> state )   // 모든 리덕스 스테이트 가져오기
    let stock = useSelector((state)=> {return state.stock}) // 특정 리덕스 스테이트 가져오기


    let redux = useSelector((state)=> state.cart); 
    let dispatch = useDispatch();
    // console.log(redux)  dispatch(changeName())
    useEffect(()=> {
        if( localStorage.getItem('cartName') ) {
            console.log('로그인 완료')
        } else {
            console.log('로그인 안되어있음')
            dispatch(changeName())
            localStorage.setItem('cartName', JSON.stringify( 'yes'))
        }
    }, [])
    

    let [count, setCount] = useState(0) //*********************************그냥 메모 */

    // console.log(e.target.parentNode.parentNode.querySelector('td:nth-of-type(3)'))
    return(
        <div>
            <Child count={count} />
            <button onClick={()=> {setCount(count + 1)}}> + </button>

            <h6>{user.user}의 장바구니</h6>
            <button onClick={()=> {dispatch(ageChe(10))}}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {redux.map((a, i)=> {
                         return (
                            <tr key={i}>
                                <td>{redux[i].id + 1}</td>
                                <td>{redux[i].name}</td>
                                <td>{redux[i].count }</td>
                                <td> <button onClick={()=> { dispatch(addCount(redux[i].id)) } }>+</button> </td>
                                <td> <button onClick={()=> { dispatch(removeItem(redux[i].id)) } }>삭제</button> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table> 
        </div>
    )
}


export default Cart