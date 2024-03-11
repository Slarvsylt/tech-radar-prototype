uniform vec2 iResolution;
uniform float iGlobalTime;

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
    vec2 uv = fragCoord.xy/iResolution.xy;
    fragColor = vec4(uv,0.5+0.5*sin(iGlobalTime),1.0);
}

void main() {
mainImage(gl_FragColor,gl_FragCoord.xy);
}