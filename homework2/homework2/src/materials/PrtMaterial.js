class PrtMaterial extends Material {

    constructor(color, specular, light, translate, scale, vertexShader, fragmentShader) {
        // let lightMVP = light.CalcLightMVP(translate, scale);
        // let lightIntensity = light.mat.GetIntensity();

        super({
            'aPrecomputeLR' : {type: 'updatedInRealTime', value: null},
            'aPrecomputeLG' : {type: 'updatedInRealTime', value: null},
            'aPrecomputeLB' : {type: 'updatedInRealTime', value: null},
        }, ['aPrecomputeLT'], vertexShader, fragmentShader, null);
    }
}

async function buildPrtMaterial(color, specular, light, translate, scale, vertexPath, fragmentPath) {


    let vertexShader = await getShaderString(vertexPath);
    let fragmentShader = await getShaderString(fragmentPath);

    return new PrtMaterial(color, specular, light, translate, scale, vertexShader, fragmentShader);

}