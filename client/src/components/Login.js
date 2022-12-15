import { useEffect, useState } from 'react';
import '../styles/login.css'
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/authActions'

function Login(props) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errmsg, setErrmsg] = useState(null)
    const { msg } = useSelector((state) => state.error)

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(email)
        console.log(password)
        if(!email || !password){
            setErrmsg('Please enter all fields.')
            return
        }
        const user = {
            email,
            password
        }
        dispatch(login(user))
    }

    useEffect(() => {
        setErrmsg(msg.msg)
    },[msg])

    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-sm-6 text-black">
                        <br/>

                        <div className="px-5 ms-xl-4">
                        {/* <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" d={{color: "#709085"}}></i> */}
                        <img src="jmilogo.png" style={{width: "10%", marginBottom: "25px"}}/>
                        <span className="h1 fw-bold mb-0"> JamiaBook Admin</span>
                        </div>
                        
                        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                        
                        <form d={{width: "23rem"}} onSubmit={onSubmit}>
                            {errmsg &&
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {errmsg}
                                <button 
                                    type="button" 
                                    className="close" 
                                    data-dismiss="alert" 
                                    aria-label="Close"
                                    onClick={() => setErrmsg(null)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            }

                            <h3 className="fw-normal mb-3 pb-3" d={{letterSpacing: "1px"}}>Log In</h3>

                            <div className="form-outline mb-4">
                            <input 
                                type="email" 
                                id="form2Example18" 
                                className="form-control form-control-lg" 
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <label className="form-label" htmlFor="form2Example18">Email address</label>
                            </div>

                            <div className="form-outline mb-4">
                            <input 
                                type="password" 
                                id="form2Example28" 
                                className="form-control form-control-lg" 
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <label className="form-label" htmlFor="form2Example28">Password</label>
                            </div>

                            <div className="pt-1 mb-4">
                            <button className="btn btn-info btn-lg btn-block" type="submit">Login</button>
                            </div>

                            {/* <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
                            <p>Don't have an account? <a href="#!" className="link-info">Register here</a></p> */}

                        </form>

                        </div>

                    </div>
                    <div className="col-sm-6 px-0 d-none d-sm-block">
                        <img src="bglogo.jpg" alt="Login image" className="w-100 vh-100" d={{objectFit: "cover", objectPosition: "left"}}/>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;