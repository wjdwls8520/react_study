import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { changeName, changeNum } from "../store";

function Cart() {

    // 스토어 스테이트 리덕스 가져오기 
    let user = useSelector((state)=> state )   // 모든 리덕스 스테이트 가져오기
    // let redux = useSelector((state)=> {return state.user}) // 특정 리덕스 스테이트 가져오기


    let redux = useSelector((state)=> state.cart); 
    let dispatch = useDispatch();
    // console.log(redux)  dispatch(changeName())
    
    useEffect(()=> {
        dispatch(changeName())
    }, [])

    return(
        <div>

            {user.user}의 장바구니
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {redux.map((a, i)=> {
                         return (
                            <tr key={i}>
                                <td>{redux[i].id}</td>
                                <td>{redux[i].name}</td>
                                <td>{redux[i].count }</td>
                                <td> <button onClick={()=> dispatch(changeNum())}>+</button> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table> 
        </div>
    )
}


export default Cart