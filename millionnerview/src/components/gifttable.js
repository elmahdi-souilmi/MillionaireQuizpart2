import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from 'react';
import axios from 'axios';

function  Gifttable() {
  const [Name ,setgiftname] = useState('');
  const [image,setgiftimage] = useState('');
  const [gift , setGift ] = useState([]);

const giftdata = {Name,image};
const handleClick = (e) => {
 console.log("clicked")
 console.log(giftdata)
   axios.post('http://localhost:2020/admin/addgift', giftdata,{
                headers: {
                'Authorization': `barer ${localStorage.getItem("token")}` 
                    }}).then(res => {
                        console.log(res.data);
                        })
}
      useEffect(()=>{
                axios.get('http://localhost:2020/admin/gifts',{
                headers: {
                'Authorization': `barer ${localStorage.getItem("token")}` 
                    }}).then(res => {
                       let gifts = res.data.gifts;
                        setGift(gifts)
                        console.log(gifts);
                        })
                    }
            ,[])

  return (     
<center style={{ marginTop:"0%" }}> 
  <Row>
    <Col>
        <div>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th> Name</th>
      <th>image source</th>

    </tr>
  </thead>
  <tbody>
{
        gift &&
        gift.map((gift, index) =>(

          <tr>
            <td>{index + 1}</td>
            <td>{gift.Name}  </td>
            <td>{gift.image}</td>
            
          </tr>
            
          ))
        }

  <tr>  
  <td>Add</td>
  <td><input style={{"width":"100%"}} value={Name}
                onChange={(e)=>setgiftname(e.target.value)} /> </td>
  <td><input style= {{"width":"100%"}} value={image}
                onChange={(e)=>setgiftimage(e.target.value)}/> </td>
   </tr>
  </tbody>
</Table>
 </div>
     </Col>
  </Row>
    <Button variant="primary" size="lg" onClick={handleClick}   block>
    Add gift
  </Button>
  </center>
    )
}

export default Gifttable
