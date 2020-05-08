import React, { useState, useEffect } from "react";
import { Form, Input, Select, Row, Col, Button, Card, Layout } from "antd";
import Api from "../utils/Api";
import { Redirect, Link } from "react-router-dom";
import Message from "../utils/Message";

const { Header, Footer, Content } = Layout;

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const Registro = () => {
  const [form] = Form.useForm();
  const [userTypes, setUserTypes] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    Api.get("user-type/list")
      .then((response) => {
        //console.log(response);
        const arrayTypes = [];
        response.data.map((type) => {
          arrayTypes.push({
            value: type.id,
            text: type.name,
          });
          return true;
        });
        setUserTypes(arrayTypes);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);

  const onFinish = (values) => {
    //console.log("Received values of form: ", values);
    Api.post("user/create", values)
      .then((response) => {
        //console.log(response);
        Message.success("Se ha registrado con éxito.");
        setRedirect(true);
      })
      .catch((error) => {
        //console.log(error);
        Message.error("Se ha producido un error, intentelo nuevamente.");
      });
  };

  return (
    <>
      {redirect && <Redirect to="/" />}
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
              <Card title="Registro">
                <Form
                  {...formItemLayout}
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  initialValues={{
                    residence: ["zhejiang", "hangzhou", "xihu"],
                    prefix: "86",
                  }}
                  scrollToFirstError
                >
                  <Form.Item
                    name="usertypeId"
                    label="Tipo de usuario"
                    hasFeedback
                    rules={[
                      { required: true, message: "Por favor elegir un tipo!" },
                    ]}
                  >
                    <Select placeholder="Tipo de usuario">
                      {userTypes.map((type) => (
                        <Option key={type.value} value={type.value}>
                          {type.text}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="name"
                    label="Nombres"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese un nombre!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="username"
                    label="Usuario"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese un usuario!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Contraseña"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese una contraseña!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item style={{ float: "right" }}>
                    <Button type="primary" htmlType="submit">
                      Registrar
                    </Button>
                  </Form.Item>
                </Form>
                <br></br>
                <br></br>
                <Row>
                  <Link to="/">Volver a login</Link>
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

export default Registro;
