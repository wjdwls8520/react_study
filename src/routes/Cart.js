import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { changeName, addCount, nameChe, removeItem } from "../store";
import { ageChe } from "../store/userSlice";

function Cart() {

    // 스토어 스테이트 리덕스 가져오기 
    let user = useSelector((state)=> state )   // 모든 리덕스 스테이트 가져오기
    let stock = useSelector((state)=> {return state.stock}) // 특정 리덕스 스테이트 가져오기


    let redux = useSelector((state)=> state.cart); 
    let dispatch = useDispatch();
    // console.log(redux)  dispatch(changeName())
    
    useEffect(()=> {
        dispatch(changeName())
        
    }, [])
    

    // console.log(e.target.parentNode.parentNode.querySelector('td:nth-of-type(3)'))
    return(
        <div>

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