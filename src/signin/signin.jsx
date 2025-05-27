import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import "./signin.css"

function SignIn(){
    const { isLogin, toggleAuthMode } = useAuth();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpf: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    return(
        <div className='login'>
            <div className='login-form'>
                <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            required
                            placeholder="000.000.000-00"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">{isLogin ? 'Entrar' : 'Cadastrar'}</button>
                    <p className="toggle-auth">
                        {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                        <button type="button" onClick={toggleAuthMode} className="link-button">
                            {isLogin ? 'Cadastre-se' : 'Faça login'}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignIn