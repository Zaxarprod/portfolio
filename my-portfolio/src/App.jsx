import React from 'react';
import './App.css';
import { Layout } from 'antd';
import MyContent from './components/MyContainer/MyContainer'
import Name from "./components/Name/Name";

const { Header, Footer, Content } = Layout;

function App() {
  return (
      <Layout>
          <Header className={'header'}>
              <Name />
          </Header>
          <Content>
              <MyContent />
          </Content>
      </Layout>
  )
}

export default App
