import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Layout,
  Table,
  Divider,
  Tag,
  Button,
  Modal,
  Form,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Api from "../utils/Api";
import { Redirect } from "react-router-dom";
import Message from "../utils/Message";

const { Header, Footer, Content } = Layout;
const { Option } = Select;
const { confirm } = Modal;

const CollectionCreateForm = ({
  visible,
  onCreate,
  onCancel,
  users,
  ticketEdited,
}) => {
  //console.log(ticketEdited);
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Ticket"
      okText="Guardar"
      cancelText="Cancelar"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            //console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          userId: ticketEdited ? ticketEdited.user.id : undefined,
        }}
      >
        <Form.Item
          name="userId"
          label="Usuario"
          hasFeedback
          rules={[{ required: true, message: "Por favor elegir un usuario!" }]}
        >
          <Select>
            {users.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Admin = () => {
  const [tickets, setTickets] = useState([]);
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [ticketEdited, setTicketEdited] = useState(undefined);
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

      Api.get("ticket/list", configuration)
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

      Api.get("user/list-user", configuration)
        .then((response) => {
          //console.log(response);
          const arrayUsers = [];
          response.data.map((user) => {
            arrayUsers.push({
              id: user.id,
              name: user.name,
              username: user.username,
            });
            return true;
          });
          setUsers(arrayUsers);
        })
        .catch((error) => {
          //console.log(error);
        });
    }

    setReload(false);
  }, [reload]);

  const onCreate = (values) => {
    //console.log("Received values of form: ", values);
    //console.log(ticketEdited);
    let configuration = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    if (ticketEdited) {
      //Edit ticket
      Api.put(
        `ticket/update/${ticketEdited.id}`,
        {
          userId: values.userId,
        },
        configuration
      )
        .then((response) => {
          //console.log(response);
          Message.success("El ticket se ha actualizado exitosamente.");
        })
        .catch((error) => {
          //console.log(error);
          Message.error("Se ha producido un error, intente nuevamente.");
        });
      setVisible(false);
      setTicketEdited(undefined);
      setReload(true);
    } else {
      //Add new ticket
      Api.post(
        "ticket/create",
        {
          userId: values.userId,
        },
        configuration
      )
        .then((response) => {
          //console.log(response);
          Message.success("El ticket se ha creado exitosamente.");
        })
        .catch((error) => {
          //console.log(error);
          Message.error("Se ha producido un error, intente nuevamente.");
        });
      setVisible(false);
      setReload(true);
    }
  };

  const showDeleteConfirm = (id) => {
    //console.log(id);
    confirm({
      title: "¿Está seguro de eliminar el ticket?",
      icon: <ExclamationCircleOutlined />,
      okText: "Si",
      okType: "danger",
      cancelText: "No",
      onOk() {
        let configuration = {
          headers: {
            token: localStorage.getItem("token"),
          },
        };
        Api.delete(`ticket/delete/${id}`, configuration)
          .then((response) => {
            //console.log(response);
            Message.success("Se ha eliminado el ticket exitosamente.");
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
      title: "Usuario asignado",
      dataIndex: "name",
      key: "name",
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
          <EditOutlined
            onClick={() => {
              setVisible(true);
              setTicketEdited(record.ticket);
            }}
          />
          <Divider type="vertical" />
          <DeleteOutlined onClick={() => showDeleteConfirm(record.ticket.id)} />
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
              lg={{ span: 12, offset: 6 }}
              md={{ span: 12, offset: 6 }}
              sm={{ span: 12, offset: 6 }}
              xs={{ span: 20, offset: 2 }}
            >
              <h3>Administración de tickets</h3>
            </Col>
          </Row>
          <Row>
            <Col
              lg={{ span: 12, offset: 6 }}
              md={{ span: 12, offset: 6 }}
              sm={{ span: 12, offset: 6 }}
              xs={{ span: 20, offset: 2 }}
            >
              <Button
                type="primary"
                onClick={() => {
                  setVisible(true);
                }}
                style={{ float: "right" }}
              >
                Nuevo ticket
              </Button>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col
              lg={{ span: 12, offset: 6 }}
              md={{ span: 12, offset: 6 }}
              sm={{ span: 12, offset: 6 }}
              xs={{ span: 20, offset: 2 }}
            >
              <Table columns={columns} dataSource={tickets} />
            </Col>
          </Row>
          <CollectionCreateForm
            key={ticketEdited ? ticketEdited.user.id : 1}
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
              setTicketEdited(undefined);
            }}
            users={users}
            ticketEdited={ticketEdited}
          />
        </Content>
        <Footer style={{ textAlign: "center" }}>2020</Footer>
      </Layout>
    </>
  );
};

export default Admin;
