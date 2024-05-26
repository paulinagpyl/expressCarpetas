import fs from "fs";
import path from "path";

const getHtml = (req, res) => {
  const filePath = path.resolve("index.html");
  res.sendFile(filePath);
};

// mostrando
const getCanciones = (req, res) => {
  const canciones = JSON.parse( fs.readFileSync("./src/data/repertorio.json", "utf-8") );
  res.json(canciones);
};

//agregando
const agregarCanciones = (req, res) => {
  try{
    const {id,titulo,artista,tono} = req.body
    const nva_cancion = {id,titulo,artista,tono}
    const canciones = JSON.parse(fs.readFileSync('./repertorio.json','utf-8'))
    if (!nva_cancion.titulo || !nva_cancion.artista || !nva_cancion.tono || !nva_cancion.titulo){
        return res.status(401).json({message:'Falta llenar algún dato para ingresar la canción'})
        //return console.log('Falta llenar algún dato para ingresar la canción')
    }
    const existe = canciones.some((cancion) => cancion.id ==nva_cancion.id)
    if (existe){
        console.log('ya existe lo que quiere ingresar')
    }
    canciones.push(nva_cancion)
    fs.writeFileSync('./repertorio.json',JSON.stringify(canciones))
    res.send("Datos guardados")
} catch(error) {
    console.log('error', error)
}

}

//eliminando
const deleteCanciones = (req, res) => {
  try {
    const { id } = req.params;
    const canciones = JSON.parse(
      fs.readFileSync("./src/data/repertorio.json", "utf-8")
    );
    const index = canciones.findIndex((p) => p.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync("./src/data/repertorio.json", JSON.stringify(canciones));
    res.send("Canción eliminada");
  } catch (error) {
    console.log("error", error);
  }
};

//actualizando
const updateCanciones = (req, res) => {
  try {
    const { id } = req.params;
    const cancion = req.body;
    const canciones = JSON.parse(
      fs.readFileSync("./src/data/repertorio.json", "utf-8")
    );
    const index = canciones.findIndex((p) => p.id == id);
    console.log(cancion);
    canciones[index] = cancion;
    fs.writeFileSync("./src/data/repertorio.json", JSON.stringify(canciones));
    res.send("Canción modificada exitosamente");
  } catch (error) {
    console.log("error", error);
  }
};

export { getHtml, getCanciones, agregarCanciones, updateCanciones, deleteCanciones };