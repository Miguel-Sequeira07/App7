import { NavLink, Outlet, useNavigate } from "react-router-dom"
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import logo from "../assets/react.svg"
import { useEffect, useRef, useState } from "react";


const Menu = () => {
    const navegador = useNavigate();
    const [open, setOpen]  = useState(false);
    const myref = useRef<HTMLUListElement>(null)
    const hanleMenu = () => {
        setOpen(!open);
    }

    useEffect(() => {
        const ocultaMenuFora = (evt:MouseEvent) => {
            if(myref && !myref?.current?.contains(evt.target as Node))setOpen(false);
        };
        document.addEventListener('mousedown', ocultaMenuFora);
        return () => {document.removeEventListener('mousedown', ocultaMenuFora)};
    }, []);

    const items=[
        "Dobro",
        "Selos",
        "Primos",
        "Inverter Algarismos",
    ];
  return (
    <div className="container">
        <div className="row">
            <div className="col-1">
                <img src={logo} alt="logo" style={{width: "50px"}} onClick={()=> navegador("/")}/>
            </div>
            <div className="col-11">
                <ul id="menu">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/animais">Animais</NavLink>
                    <NavLink to="#">Hooks</NavLink>
                    <li className="dropdown">
                        <button onClick={hanleMenu}>Exercicios</button>
                        {open && (
                            <ul id="submenu" ref={myref}>
                                {items.map((v,i) => {
                                    return (<NavLink to={`/exercicios/${i+1}`} key={i + 1} className="lista">{v}</NavLink>);
                                })}
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>

        <div className="row">
            <div className="col-12">
                <h1 style={{
                    textAlign:"center", 
                    color: "navy", 
                    fontSize: "1.4em"
                    }}
                >Aplicação em React</h1>
                <hr/>
                <Outlet/>
            </div>

        </div>
    </div>
  )
}

export default Menu
