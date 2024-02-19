import React, { useState } from 'react';
import { Layout, Menu, Select, Form, Row, Col, Input, Button, message } from 'antd';
import { Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import { PlusOutlined, CalendarOutlined, SaveOutlined,SearchOutlined  } from '@ant-design/icons';
import './Principal.css';

const { Header, Content, Sider } = Layout;
const { Option } = Select;

const Crear_cita = () => {
  const [expanded, setExpanded] = useState(false);
  const [tipoDocumento, setTipoDocumento] = useState('cedula');
  const [documento, setDocumento] = useState('');

  const handlePeriodChange = (value) => {
    console.log("Período seleccionado:", value);
  };

  const handleInsertarClick = () => {
    // Validación de cédula o RUC
    if (tipoDocumento === 'cedula') {
      if (!validarCedula(documento)) {
        message.error('La cédula ingresada no es válida');
        return;
      }
    } else {
      if (!validarRUC(documento)) {
        message.error('El RUC ingresado no es válido');
        return;
      }
    }
    
    // Si pasa la validación, continuar con la lógica de inserción o cualquier otra acción
    message.success('Datos insertados correctamente');
  };

  const validarCedula = (cedula) => {
    // Verificar la longitud
    if (cedula.length !== 10) {
      return false;
    }
  
    // Verificar que todos los caracteres sean dígitos
    if (!/^\d+$/.test(cedula)) {
      return false;
    }
  
    // Verificar que no todos los dígitos sean iguales
    if (/^(\d)\1+$/.test(cedula)) {
      return false;
    }
  
    // Aplicar el algoritmo de Módulo 10 para verificar los dígitos verificadores
    const digitos = cedula.split('').map(Number);
    const verificador = digitos.pop();
    const suma = digitos.reduce((acc, curr, idx) => {
      const temp = curr * ((idx % 2 === 0) ? 2 : 1);
      return acc + (temp > 9 ? temp - 9 : temp);
    }, 0);
  
    const residuo = suma % 10;
    const resultado = residuo === 0 ? 0 : 10 - residuo;
  
    return resultado === verificador;
  };
  
  const validarRUC = (ruc) => {
    // Implementa aquí la lógica de validación de RUC
    // Retorna true si es válido, false si no lo es
    return true; // Ejemplo: siempre retorna true para fines de demostración
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
          <Menu.Item key='consultarCita'icon={<SearchOutlined />}>
            <Link to='/consultarCita'>Consultar una cita</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <div style={{ display: "flex", flexDirection: "column", padding: '16px' }}>
            <Form layout="vertical">
              <h2 className="text-left font-medium mb-3">Ingrese datos paciente</h2>
              <Card>
                <div style={{ padding: '16px' }}>
                  <Row gutter={16}>
                    <Col md={8} lg={6}>
                      <Form.Item label="Periodo:">
                        <Select
                          allowClear
                          placeholder="SELECCIONE PERIODO"
                          onChange={(value) => handlePeriodChange(value)}
                        >
                          <Option value="diario">Diario</Option>
                          <Option value="semanal">Semanal</Option>
                          <Option value="mensual">Mensual</Option>
                          <Option value="anual">Anual</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="Cédula / RUC:"
                        name="cedulaRUC"
                        rules={[
                          { required: true, message: 'Seleccione un tipo de documento' }
                        ]}
                      >
                        <Input.Group compact>
                          <Select 
                            defaultValue="cedula" 
                            style={{ width: '30%' }}
                            onChange={(value) => setTipoDocumento(value)}
                          >
                            <Option value="cedula">Cédula</Option>
                            <Option value="ruc">RUC</Option>
                          </Select>
                          <Input 
                            style={{ width: '70%' }} 
                            placeholder={tipoDocumento === 'cedula' ? 'Ingrese su cédula' : 'Ingrese su RUC'}
                            maxLength={tipoDocumento === 'cedula' ? 10 : 13}
                            onChange={(e) => setDocumento(e.target.value)}
                            onKeyPress={(e) => {
                              // Permite solo números si es cédula
                              if (tipoDocumento === 'cedula') {
                                const regex = new RegExp('^[0-9]+$');
                                const key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                                if (!regex.test(key)) {
                                  e.preventDefault();
                                  return false;
                                }
                              }
                            }}
                          />
                        </Input.Group>
                      </Form.Item>
                      <Form.Item
                        label="Nombre:"
                        name="nombre"
                        rules={[{ required: true, message: 'Ingrese su nombre' }]}
                      >
                        <Input placeholder="Ingrese su nombre" />
                      </Form.Item>
                      <Form.Item
                        label="Apellido:"
                        name="apellido"
                        rules={[{ required: true, message: 'Ingrese su apellido' }]}
                      >
                        <Input placeholder="Ingrese su apellido" />
                      </Form.Item>
                      <Form.Item
                        label="Número de Celular:"
                        name="celular"
                        rules={[
                          { required: true, message: 'Ingrese su número de celular' },
                          { pattern: /^[0-9]+$/, message: 'Ingrese solo números' },
                          { len: 10, message: 'El número de celular debe tener 10 dígitos' }
                        ]}
                      >
                        <Input placeholder="Ingrese su número de celular" />
                      </Form.Item>
                      <Form.Item
                        label="Correo Electrónico:"
                        name="correo"
                        rules={[
                          { required: true, message: 'Ingrese su correo electrónico' },
                          { type: 'email', message: 'Ingrese un correo electrónico válido' }
                        ]}
                      >
                        <Input placeholder="Ingrese su correo electrónico" />
                      </Form.Item>
                      <Form.Item
                        label="Observaciones de Síntomas:"
                        name="observaciones"
                        rules={[{ required: true, message: 'Ingrese observaciones de síntomas' }]}
                      >
                        <Input.TextArea rows={4} placeholder="Ingrese observaciones de síntomas" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="end">
                    <Col>
                      <Button
                        className="ml-2"
                        htmlType="submit"
                        style={{ backgroundColor: 'blue', borderColor: 'blue', color: 'white', marginTop: '32px' }}
                        onClick={handleInsertarClick}
                      >
                        <SaveOutlined />
                        Insertar
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Crear_cita;