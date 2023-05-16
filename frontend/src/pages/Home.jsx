import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [products, setProducts] = useState(null);
  const [validate, setValidate] = useState(true);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // sendFile();
  };

  const handleUpload = async () => {
    // Aqui você pode fazer o upload do arquivo ou executar outras ações com o arquivo selecionado
    if (selectedFile) {
      console.log('Arquivo selecionado:', selectedFile);
      // Exemplo de envio do arquivo usando o objeto FormData e uma requisição AJAX
      const formData = new FormData();
      formData.append('file', selectedFile);
      // Faça a requisição AJAX com a biblioteca ou método de sua escolha
      // Exemplo com a biblioteca Axios: axios.post('/upload', formData);
      console.log('Arquivo selecionado:', formData);
      console.log('selected file', selectedFile.File);
      formData.append('file', selectedFile.File);

      try {
        const response = await axios.post(
          'http://localhost:3001/products',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        // if ('message' in response) return setLoginWarning(response.data);
        // saveLocalStorage('user', response.data);
        console.log(response.data);
        setProducts(response.data);
        // setUser(JSON.parse(localStorage.getItem('user')));
        // Após cadastro o usuário faz login automático e é redirecionado
        // navigate('/customer/products');
      } catch (error) {
        // setLoginWarning(error.response.data);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    verifyProduct();
  }, [products]);

  const verifyProduct = () => {
    if (products !== null) {
      const verifyProduct = products.every(
        (product) => product.status === 'ok',
      );

      setValidate(!verifyProduct);
    }
  };

  const updateProducts = async () => {
    console.log('ok');
    const data = { products: products };
    try {
      const response = await axios.post(
        'http://localhost:3001/products/update',
        data,
      );
      // if ('message' in response) return setLoginWarning(response.data);
      // saveLocalStorage('user', response.data);
      console.log(response.data);
      // setProducts(response.data);
      // window.location.reload();
      // setUser(JSON.parse(localStorage.getItem('user')));
      // Após cadastro o usuário faz login automático e é redirecionado
      // navigate('/customer/products');
    } catch (error) {
      // setLoginWarning(error.response.data);
      console.log(error);
    }
  };

  return (
    <main>
      <h2>
        Carregue o arquivo e depois clique no botão validar para verificar as
        alterações
      </h2>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload}>VALIDAR</button>
      {products && (
        <>
          <table className='tabela'>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nome</th>
                <th>Preço Atual</th>
                <th>Novo Preço</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={
                    product.status === 'ok' ? 'status-ok' : 'status-invalid'
                  }
                >
                  <td>{product.code}</td>
                  {product.name ? <td>{product.name}</td> : <td> </td>}
                  <td>{product.current_price}</td>
                  <td>{product.new_price}</td>
                  <td>{product.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {validate ? (
            <p className='message-error'>
              Verifique o arquivo e as regras de atualização de valores.
            </p>
          ) : (
            <p>
              Todas as alterações seguem as regras. Clique no botão Atualizar
              para aplicá-las.
            </p>
          )}
        </>
      )}

      <button
        className='update-button'
        type='button'
        onClick={updateProducts}
        disabled={validate}
      >
        Atualizar
      </button>
    </main>
  );
}

export default Home;
