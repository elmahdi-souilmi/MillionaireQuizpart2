import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from 'react';
import axios from 'axios';

function  Accountstable() {
  const [mail ,setEmail] = useState();
  const [Accounts , setAccounts] = useState([]);
//const giftdata = {Name,image};
    
      const handleClick = (e) => {
          
          console.log(mail)
          let email = {"email":mail}
            console.log(email)
          //  console.log('http://localhost:2020/admin/'+email)  
            
            axios.put('http://localhost:2020/admin/',email, {
                      headers: {
                            'Authorization': `barer ${localStorage.getItem("token")}` 
                                }}).then(res => {
                                    console.log(res.data);
                                })
            }
      useEffect(()=>{
                axios.get('http://localhost:2020/admin/accounts',{
                headers: {
                'Authorization': `barer ${localStorage.getItem("token")}` 
                    }}).then(res => {
                       let Accounts = res.data.Accounts;
                        setAccounts(Accounts)
                        console.log(Accounts);
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
     <th>full Name</th>
     <th>Age</th>
     <th>phone number</th>
     <th>Email </th>
     <th>password</th>

    </tr>
  </thead>
  <tbody>
{
        Accounts &&
        Accounts.map((Account, index) =>(

          <tr>
            <td>{index + 1}</td>
            <td>{Account.fullName}  </td>
            <td>{Account.age}</td>
            <td>{Account.phone}  </td>
            <td>{Account.email}</td>
            <td>{Account.password}  </td>
            <td> <Button variant="primary" size="lg"  value={Account.email} onFocus={(e)=>setEmail(e.target.value)} onClick={handleClick} block> activate </Button> </td>
          </tr>
            
          ))
        }
  </tbody>
</Table>
 </div>
     </Col>
  </Row>
   
  </center>
    )
}

export default Accountstable
