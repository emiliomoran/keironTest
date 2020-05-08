import React, { useState, useEffect } from "react";
import { Row, Col, Layout, Table, Tag, Button, Modal } from "antd";
import { ExclamationCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import Api from "../utils/Api";
import { Redirect } from "react-router-dom";
import Message from "../utils/Message";

const { Header, Footer, Content } = Layout;
const { confirm } = Modal;

const User = () => {
  const [tickets, setTickets] = useState([]);
  const [reload, setReload] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setReload(true);
  };

  useEffect(() => {
    //Check if user is logged
    if (!localStorage.getItem("token")) {
      setRedirect(true);
    } else {
      let configuration = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };

      const userId = JSON.parse(localStorage.getItem("user")).id;
      //console.log(userId);

      Api.get(`ticket/list-user/${userId}`, configuration)
        .then((response) => {
          //console.log(response);
          const arrayTickets = [];
          response.data.map((ticket, index) => {
            arrayTickets.push({
              key: ticket.id,
              index: index + 1,
              name: ticket.user.name,
              request: ticket.request,
              user: ticket.user,
              ticket: ticket,
            });
            return true;
          });
          //console.log(arrayTickets);
          setTickets(arrayTickets);
        })
        .catch((error) => {
          //console.log(error);
        });
    }

    setReload(false);
  }, [reload]);

  const showConfirm = (id) => {
    //console.log(id);
    confirm({
      title: "¿Está seguro de pedir el ticket?",
      icon: <ExclamationCircleOutlined />,
      okText: "Aceptar",
      cancelText: "Cancelar",
      onOk() {
        let configuration = {
          headers: {
            token: localStorage.getItem("token"),
          },
        };

        Api.put(
          `ticket/update/${id}`,
          {
            request: "1",
          },
          configuration
        )
          .then((response) => {
            //console.log(response);
            Message.success("Se ha pedido el ticket exitosamente.");
            setReload(true);
          })
          .catch((error) => {
            //console.log(error);
            Message.error("Se ha producido un error, intente nuevamente.");
          });
      },
      onCancel() {
        //console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Estado",
      dataIndex: "request",
      key: "request",
      render: (text, record) => (
        <Tag color={record.request ? "green" : "red"}>
          {record.request ? "PEDIDO" : "NO PEDIDO"}
        </Tag>
      ),
    },
    {
      title: "Acción",
      key: "action",
      render: (text, record) => (
        <span>
          {record.request ? null : (
            <Button
              type="primary"
              onClick={() => showConfirm(record.ticket.id)}
            >
              Pedir ticket
            </Button>
          )}
        </span>
      ),
    },
  ];

  return (
    <>
      {redirect && <Redirect to="/" />}
      <Layout style={{ height: "100vh" }}>
        <Header>
          <div className="logo">
            <LogoutOutlined
              style={{ fontSize: 30, color: "white" }}
              onClick={logout}
            />
          </div>
        </Header>
        <Content>
          <br></br>
          <Row>
            <Col
              lg={{ span: 10, offset: 7 }}
              md={{ span: 10, offset: 7 }}
              sm={{ span: 10, offset: 7 }}
              xs={{ span: 20, offset: 2 }}
            >
              <h3>Listado de tickets</h3>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col
              lg={{ span: 10, offset: 7 }}
              md={{ span: 10, offset: 7 }}
              sm={{ span: 10, offset: 7 }}
              xs={{ span: 20, offset: 2 }}
            >
              <Table columns={columns} dataSource={tickets} />
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>2020</Footer>
      </Layout>
    </>
  );
};

export default User;
