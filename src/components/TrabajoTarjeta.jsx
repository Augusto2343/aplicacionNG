import { useState } from "react";
import Swal from "sweetalert2";
const TrabajoTarjeta = ({trabajo,datosPersonales}) =>{
    //Inicialización de variables
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [repoUrl, setRepoUrl] = useState();
    const trabajoId = trabajo.id;

    //Función de postulación
    const postularme = async(e) =>{
        try {
            e.preventDefault();
            Swal.fire({
                title:"Enviando...",
                
            })
            const datosPostulacion={
                uuid:datosPersonales.uuid,
                jobId:trabajoId,
                candidateId:datosPersonales.candidateId,
                repoUrl:repoUrl,
                applicationId:datosPersonales.applicationId
            }
            
            const response = await fetch(`${baseUrl}/api/candidate/apply-to-job`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(datosPostulacion,"utf-8")
            })

            if(!response.ok){
                const responseData = await response.json();
                
                Swal.fire({
                    "icon":"error",
                    "title":responseData.error
                })
            }
            else{
                const responseData = await response.json();
                Swal.fire({
                    "icon":"success",
                    "title":"¡Postulación enviada!"
                })
                
            } 
        } catch (error) {
            console.error(error);
        }
    }
    //Función handler que toma el valor y lo guarda en la variable repoUrl
    const urlHandler = (e) =>{
        setRepoUrl(e.target.value);        
    }

    return(
        <>
        <div className="gap-5 flex flex-col relative p-4 items-center">
            <h4 className=" idTrabajo absolute  text-gray-400">id: {trabajo.id}</h4>
            <h2 className="text-gray-200 mt-6   ">{trabajo.title}</h2>
            <form onSubmit={postularme}  className="gap-2 flex flex-col items-center">
                <input onInput={urlHandler} placeholder="URL de tu repositorio Github" className="min-w-60 text-center text-gray-400" type="text" required/>
                <button type="submit" >Submit</button>
            </form>
        </div>
        </>
    )
}
export default TrabajoTarjeta;