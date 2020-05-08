import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Card, Layout } from "antd";
import Api from "../utils/Api";
import { Redirect, Link } from "react-router-dom";
import Message from "../utils/Message";

const { Header, Footer, Content } = Layout;

const Login = () => {
  const [redirect, setRedirect] = useState(false);
  const [type, setType] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setIsLogged(true);
      setType(user.usertype.name);
    }
  }, []);

  const onFinish = (values) => {
    //console.log("Success:", values);
    Api.post("user/login", {
      username: values.username,
      password: values.password,
    })
      .then((response) => {
        //console.log(response);
        Message.success("Inicio de sesión exitoso.");
        localStorage.setItem("token", response.data.tokenReturn);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setRedirect(true);
        setType(response.data.user.usertype.name);
      })
      .catch((error) => {
        //console.log(error);
        Message.error("Credenciales incorrectas, intente nuevamente.");
      });
  };

  const onFinishFailed = (errorInfo) => {
    //console.log("Failed:", errorInfo);
  };

  return (
    <>
      {isLogged && type === "Administrador" ? (
        <Redirect to="/administrador" />
      ) : type === "Usuario" ? (
        <Redirect to="/usuario" />
      ) : (
        <Redirect to="/" />
      )}

      {redirect && type === "Administrador" ? (
        <Redirect to="/administrador" />
      ) : type === "Usuario" ? (
        <Redirect to="/usuario" />
      ) : (
        <Redirect to="/" />
      )}
      <Layout style={{ height: "100vh" }}>
        <Header></Header>
        <Content>
          <br></br>
          <Row align="middle">
            <Col
              lg={{ span: 6, offset: 9 }}
              md={{ span: 6, offset: 9 }}
              sm={{ span: 6, offset: 9 }}
              xs={{ span: 20, offset: 2 }}
              style={{ backgroundColor: "grey" }}
            >
              <Card title="Login">
                <Form
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item style={{ float: "right" }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
                <br></br>
                <br></br>
                <Row>
                  <Link to="/registro">Registrate aquí</Link>
                </Row>
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>2020</Footer>
      </Layout>
    </>
  );
};

export default Login;
