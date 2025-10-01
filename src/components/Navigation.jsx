import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Adjust path if needed
import { useAuth } from '../hooks/useAuth';

const Navigation = ({ lang }) => {
  const { user } = useAuth();

  if (lang === "english") {
    return (
      <>
        <li><Link to="/engHome" className="normal-link">Home</Link></li>
        {user ? (
          <>
            <li><Link to="/dashboard" className="normal-link">Dashboard</Link></li>
            <li><button className='normal-link' onClick={() => auth.signOut()}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="normal-link">Login</Link></li>
            <li><Link to="/signup" className="normal-link">Sign Up</Link></li>
          </>
        )}
        <li><Link to="/feedback" className="normal-link">Feedback</Link></li>
        <li><Link to="/about" className="normal-link">About</Link></li>
      </>
    )
  } else if (lang === "amharic") {
    return (<>
      <li><Link to="/amHome" className='normal-link'>ቤት</Link></li>
      {user ? (
        <>
          <li><Link to="/dashboard" className="normal-link">ዳሽቦርድ</Link></li>
          <li><button className='normal-link' onClick={() => auth.signOut()}>መውጣት</button></li>
        </>
      ) : (
        <>
          <li><Link to="/login" className="normal-link">መግባት</Link></li>
          <li><Link to="/signup" className="normal-link">መመዝገብ</Link></li>
        </>
      )}
      <li><Link to="/feedback" className="normal-link">አስተያየት</Link></li>
      <li><Link to="/about" className="normal-link">ስለ</Link></li>
    </>);
  } else if (lang === "oromo") {
    return (
      <>
        <li><Link to="/ormoHome" className='normal-link'>Mana</Link></li>
        {user ? (
          <>
            <li><Link to="/dashboard" className="normal-link">Daashboordii</Link></li>
            <li><button className='normal-link' onClick={() => auth.signOut()}>Ba&apos;u</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="normal-link">Seenu</Link></li>
            <li><Link to="/signup" className="normal-link">Galmaa&apos;u</Link></li>
          </>
        )}
        <li><Link to="/feedback" className="normal-link">Yaada Kennuu</Link></li>
        <li><Link to="/about" className="normal-link">Waa&apos;ee</Link></li>
      </>
    )
  }
  return null;
};

Navigation.propTypes = {
  lang: PropTypes.string.isRequired,
};

export default Navigation;