attribute vec3 aVertexPosition;
attribute vec3 aNormalPosition;
attribute vec2 aTextureCoord;

uniform mat3 aPrecomputeLR;
uniform mat3 aPrecomputeLG;
uniform mat3 aPrecomputeLB;

attribute mat3 aPrecomputeLT;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;


varying highp vec3 vColor;

void main(void)
{
    float r = 0.0, g = 0.0, b = 0.0;
    for(int i = 0; i < 3; i++)
    {
        r+= dot(aPrecomputeLT[i], aPrecomputeLR[i]);
        g+= dot (aPrecomputeLT[i], aPrecomputeLG[i]);
        b+= dot(aPrecomputeLT[i], aPrecomputeLB[i]);
    }
    vec3 EvnColor = vec3(aPrecomputeLR[0][0], aPrecomputeLG[0][0],aPrecomputeLB[0][0]) * aPrecomputeLT[0][0] +
                    vec3(aPrecomputeLR[0][1], aPrecomputeLG[0][1],aPrecomputeLB[0][1])  * aPrecomputeLT[0][1]+ 
                    vec3(aPrecomputeLR[0][2], aPrecomputeLG[0][2],aPrecomputeLB[0][2]) * aPrecomputeLT[0][2] + 
                    
                    vec3(aPrecomputeLR[1][0], aPrecomputeLG[1][0],aPrecomputeLB[1][0]) * aPrecomputeLT[1][0] + 
                    vec3(aPrecomputeLR[1][1], aPrecomputeLG[1][1],aPrecomputeLB[1][1]) * aPrecomputeLT[1][1] + 
                    vec3(aPrecomputeLR[1][2], aPrecomputeLG[1][2],aPrecomputeLB[1][2]) * aPrecomputeLT[1][2] + 
                    
                    vec3(aPrecomputeLR[2][0], aPrecomputeLG[2][0],aPrecomputeLB[2][0]) * aPrecomputeLT[2][0] + 
                    vec3(aPrecomputeLR[2][1], aPrecomputeLG[2][1],aPrecomputeLB[2][1]) * aPrecomputeLT[2][1] + 
                    vec3(aPrecomputeLR[2][2], aPrecomputeLG[2][2],aPrecomputeLB[2][2]) * aPrecomputeLT[2][2];

    // EvnColor +=0.3;
    vColor = EvnColor;
    // vColor = vec3(aPrecomputeLT[0][0],aPrecomputeLT[0][1], aPrecomputeLT[0][2]);
    // vColor = vec3(aPrecomputeLR[0][0], aPrecomputeLG[0][0],aPrecomputeLB[0][0])*1.0;

    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix *
                vec4(aVertexPosition, 1.0);
    
}