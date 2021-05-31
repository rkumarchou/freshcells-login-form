import { useQuery } from "@apollo/client";
import { gql } from '@apollo/client';
import { useHistory } from "react-router";
import Profile from '../profile.png'
import { useState } from 'react'
import styled from 'styled-components'
const UserInformation = styled.div `
  position: absolute;
  top: 10%;
  left: 40%;
  box-shadow: 40px;
  
`
const Button = styled.button`
  float: right;
  margin: 40px;
  border-radius: 16px;
  padding: 10px 25px;
`
const Information = styled.div``
const InfoDiv = styled.h2 ``
const Image = styled.img``
const GET_USER = gql`
  query user($id: ID!){
    user(id: $id){
      id
      firstName
      lastName
      username
    }
  }
`;
type User = {
  id: Number;
  firstName: String;
  lastName: String;
  username: String
}
const Dashboard = () => {
  const history = useHistory();
  const [userInformation,setUserInformation] = useState<User>()
  const isAuthenticated = localStorage.getItem('token');
  
  const { loading, error, data: userData } = useQuery(GET_USER, {
    variables: {
      id: 2,
    },
    onCompleted: (response) => {
      setUserInformation(response.user)
    },
    
  });
  
  const handleSubmit = () => {
    localStorage.clear();
    history.push('/')
  }
  
  return (<>
  {isAuthenticated ? (
    <>
      <Button onClick={handleSubmit}>Logout</Button>      
       <UserInformation>
        {loading ? <InfoDiv>Data is Loading....</InfoDiv> : <>
        {userInformation ?
          <>
        <Image src={Profile}  width={300} height={300}/>
        <Information>
          <InfoDiv>Id : {userInformation && ` ${ userInformation.id}`}</InfoDiv>
          <InfoDiv>Name : {userInformation && ` ${ userInformation.firstName} ${userInformation.lastName}`}</InfoDiv>
          <InfoDiv>Username : {userInformation && ` ${userInformation.username}`}</InfoDiv>
        </Information> </>: <InfoDiv>Sorry....! No Such User Exists</InfoDiv> }
        </>}
      </UserInformation>
    </>
  ) 
  : 
  history.push('/')}
  </>
  )
}

export default Dashboard;
