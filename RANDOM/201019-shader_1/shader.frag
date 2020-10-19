#ifdef GL_ES
precision mediump float;
#endif

// #define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// float plot(vec2 st,float pct){
    //     return smoothstep(pct-.02,pct,st.y)-
    //     smoothstep(pct,pct+.02,st.y);
// }

// void main(){
    //     vec2 st=gl_FragCoord.xy/u_resolution;
    
    //     float y=smoothstep(.2,.5,st.x)-smoothstep(.5,.8,st.x);
    
    //     vec3 color=vec3(y);
    
    //     float pct=plot(st,y);
    //     color=(1.-pct)*color+pct*vec3(0.,1.,0.);
    
    //     gl_FragColor=vec4(color,1.);
// }

void main(){
    vec3 c;
    float l,z=u_time;
    for(int i=0;i<3;i++){
        vec2 uv,p=gl_FragCoord.xy/u_resolution;
        uv=p;
        p-=.5;
        p.x*=u_resolution.x/u_resolution.y;
        z+=.001;
        l=length(p*2.);
        uv+=p/l*(sin(z)+.1)*abs(atan(l*24.-z*2.)+cos(l*24.-z*2.)*.8);
        c[i]=.001/length(abs(mod(uv,1.)-.5));
    }
    gl_FragColor=vec4(c/l,u_time);
}