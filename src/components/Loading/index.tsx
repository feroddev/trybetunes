import { Audio } from 'react-loader-spinner';
import './loading.css';

interface LoadingPage {
  colors: string,
}

export default function Loading({ colors = '#dfdfdf' }: LoadingPage) {
  return (
    <div className="loading">
      <h2 style={ { color: colors } }>Carregando...</h2>
      <Audio
        height="30"
        width="30"
        color={ colors }
        ariaLabel="audio-loading"
        wrapperStyle={ {} }
        wrapperClass="wrapper-class"
        visible
      />
    </div>
  );
}
