import React, { useRef,useEffect, useState } from "react";
import clsx from "clsx";
import { Link, useNavigate  } from "react-router-dom";
import styles from "./Heading.module.css";
import { useDispatch } from "react-redux";
import { user } from "../../redux/action";



const Login = () => {
  const navigate = useNavigate();
  const [messageError, setmessageError] = useState('');
  var status = 0;
  const tokenString = localStorage.getItem('token');

  const username = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  
  const postData = (data) => {
    var ojData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    }
    fetch("http://127.0.0.1:5000/api/auth/login", ojData)
      .then(function(response) {
        status = response.status;
        console.log(status);
        console.log(response.status);
          return response.json();
      })
        
      .then(function(res) {
        if (res.token === tokenString) {
          dispatch(user(res.user))
          navigate('/')
        } else if (status === 200) {
          sessionStorage.setItem('token', JSON.stringify(res.token));
          dispatch(user(res.user))
          navigate('/')
        } else if (status === 400) {
          setmessageError('Email va mat khau k duoc de trong');
        } else if (status === 404 ) {
          setmessageError(res.errors.username)
        } else if (status === 401) {
          setmessageError(res.errors.password)
        } else {
          setmessageError('dang nhap k thanh cong')
        }
      })
  }

  const sendData = ()=> {
    var data = {
      username: username.current.value,
      password: password.current.value
    }
    username.current.value = '';
    password.current.value = '';
    setmessageError('')
    postData(data);
  }


  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.modal}>
          <div className={styles.modal__overlay}>
            <img
              src="/assets/Bg/login_background.png"
              alt="Back_ground"
              className={clsx(styles.authForm_bg)}
            />
          </div>
          <div className={styles.modal__body}>
            <div className={styles.modal__inner}>
              <div className={styles.authForm}>
                <div
                  className={clsx(
                    styles.authForm_wrapHeading,
                    "d-flex",
                    "justify-content-between"
                  )}
                >
                  <div className={clsx(styles.authForm_header)}>
                    <h3 className={styles.authForm_heading}>????ng nh???p</h3>
                    <span className={styles.authForm_switchBtn}>
                      Ch??o b???n quay tr??? l???i
                    </span>
                  </div>
                  <div className="">
                    <img
                      src="/assets/Item/logo_register.png"
                      alt="Logo_register"
                      className={styles.authForm_logo}
                    />
                  </div>
                </div>

                <div className={clsx(styles.authForm_form, "mt-3")}>
                    <div className={styles.authForm_Group}>
                      <input
                        type="text"
                        name="username"
                        className={clsx(styles.authForm_input)}
                        placeholder="Nh???p t??n ????ng nh???p c???a b???n"
                        required
                        ref={username}
                      />
                    </div>
                    <div className={clsx(styles.authForm_Group)}>
                      <input
                        type="password"
                        className={clsx(styles.authForm_input)}
                        placeholder="Nh???p m???t kh???u c???a b???n"
                        required
                        ref={password}
                      />
                    </div>
                    <div className={clsx(styles.error)}>{messageError}</div>
                    <div className={styles.authForm_Group}>
                      <button
                        className={clsx(
                          "btn",
                          "btn-secondary",
                          styles.btnRe,
                          styles.authForm_input
                        )}
                        onClick={sendData}
                      >
                        ????ng Nh???p
                      </button>
                    </div>
                </div>
                <div className={clsx(styles.authForm_aside)}>
                  <p className={styles.authForm_policyText}>
                    <a href="" className={styles.authForm_forgetPass}>
                      B???n qu??n m???t kh???u?
                    </a>
                  </p>
                </div>

                <div className={clsx(styles.authForm_aside)}>
                  <p className={styles.authForm_policyText}>
                    B???n ch??a c?? t??i kho???n ch??? t???t
                    <Link to="/login" className={styles.authForm_policyLink}>
                      ????ng K??
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
