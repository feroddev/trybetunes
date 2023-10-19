import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
import { UserType } from '../../types';
import './profile.css';
import UserContext from '../../context/UserContext';

const imageDefault = '/src/images/user.png';

export default function Profile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<UserType>();
  const {user} = useContext(UserContext);

  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      // const user = await getUser();
      setUsername(user);
      setLoading(false);
    };
    getInfo();
  }, []);

  return (
    <div className="profile-container">
      {loading && <Loading colors="#c7c7c7" />}
      {!loading && username && (
        <div className="card-profile">
          <div className="image-button">
            <img
              src={ username.image !== '' ? username.image : imageDefault }
              alt="profile"
              data-testid="profile-image"
            />
          </div>
          <div className="info-profile">
            <p className="infos">Nome</p>
            <p className="input-infos">{username.name}</p>
            <p className="infos">E-mail</p>
            <p
              className="input-infos"
            >
              {username.email === '' ? 'Não informado' : username.email}
            </p>
            <p className="infos">Descrição</p>
            <p
              className="input-infos"
            >
              {username.description === '' ? 'Não informado' : username.description}
            </p>
          </div>
          <Link to="/profile/edit">
            Editar perfil
          </Link>
        </div>
      )}
    </div>
  );
}
