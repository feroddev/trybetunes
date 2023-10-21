import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../Loading';
import './profileEdit.css';
import UserContext from '../../context/UserContext';

const imageDefault = '/user.png';
const initialState = {
  name: '',
  email: '',
  image: '',
  description: '',
};

export default function ProfileEdit() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserType>(initialState);
  const [inputInfo, setInputInfo] = useState(initialState);
  const { setUser, user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setInputInfo({
      ...inputInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setUser(inputInfo)
    await updateUser(inputInfo);
    navigate('/profile');
    setLoading(false);
  };

  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      // const userLocalStorage = await getUser();
      setLoading(false);
      setUserInfo(user);
      setInputInfo(user);
    };
    getInfo();
  }, []);

  const verify = () => {
    const { name, email, image, description } = inputInfo;
    return (name.length > 0 && email.length > 0 && image.length > 0
      && description.length > 3 && /\S+@\S+\.\S+/.test(email));
  };

  return (
    <div className="profile-edit-container">
      {loading && <Loading colors="#bebebe" />}
      {!loading && userInfo && (
        <form onSubmit={ (event) => handleSubmit(event) }>
          <div>

            <img
              src={ userInfo.image !== '' ? userInfo.image : imageDefault }
              alt="profile"
              data-testid="profile-image"
            />
          </div>
          <input
            type="text"
            name="image"
            value={ inputInfo.image }
            placeholder="Insira o link para sua imagem"
            onChange={ (event) => handleChange(event) }
            data-testid="edit-input-image"
          />
          <p className="infos">Nome</p>
          <span>Fique a vontade para colocar o nome que você quiser</span>
          <input
            type="text"
            name="name"
            value={ inputInfo.name }
            placeholder="Insira seu nome"
            onChange={ (event) => handleChange(event) }
            data-testid="edit-input-name"
          />
          <p className="infos">E-mail</p>
          <span>Coloque seu melhor e-mail</span>
          <input
            type="email"
            name="email"
            data-testid="edit-input-email"
            value={ inputInfo.email }
            placeholder="usuario@email.com"
            onChange={ (event) => handleChange(event) }
          />
          <p className="infos">Descrição</p>
          <textarea
            name="description"
            data-testid="edit-input-description"
            value={ inputInfo.description }
            onChange={ (event) => handleChange(event) }
            cols={ 30 }
            rows={ 10 }
            placeholder="Sobre mim"
          />
          <button
            type="submit"
            data-testid="edit-button-save"
            disabled={ !verify() }
          >
            Salvar
          </button>
        </form>
      )}
    </div>
  );
}
