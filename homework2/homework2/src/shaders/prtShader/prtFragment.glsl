varying highp vec3 vColor;
void main(void) {
  // gl_FragColor = pow(vColor, vec4(0.45));
  gl_FragColor = vec4(vColor,1);
}