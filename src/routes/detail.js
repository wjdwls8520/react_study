import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";


let YellowBtn = styled.button`
    background : ${props => props.bg};
    color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`

// class Detail2 extends React.Component {
//     componentDidMount() {
            // Mount 됐을떄 실행 (장착)
//     }
//     componentDidUpdate() {
            //Update 됐을떄 실행 (업데이트)
//     }
//     componentWillUnmount() {
            // Unmount 됐을떄 실행 (삭제)
//     }
// } = useEffect  정확한 명칭은 hook


function Detail(props) {
    let { id } = useParams();
    let itemFind = props.shoes.find((x) => x.id == id );
    
    let [count, setCount] = useState(0);
    let [comment, setComment] = useState(true)

    useEffect( ()=> {
        // html이 전부 로드 된 후 실행됨   
        // - 어려운 연산
        // - 서버에서 데이터 가져오는 작업
        // - 타이머 장착하는거
        let a = setTimeout(() => {
            setComment(false)
        }, 2000);
        console.log(1)
        return ()=> {
            console.log(2)
            clearTimeout(a); // 기존 데이터 요청은 제거해주세요 // 언마운트 될 때 적용됨
        }
    }, [count] );
    // 맨아래 실행조건 넣을수 있는 [] 를 추가 가능   ==  디펜던시라고함
    // - [] 조차 안쓰면 업데이트 될때마다 실행됨
    // - [] 안에 아무것도 안적으면 다른 스테이트가 변경시에도 재실행되지 않음   ( 마운트시 1회만 동작 함 )
    // - [] 안에 변수를 넣으면 그 state가 재실행할때 같이 재실행함   
    // - return 을 추가할수 있음 useEffect가 실행되기 전에 실행됨

    // 4줄요약
    // 1. useEffect( ()=> {})   - 재렌더링마다 코드실행하고 싶음.
    // 2. useEffect( ()=> {} , [])   - 마운드시 1회 코드실행하고 싶음.
    // 3. useEffect( ()=> {} , [count])   - 특정 스태이트 변경시에만 코드실행하고 싶음.
    // 4. useEffect( ()=> {
    //  return ()=> {
    //    - 재렌더링마다 코드실행하고 싶음.
    //    - clearTimeout(a); // 기존 데이터 요청은 제거해주세요 // 언마운트 될 때 적용됨
    //      }
    // }, [])   


    console.log('rer')

    let [num, setNum] = useState('')


    useEffect(()=> {
        if (isNaN(num) == true) {
            alert('안돼')
            setNum('')
        }
    }, [num])

    return(
        <>
            <div className="container">    
                {
                    comment == true ? 
                    <div className="comment">2초 이내 구매시 할인</div> : null
                } 
                <input onChange={(e)=> {setNum(e.target.value)}} />
                <YellowBtn onClick={()=> {setCount(count + 1); setComment(true) }} bg="blue">버튼</YellowBtn>
                <div className="row">
                    <div className="col-md-6">
                        <img src={'https://codingapple1.github.io/shop/shoes' + (Number(id) + 1) + '.jpg'} alt="상세사진" style={{width:"60%"}} />
                    </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{itemFind.title}</h4>
                        <p>{itemFind.content}</p>
                        <p>{itemFind.price}원</p>
                        <button className="btn btn-danger">주문하기</button> 
                    </div>
                </div>
            </div> 
        </>
    );
}

export default Detail;