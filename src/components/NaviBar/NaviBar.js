import React from 'react';
import {NaviBarWay} from '../../styles/navbar-styles';
import { Link} from "react-router-dom";
const NaviBarTopo = ()=>{
    return (
       
       <NaviBarWay>
           <span></span>
            <ul>
                <li className="menu">
                    <Link to={'/frete-gratis'}>Frete Grátis</Link>
                </li>
                <li className="menu">
                    <Link to={'/nacional'}>Nacionais</Link>
                </li>
                <li className="menu">
                    <Link to={'/importado'}>Importados</Link>
                </li>
                {/* <li className="picle">|</li>
                <li className="menu">Nacionais</li>
                <li className="picle">|</li>
                <li className="menu">Importados</li> */}
          </ul>
          <div>
                <span><Link to={'/login'}>Login</Link></span>
                <span>|</span>
                <span><Link to={'/cadastro'}>Cadastro</Link></span>
                
          </div>
          
        </NaviBarWay>

    );

}
export default NaviBarTopo;
