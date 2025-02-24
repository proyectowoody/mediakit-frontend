import logo from '../../../assets/img/logo.png';

function HomeAdmin() {

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full shadow-2xl shadow-gray-500/50 flex items-center justify-center">
        <img src={logo} alt="Logo" className="w-full h-full rounded-full object-cover" />
      </div>
    </div>
  );
}

export default HomeAdmin;
