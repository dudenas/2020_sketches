// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.);
    
    vec2 pos=vec2(.5)-st;
    
    float r=length(pos)*3.;
    float a=atan(pos.y,pos.x);
    
    float f=cos(a*3.);
    // f = abs(cos(a*3.));
    f=abs(sin(a*1.+u_time*atan(pos.x*pos.y*50.)))*.5+.1;
    // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    // f = smoothstep(.0,1., cos(a*10.))*0.3+0.5;
    
    color=vec3(1.-smoothstep(f,f*abs(2.*sin(u_time*.2)),r));
    
    gl_FragColor=vec4(color,1.);
}
