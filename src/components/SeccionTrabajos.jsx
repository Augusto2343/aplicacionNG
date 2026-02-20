import { useEffect,useState } from "react";
import Swal from "sweetalert2";
import TrabajoTarjeta from "./TrabajoTarjeta";
const SeccionTrabajos = () =>{
    //Inicialización de variables
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const emailPers = import.meta.env.VITE_EMAIL
    const [datosPersonales, setDatosPersonales] = useState();
    const [trabajos,setTrabajos] = useState();

    //Obtiene mis datos personales utilizando mi correo
    const obtenerDatosPers =  async() =>{
        try {
            const response = await fetch(`${baseUrl}/api/candidate/get-by-email?email=${emailPers}`)
            
            if(!response.ok){
                const responseData = await response.json();
                return Swal.fire({
                    "icon":"error",
                    "title":responseData.error
                })
            }
            else{
                const responseData = await response.json();
               

                return responseData;
                
            }
        } catch (error) {
            console.error(error);
        }

        
    }
    //Consulta en la API que trabajos hay
    const obtenerPuestosDispon = async() =>{
        try {
            const response = await fetch(`${baseUrl}/api/jobs/get-list`);
            if(!response.ok){
                const responseData = await response.json();
                alert(responseData.error);
            }
            else{
                const responseData = await response.json();
               
                
                return responseData;   
            } 
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() =>{
            //Obtención y carga de datos en las variables
            const cargarDatos = async() =>{
                let datos = await obtenerDatosPers()
                let trabajosAPi = await obtenerPuestosDispon()
                setDatosPersonales(datos);
                setTrabajos(trabajosAPi)
            }
            cargarDatos()
    },[])

    return(
        <>
            <h1 className="text-gray-200 text-5xl text-center mt-10">Trabajos</h1>
            <hr className="text-gray-300 mt-4" />
            <section className="trabajoCartas grid  gap-3 mt-6">
                {
                    trabajos?.map((trabajo,index) =>(
                        <TrabajoTarjeta key={index} trabajo={trabajo} datosPersonales={datosPersonales}/>
                    ))
                }
            </section>
        </>
    )
}
export default SeccionTrabajos