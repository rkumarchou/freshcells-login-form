
import styled from 'styled-components'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { LOGIN } from '../query/query'
import { useMutation } from '@apollo/client'
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';

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

const displaySuccess = (message: string) => {
  notification.success({
    message: message,
    description: '',
  });
};

const displayError = (message: string) => {
  notification.error({
    message: message,
    description: '',
  });
};


const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { t, i18n } = useTranslation();

  const [login, { data }] = useMutation(LOGIN, {
    onCompleted: (response) => {
      localStorage.setItem('token', response.login.jwt)
      displaySuccess(t('message.loginSuccess'))
      history.push('/dashboard')      
    },
    onError(err) { 
      displayError(t('message.error'))
    },    
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      variables: {
        input: {
          identifier: email,
          password: password
        }
      }
    })

  }
  return (
  <LoginForm onSubmit={ (e) => handleSubmit(e)}>
    <Heading>{t('login.welcome')}</Heading>
    <Label>
      {t('login.email')}
      <EmailInput className="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
    </Label>
    <br/>
    <Label>
      {t('login.password')}
      <PasswordInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </Label>
    <br/>
    <SubmitButton type="submit" value="Login" />
    </LoginForm>
  )
}

export default Login
