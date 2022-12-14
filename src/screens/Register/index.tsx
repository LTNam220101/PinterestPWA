import React, { useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "components/LogoHeader/index";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "./actions";
import { State } from "redux-saga/reducers";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  repass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  displayName: yup.string().required()
});

export interface RegisterForm {
  username: string;
  password: string;
  repass: string;
  displayName: string;
  avatarUrl: string;
}

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerResult = useSelector((state: State) => state.registerResult);

  useEffect(() => {
    if (registerResult && registerResult.success) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  }, [registerResult]);

  const handleSubmit = (values: RegisterForm) => {
    dispatch(register(values));
  };
  return (
    <div className="register">
      <Header />
      <Formik
        validationSchema={schema}
        initialValues={{
          username: "",
          password: "",
          repass: "",
          displayName: "",
          avatarUrl:
            "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
        }}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid
        }) => (
          <form className="form" onSubmit={handleSubmit}>
            <input
              name="displayName"
              type="text"
              onChange={handleChange("displayName")}
              onBlur={handleBlur("displayName")}
              value={values.displayName}
              placeholder="H??? t??n"
              className={`input ${errors.displayName && "error"}`}
            />
            {errors.displayName && (
              <div className="feedback">H??y nh???p h??? t??n c???a b???n.</div>
            )}
            <input
              name="username"
              type="username"
              onChange={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              placeholder="T??n ????ng nh???p"
              className={`input ${errors.username && "error"}`}
            />
            {errors.username && (
              <div className="feedback">H??y nh???p t??n ????ng nh???p c???a b???n.</div>
            )}
            <input
              type="password"
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              name="password"
              placeholder="M???t kh???u"
              className={`input ${errors.password && "error"}`}
            />
            {errors.password && (
              <div className="feedback">H??y ??i???n m???t kh???u c???a b???n</div>
            )}
            <input
              type="password"
              onChange={handleChange("repass")}
              onBlur={handleBlur("repass")}
              value={values.repass}
              name="repass"
              placeholder="X??c nh???n m???t kh???u"
              className={`input ${errors.repass && "error"}`}
            />
            {errors.repass && (
              <div className="feedback">M???t kh???u kh??ng tr??ng kh???p</div>
            )}
            <button
              type="submit"
              className={`button ${isValid && "valid"}`}
              disabled={!isValid}
            >
              ????ng k??
            </button>
          </form>
        )}
      </Formik>
      <div className="register">
        <div>
          ???? c?? T??i kho???n?{" "}
          <Link className="link" to="/login">
            ????ng nh???p
          </Link>
        </div>
      </div>
      <div className="policy">
        B???ng c??ch ti???p t???c, b???n ?????ng ?? v???i{" "}
        <a
          className="link"
          href="https://policy.pinterest.com/vi/terms-of-service"
        >
          ??i???u kho???n d???ch v???
        </a>{" "}
        c???a Pinterest v?? x??c nh???n r???ng b???n ???? ?????c{" "}
        <div>
          <a
            className="link"
            href="/https://policy.pinterest.com/vi/privacy-policy"
          >
            Ch??nh s??ch Quy???n ri??ng t??
          </a>{" "}
          c???a ch??ng t??i
        </div>
      </div>
    </div>
  );
};

export default Register;
