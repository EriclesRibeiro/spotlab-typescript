import './index.css';
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { BsTwitter } from 'react-icons/bs'
import { FormEvent } from 'react';
import { v4 } from 'uuid';
import { useState } from 'react';

import useAuth from '../../hooks/useAuth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Notification from '../../components/Notification';

export default function SignIn() {
    
    //Criando notificação
    const [list, setList] = useState<unknown[]>([])
    const showToast = (event:Object) => {
        setList(list => [...list, event])
    }

    const { signIn } = useAuth()
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const _target = event.target as HTMLFormElement

        const user = {
            email: _target.email.value as string,
            password: _target.password.value as string
        }

        try {
            signIn(user)
        } catch (err) {
            console.log(err)
            showToast({
                id: v4(),
                type: 'error',
                message: 'Erro ao conectar com o servidor. Por favor, tente novamente mais tarde!'
            })
        }
    }
    return(
        <div className="signin_container">
        <Notification listNotifications = {list} setList={setList}/>
        <section>
            <div className="signin_form">
                <div className="sl_image">
                    <img src="./resources/svg/spotlab-logo.svg" alt="" />
                </div>
                <form onSubmit={ handleSubmit }>
                    <Input required id='email' label='Email' type='text' placeholder='Digite seu email'/>
                    <Input required id='password' label='Senha' type='password' placeholder='Digite sua senha'/>
                    <Button id='botao' type='submit'>Entrar</Button>
                </form>
                <div className="or_box">
                    <p className="signin_p">- ou entre com -</p>
                    <div className="signin_social_media">
                        <div className="box google"><FcGoogle /></div>
                        <div className="box facebook"><FaFacebookF /></div>
                        <div className="box twitter"><BsTwitter /></div>
                    </div>
                    <p className="signup_p">Não possui conta? <span><a href="/signup">Cadastre-se aqui!</a></span></p>
                </div>
            </div>
        </section>
    </div>
);
}