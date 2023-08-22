import './App.css';
import { createContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, Row } from 'react-bootstrap';
import bg from './images/main_intro.png';
import data from './data';
import Item from './component/item';
// 라우터쓸때 외부 라이브러리를 쓰는데 항상 같은걸 쓰는게 아니게 때문 때때로 맞춰서 써야함
import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate, Outlet } from 'react-router-dom' //Hook (유용한것들이 들어있는 함수라고 보면 됨)

import Detail from './routes/detail';

import axios from 'axios';
import Cart from './routes/Cart';
import { useQuery } from 'react-query';


export let Context1 = createContext();


function App() {

  // 로컬스토리지 문자열만 넣을수 있는데 편법 쓰기
  let obj = {name : 'kim'}
  // JSON.stringify(obj)
  localStorage.setItem('data', JSON.stringify(obj))
  let 꺼낸거 = localStorage.getItem('data');
  꺼낸거 = JSON.parse(localStorage.getItem('data')).name

  // 빈배열만들어놓기
  useEffect(()=> {

     
      if(localStorage.getItem('watched')) {

      } else {
        localStorage.setItem('watched', JSON.stringify([]))
      }
    
  },[])


  let [shoes, 신발순서변경] = useState(data);
  let [재고] = useState([10, 11, 12]);


  let navigate = useNavigate();  // Link는 a태그 만들어서 앵커해주고, 이 hook은 그냥 window.locate이라고 보면됨
  // navigate(-1) 뒤로가기 버튼  
  // navigate(1) 앞으로가기 버튼  


  let [버튼횟수, set버튼횟수] = useState(0)



  // axios.get('https://codingapple1.github.io/userdata.json').then((a)=> {
  //   console.log(a.data);
  // })
  let result = useQuery('자크명', ()=> 

      axios.get('https://codingapple1.github.io/userdata.json').then((a)=> {
        return a.data
      })
  
  )
  //  result.isLoading && '로딩중' 
  //  result.error && '에러남' 
  //  result.data && result.data.name 

  return (
    <>
    
      {/* 네비게이션 헤더 */}
      <Navbar bg="dark" variant="dark">
          <Container>
              <Navbar.Brand onClick={()=> {navigate('/')}}>
                {/* <Link className={'link'} to="/">KVR SHOP</Link> */} KVR SHOP
              </Navbar.Brand>
              <Nav className="me-auto">
                  {/* 라우터 링크 파라미터값이 바뀌지 않기 때문에 원페이지가 됨 */}
                  <Link className={'link'} to="/">Home</Link>
                  <Link className={'link'} to="/detail">Detail</Link>
                  <Link className={'link'} to="/cart">Cart</Link>
              </Nav>
              {/* <Nav className='ms-auto' style={{color : '#fff'}}>{ result.isLoading ? '로딩중' : result.data.name }</Nav> */}
              <Nav className='ms-auto' style={{color : '#fff'}}>{ result.isLoading ? '로딩중' : result.data.name }</Nav>
          </Container>
      </Navbar>

      {/* 라우터 */}
      <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={
              <>
                  {/* 컴포넌트로 만들면 쉽겠지 */}
                  <div className='main-bg'>
                      <img src={bg} alt="대표사진" />
                  </div>

                  <button onClick={()=> navigate('/event')}>EVENT</button>
                  <button onClick={()=> {
                      let copy = [...shoes]
                      copy.sort((a, b) => a.title.localeCompare(b.title));
                      // copy.sort((a, b) => {return  b.id - a.id;});
                      console.log(copy);
                      
                      신발순서변경(copy)

                  }}>가나다변경</button>

                  <Container>
                      <Row className='grid'>
                          {/* <Item shoes={shoes[0]} i={1} />
                          <Item shoes={shoes[1]} i={2} />
                          <Item shoes={shoes[2]} i={3} /> */}

                          {
                            shoes.map((a, i)=> {
                              return(
                                <Item shoes={shoes[i]} i={i} key={i} />
                              ); 
                            })
                          }
                      </Row>
                  </Container>

                  {버튼횟수 < 2 ?

                  <button className='btn_num' style={{marginTop:"30px"}} onClick={()=>{ 
                    
                    set버튼횟수(버튼횟수 = 버튼횟수 + 1 )
                    console.log(버튼횟수)
                    
                    console.log('로딩중')
                    
                    if (버튼횟수 == 1 ) {
                          axios.get('https://codingapple1.github.io/shop/data2.json')
                            .then((결과)=>{
                              console.log(결과.data)
                              console.log(shoes)
      
                              let copy = [...shoes, ...결과.data];
                              신발순서변경(copy);
      
                              console.log('로딩끝')
                            })
                            .catch(()=>{
                              console.log('실패함ㅅㄱ')
                            })
                    } else if (버튼횟수 == 2) {
                            axios.get('https://codingapple1.github.io/shop/data3.json')
                            .then((결과)=>{
                              console.log(결과.data)
                              console.log(shoes)

                              let copy = [...shoes, ...결과.data];
                              신발순서변경(copy);

                              console.log('로딩끝')
                            })
                            .catch(()=>{
                              console.log('실패함ㅅㄱ')
                            })
                    }

                    // axios.post('/safdfas', {name : 'kim'}) 서버로 보내기

                    // Promise.all( [ axios.get('/url'), axios.get('/url2') ] ) 두개동시에 받기
                    // .then(()=> {

                    // }) 

                    // 엑시오스를 안쓰고 fetch를 사용한 json파일 가져오기  //json을 array나 객체로 가져오기가 불편함
                    // fetch('https://codingapple1.github.io/shop/data3.json')
                    // .then(결과=> 결과.json())
                    // .then(data=>{})
                
                    }}>버튼</button>

                    : null
                  }

              </>
          } />

           {/* 서브페이지 */} {/* 페이지 개수만큼 Route 추가 */}
          <Route path="/detail" element={ 
            
              shoes.map((a, i)=> {
                return(
                  <>
                      <div className="container">
                          <div className="row">
                            <div className="col-md-6">
                                <img src={'https://codingapple1.github.io/shop/shoes' + (i + 1) + '.jpg'} alt="상세사진" style={{width:"60%"}} />
                            </div>
                            <div className="col-md-6">
                                <h4 className="pt-5">{shoes[i].title}</h4>
                                <p>{shoes[i].content}</p>
                                <p>{shoes[i].price}원</p>
                                <button className="btn btn-danger" onClick={()=> {navigate(`/detail/${i}`)}}>주문하기</button> 
                            </div>
                          </div>
                      </div> 
                  </>
                );
              }) 
            
          }/>

          {/* 디테일 */}
          <Route path="/detail/:id" element={ 
            <Context1.Provider value={{ 재고 }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          } />

          {/* 장바구니 카트 */}
          <Route path='/cart' element={ <Cart /> } />

          <Route path='about' element={<About />}> 
            <Route path='member' element={<div>멤버임</div>} /> 
            <Route path='location' element={<div>위치정보임</div>} /> 
          </Route> 
             {/* 둘이 같은거입니다 */}
          {/* <Route path='/about/member' element={<About />} /> 
          <Route path='/about/location' element={<About />} />  */}

          <Route path='/event' element={<Event navigate={navigate} />}>
              <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
              <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
          </Route>



          {/* 404페이지 만들기 */}
          <Route path='*' element={<div> 404 없는페이지</div>} /> 

      </Routes>

    </>
  );
}

function About() {
  return(
    <div>
        <h4>회사정보임</h4>
        <Outlet></Outlet>
    </div>
  );
}

function Event(props) {
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <button onClick={()=> props.navigate('/event/one')}>서비스</button>
      <button onClick={()=> props.navigate('/event/two')}>쿠폰</button>
      <Outlet></Outlet>
    </div>
  );
}





export default App;
