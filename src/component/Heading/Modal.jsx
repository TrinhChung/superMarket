import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Heading.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { user } from "../../redux/action";


const Modal = () => {
  const [message,setmessageError] = useState('');
  var status = 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const phone = useRef(null);
  const password1 = useRef(null);
  const password2 = useRef(null);
  const username = useRef(null);

  const sendData = ()=> {
    var data = {
      email: email.current.value,
      username: username.current.value,
      password: password1.current.value,
      passwordConfirm: password2.current.value,
      sdt: phone.current.value,
    }
    username.current.value = '';
    password1.current.value = '';
    password2.current.value = '';
    phone.current.value = '';
    email.current.value = '';
    setmessageError('')
    postData(data);
  }

  const postData = (data) => {
    var ojData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    }
    fetch("http://127.0.0.1:5000/api/auth/register", ojData)
      .then(function(response) {
        status = response.status;
          return response.json();
      })
        
      .then(function(res) {
        console.log(status)
        console.log(res.user)
        console.log(res.errors)
        if (status === 201) {
          dispatch(user(res))
          navigate('/userInfor')
        } else {
          if (res.errors.email) {
            setmessageError(res.errors.email);
          } else if (res.errors.sdt) {
            console.log('sdt')
            setmessageError(res.errors.sdt);
          } else if (res.errors.username) {
            console.log('username')
            setmessageError(res.errors.username);
          } else if (res.errors.password) {
            console.log('password')
            setmessageError(res.errors.password);
          } else {
            setmessageError("????ng k?? kh??ng th??nh c??ng")
          }
        }
      })
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
                    <h3 className={styles.authForm_heading}>????ng k??</h3>
                    <span className={styles.authForm_switchBtn}>
                      T???o t??i kho???n Ch??? T???t ngay
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
                      className={styles.authForm_input}
                      placeholder="Email c???a b???n"
                      ref={email}
                    />
                    <p className={clsx(styles.authForm_ReStart)}>*</p>
                  </div>
                  <div className={styles.authForm_Group}>
                    <input
                      type="text"
                      className={styles.authForm_input}
                      placeholder="S??? ??i???n tho???i cua ban"
                      ref={phone}
                    />
                    <p className={clsx(styles.authForm_ReStart)}>*</p>
                  </div>
                  <div className={styles.authForm_Group}>
                    <input
                      type="text"
                      className={styles.authForm_input}
                      placeholder="T??n ????ng nh???p c???a b???n"
                      ref={username}
                    />
                    <p className={clsx(styles.authForm_ReStart)}>*</p>
                  </div>
                  <div className={clsx(styles.authForm_Group)}>
                    <input
                      type="password"
                      className={styles.authForm_input}
                      placeholder="M???t kh???u c???a b???n"
                      ref={password1}
                    />
                    <p className={clsx(styles.authForm_ReStart)}>*</p>
                  </div>
                  <div className={styles.authForm_Group}>
                    <input
                      type="password"
                      className={styles.authForm_input}
                      placeholder="Nh???p l???i m???t kh???u c???a b???n"
                      ref={password2}
                    />
                    <p className={clsx(styles.authForm_ReStart)}>*</p>
                  </div>
                  <div className={styles.error}>{message}</div>
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
                      Dang ky
                    </button>
                  </div>
                </div>
                <div className={clsx(styles.authForm_aside)}>
                  <p className={styles.authForm_policyText}>
                    B???ng vi???c ????ng k??, b???n ???? ?????ng ?? v???i Ch??? t???t v???
                    <a href="" className={styles.authForm_policyLink}>
                      ??i???u kho???n d???ch v???
                    </a>{" "}
                    va
                    <a href="" className={styles.authForm_policyLink}>
                      {" "}
                      Ch??nh s??ch b???o m???t
                    </a>
                  </p>
                </div>

                <div className={clsx(styles.authForm_aside)}>
                  <p className={styles.authForm_textLogin}>
                    B???n ???? c?? t??i kho???n ch??? t???t?
                    <Link to="/sigin" className={styles.authForm_policyLink}>
                      ????ng nh???p
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

export default Modal;
