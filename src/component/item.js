import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';

function Item(props) {
    return(
      <>
          <Col>
              {/* 어떤상황에서도 같은 url 경로를 유지 */}
              <img src={process.env.PUBLIC_URL + 'https://codingapple1.github.io/shop/shoes' + (props.i + 1 ) + '.jpg'} alt="대표사진" style={{width: '60%'}} />
              <h4>{props.shoes.title}</h4>
              <p>{props.shoes.price}원</p>
          </Col>      
      </>
    );
}

export default Item;