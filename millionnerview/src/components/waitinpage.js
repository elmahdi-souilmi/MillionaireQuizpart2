import React from "react";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import axios from "axios";
import {
    useEffect,
    useState
} from "react"
import {
    useHistory
} from 'react-router-dom';
function Waitinpage() {

const history = useHistory();
  const [error, seterror] = useState('')
  const [idgroup, setidgroup] = useState();
  const [username, setusername] = useState()
  useEffect(() => {
      setidgroup(localStorage.getItem("codeGroup"))
      setusername(localStorage.getItem("nameuser"))
  })
       const  joingame  = async() => {
            const  codegroup = {codegroup : localStorage.getItem("codeGroup")}
            console.log(codegroup);
          await axios.post('http://localhost:2020/round/checkgroup', codegroup)
                .then(res => {
                   // console.log(typeof (res.data));
                    if (typeof (res.data) == "number")
                    {
                        console.log("mazal khass " + (4 - res.data).toString());
                        seterror("mazal khass " + (4 - res.data).toString())
                    }
                    else 
                    {
                        console.log("group nadi hal id dyal round : " + res.data);
                        localStorage.setItem("roundid", res.data);
                        history.push("/game");
                      
                    }
                    
                })
        }
        
  return (
    <Container >
      <center style={{ marginTop: "20%" }}>
        <Row>
             <h1> hello {username}, your group code is " {idgroup} "
             share it with your friends to play together </h1> 
        </Row>
      
            <Button onClick={joingame} > star the game </Button> <br/>
             <span> {error}</span>
        
              
      </center>
    </Container>
  );
}

export default Waitinpage;
