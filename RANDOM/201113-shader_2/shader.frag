#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA=vec3(.149,.141,.912);
vec3 colorB=vec3(1.,.833,.224);

float easeInQuint(float x){
    return x*x*x*x*x;
}

float plot(vec2 st,float pct){
    return smoothstep(pct-.02,pct,st.y)-
    smoothstep(pct,pct+.02,st.y);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.);
    
    float pct=abs(sin(u_time));
    
    pct=easeInQuint(pct);
    pct=smoothstep(sin(u_time),cos(u_time),st.x);
    // Mix uses pct (a value from 0-1) to
    // mix the two colors
    color=mix(colorA,colorB,pct);
    color.g=acos(st.x*pow(pct,1.)*PI);
    // color.r=pow(pct,-1.);
    // color.b=pow(pct,1.2);
    
    gl_FragColor=vec4(color,1.);
}