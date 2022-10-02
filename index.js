const express = require("express");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors());

function validaValores(catetoA, catetoB, hipotenusa) {
    if (!catetoA && !hipotenusa) {
        return false;
    } else if (!catetoA && !catetoB) {
        return false;
    } else if (!catetoB && !hipotenusa) {
        return false;
    }
    return true;
}

app.post("/", (request, response) => {
    const { catetoA, catetoB, hipotenusa } = request.body;

    if (!validaValores(catetoA, catetoB, hipotenusa)) {
        return response.status(400).json({ "message": "faltou passar um valor!" });
    }

    if (catetoA && catetoB) {
        return response.status(200).json({ "hipotenusa": Math.hypot(catetoA, catetoB).toFixed(2) });
    } else if (catetoA && hipotenusa) {
        const quadradoCateto = catetoA * catetoA;
        const quadradoHipotenusa = hipotenusa * hipotenusa;
        const auxiliar = quadradoHipotenusa - quadradoCateto;
        const resultado = Math.sqrt(auxiliar);
        return response.status(200).json({ "catetoB": resultado });
    } else if (catetoB && hipotenusa) {
        const quadradoCateto = catetoB * catetoB;
        const quadradoHipotenusa = hipotenusa * hipotenusa;
        const auxiliar = quadradoHipotenusa - quadradoCateto;
        const resultado = Math.sqrt(auxiliar);
        return response.status(200).json({ "catetoA": resultado });
    } else {
        return response.status(500).json({ "message": "erro desconhecido!" });
    }
});

app.listen(3000, () => console.log("pitagoras"));