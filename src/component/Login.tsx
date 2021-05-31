
import styled from 'styled-components'
import { useState } from 'react'


export const LoginForm = styled.form `
  position: absolute;
  top: 40%;
  left: 30%;
  box-shadow: 40px;
  
`
const Heading = styled.h1 `
  margin-left: 65px;
`

const Label = styled.label `
padding:50px;
margin: 40px;
`

const EmailInput = styled.input `
margin: 10px 40px;
padding:10px;

`
const PasswordInput = styled.input `
margin: 10px;
padding:10px;

`
const SubmitButton = styled.input `
position: absolute;
background-color: lightskyblue;
padding:  10px 130px;
margin-top: 30px;
font-size: 16px;
border-radius: 10px;
left: 20%;
`
type LoginType = {
  email: String;
  password: String
}


const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form Submitted")
  }
  return (
  <LoginForm onSubmit={ (e) => handleSubmit(e)}>
    <Heading> Welcome to my Website</Heading>
    <Label>
      Email:
      <EmailInput className="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
    </Label>
    <br/>
    <Label>
      Password:
      <PasswordInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </Label>
    <br/>
    <SubmitButton type="submit" value="Login" />
    </LoginForm>
  )
}

export default Login