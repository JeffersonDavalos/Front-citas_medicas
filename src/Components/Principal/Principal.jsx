import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  PlusOutlined,
  CalendarOutlined,
  SearchOutlined
} from '@ant-design/icons';
import './Principal.css';

const { Header, Content, Sider } = Layout;

const Principal = () => {
  const [expanded, setExpanded] = useState(false);
  const [endpoint, setEndpoint] = useState('');

  useEffect(() => {
    // Aquí puedes realizar cualquier lógica para obtener el valor de `endpoint`
    // Por ejemplo, si `endpoint` viene de props, puedes inicializarlo de la siguiente manera:
    // setEndpoint(props.endpoint);
    setEndpoint('{{endpoint}}/api/clinic-history/');
    console.log('Valor del endpoint:', endpoint);
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={expanded ? 200 : 80}
        theme='dark'
        collapsible
        collapsed={!expanded}
        onCollapse={(collapsed) => setExpanded(!collapsed)}
        collapsedWidth={80}
      >
        <div className='logo' />
        <Menu theme='dark' mode='vertical'>
          <Menu.Item key='crearCita' icon={<PlusOutlined />}>
            <Link to='/crear-cita'>Crear una cita</Link>
          </Menu.Item>
          <Menu.Item key='calendario' icon={<CalendarOutlined />}>
            <Link to='/calendario'>Calendario</Link>
          </Menu.Item>
          <Menu.Item key='consultarCita' icon={<SearchOutlined />}>
            <Link to='/consultarCita'>Consultar una cita</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>
        Hola mundo
      </Content>
    </Layout>
  );
};

export default Principal;
